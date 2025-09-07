#!/usr/bin/env bun

import { execSync } from 'child_process';

type VersionType = 'patch' | 'minor' | 'major';

function execCommand(command: string): string {
  console.log(`→ Executing: ${command}`);
  try {
    return execSync(command, { stdio: 'inherit', encoding: 'utf8' });
  } catch (error) {
    console.error(`✗ Command failed: ${command}`);
    throw error;
  }
}

function bumpVersion(versionType: VersionType): void {
  console.log(`📈 Bumping ${versionType} version...`);
  execCommand(`npm version ${versionType} --no-git-tag-version`);
  console.log(`✅ Version bumped successfully`);
}

function main(): void {
  const args = process.argv.slice(2);
  const versionType = args[0] as VersionType;
  
  if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
    console.error('❌ Please specify version type: patch, minor, or major');
    console.log('Usage: bun run scripts/dual-version.ts <patch|minor|major>');
    process.exit(1);
  }
  
  console.log('🎯 Starting version bump...');
  
  try {
    bumpVersion(versionType);
    
    console.log('\n🎉 Version bump completed!');
    console.log('💡 Now run: bun run publish:dual');
    
  } catch (error) {
    console.error('\n💥 Version bump failed:', error);
    process.exit(1);
  }
}

// Run the script
main();
