# Migration: 0.2.0-safe-upgrade

## Overview

This migration introduces the safe framework upgrade infrastructure for AI-PhellOS. It enables existing projects to upgrade their framework files without risk of overwriting product artifacts like PRDs, stories, architecture decisions, or project memory.

## What This Migration Adds

### Files

1. **`ai/00-rules/FRAMEWORK_UPGRADE_POLICY.md`**
   - Official policy for upgrading AI-PhellOS
   - File classification rules (framework-managed, project-owned, mixed)
   - Upgrade command documentation
   - Safety guarantees and anti-patterns

2. **`ai/templates/PHELLOS_VERSION.template.json`**
   - Template for the version manifest
   - Lists managed and protected paths
   - Used to generate `ai/.phellos-version.json` in target projects

3. **`ai/migrations/` directory structure**
   - Migration definition format
   - README documentation per migration

### CLI Changes

The `scripts/aiwf.js` CLI gains:

- `aiwf upgrade <target> --dry-run` — Preview upgrade plan without changes
- `aiwf upgrade <target> --apply` — Execute upgrade plan

## How It Works

1. **Version Detection**: Checks for `ai/.phellos-version.json` in target project. If missing, detects as legacy installation.

2. **File Classification**: Every file is classified as:
   - `framework-managed` — Safe to update
   - `project-owned` — Never touch
   - `mixed` — Create `.incoming` file on conflict

3. **Upgrade Plan**: Computes diff between source (new framework) and target (existing project).

4. **Execution**: Applies changes according to classification rules.

5. **Reporting**: Generates/updates migration report at `ai/08-memory/FRAMEWORK_MIGRATION.md`.

6. **Manifest**: Creates/updates `ai/.phellos-version.json` with applied migrations.

## Upgrade Command Usage

```bash
# Preview changes (always do this first)
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --dry-run

# Apply changes
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --apply
```

## Safety Guarantees

- Product artifacts are never modified
- `package.json` is never overwritten
- Conflicts create `.incoming` files for manual review
- Migration report provides audit trail
- Upgrade is idempotent

## Rollback

If issues occur after upgrade:

1. Review the migration report at `ai/08-memory/FRAMEWORK_MIGRATION.md`
2. Use `git diff` to see all changes
3. Revert specific files with `git checkout -- <file>`
4. Delete `ai/.phellos-version.json` to reset version tracking
