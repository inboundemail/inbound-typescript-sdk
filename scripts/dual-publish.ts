#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

interface PackageJson {
  name: string;
  version: string;
  [key: string]: any;
}

const PACKAGE_JSON_PATH = join(process.cwd(), 'package.json');
const BACKUP_PATH = join(process.cwd(), 'package.json.backup');

function readPackageJson(): PackageJson {
  const content = readFileSync(PACKAGE_JSON_PATH, 'utf8');
  return JSON.parse(content);
}

function writePackageJson(packageJson: PackageJson): void {
  writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
}

function execCommand(command: string): void {
  console.log(`→ Executing: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`✗ Command failed: ${command}`);
    throw error;
  }
}

function backupPackageJson(): void {
  console.log('📦 Backing up package.json...');
  execCommand(`cp ${PACKAGE_JSON_PATH} ${BACKUP_PATH}`);
}

function restorePackageJson(): void {
  console.log('🔄 Restoring original package.json...');
  execCommand(`cp ${BACKUP_PATH} ${PACKAGE_JSON_PATH}`);
  execCommand(`rm ${BACKUP_PATH}`);
}

function publishPackage(packageName: string, isSecondary = false): void {
  console.log(`\n🚀 Publishing to ${packageName}...`);
  
  if (isSecondary) {
    const originalPackage = readPackageJson();
    const modifiedPackage = {
      ...originalPackage,
      name: packageName
    };
    writePackageJson(modifiedPackage);
  }
  
  execCommand('npm publish');
  console.log(`✅ Successfully published to ${packageName}`);
}

function buildPackage(): void {
  console.log('🔨 Building package...');
  execCommand('bun run build');
  console.log('✅ Build completed');
}

function main(): void {
  const originalPackage = readPackageJson();
  
  console.log('🎯 Starting dual publish process...');
  console.log(`📋 Current version: ${originalPackage.version}`);
  
  try {
    // Backup original package.json
    backupPackageJson();
    
    // Build the package
    buildPackage();
    
    // Publish to @inboundemail/sdk (original name)
    publishPackage('@inboundemail/sdk', false);
    
    // Publish to inbnd (secondary name)
    publishPackage('inbnd', true);
    
    console.log('\n🎉 Dual publish completed successfully!');
    console.log('📦 Published to:');
    console.log('   • @inboundemail/sdk');
    console.log('   • inbnd');
    
  } catch (error) {
    console.error('\n💥 Publish failed:', error);
    process.exit(1);
  } finally {
    // Always restore the original package.json
    restorePackageJson();
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Process interrupted, restoring package.json...');
  restorePackageJson();
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Process terminated, restoring package.json...');
  restorePackageJson();
  process.exit(1);
});

// Run the script
main();
