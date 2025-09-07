# Dual Publishing Scripts

This directory contains scripts for publishing the Inbound Email SDK to multiple npm package names simultaneously.

## Available Scripts

### `dual-publish.ts`
Publishes the SDK to both `@inboundemail/sdk` and `inbnd` package names.

**Usage:**
```bash
bun run publish:dual
```

**What it does:**
1. Backs up the original `package.json`
2. Builds the package using `bun run build`
3. Publishes to `@inboundemail/sdk` with the original package name
4. Modifies `package.json` to use name `inbnd` 
5. Publishes to `inbnd`
6. Restores the original `package.json`

### `dual-version.ts`
Bumps the version number for dual publishing.

**Usage:**
```bash
bun run scripts/dual-version.ts <patch|minor|major>
```

**Examples:**
```bash
# Patch version (1.0.0 → 1.0.1)
bun run scripts/dual-version.ts patch

# Minor version (1.0.0 → 1.1.0) 
bun run scripts/dual-version.ts minor

# Major version (1.0.0 → 2.0.0)
bun run scripts/dual-version.ts major
```

## Package.json Scripts

The following scripts are available in `package.json`:

### Publishing Scripts
- `publish:dual` - Publish to both package names
- `publish:single` - Publish only to @inboundemail/sdk (legacy)
- `publish:patch` - Bump patch version and dual publish
- `publish:minor` - Bump minor version and dual publish  
- `publish:major` - Bump major version and dual publish
- `publish:breaking` - Alias for minor version bump (backward compatibility)

### Recommended Workflow

1. **For patch releases (bug fixes):**
   ```bash
   bun run publish:patch
   ```

2. **For minor releases (new features):**
   ```bash
   bun run publish:minor
   ```

3. **For major releases (breaking changes):**
   ```bash
   bun run publish:major
   ```

4. **For manual version control:**
   ```bash
   bun run scripts/dual-version.ts patch
   bun run publish:dual
   ```

## Package Names

After publishing, the SDK will be available as:

- **Primary:** `@inboundemail/sdk` - Full scoped package name
- **Alias:** `inbnd` - Short, memorable alias

Both packages contain identical code and can be used interchangeably:

```bash
# Install using scoped name
npm install @inboundemail/sdk

# Install using short alias  
npm install inbnd
```

```javascript
// Both imports work the same way
import { InboundEmail } from '@inboundemail/sdk';
import { InboundEmail } from 'inbnd';
```

## Safety Features

- **Automatic backup/restore** of `package.json` 
- **Error handling** with cleanup on failure
- **Signal handling** for graceful interruption (Ctrl+C)
- **Dry-run validation** before actual publishing

## Troubleshooting

If a publish fails midway:
1. Check if `package.json.backup` exists
2. If it does, run: `cp package.json.backup package.json && rm package.json.backup`
3. Check npm authentication with `npm whoami`
4. Ensure you have publish permissions for both package names
