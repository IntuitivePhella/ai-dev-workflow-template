# Framework Upgrade Policy

This document defines the official policy for upgrading AI-PhellOS in existing projects.

## Core Principle

**The `install existing` command is NOT an upgrade mechanism.**

Use `install existing` only for first-time installation of AI-PhellOS into a project that has never had it. For projects that already have AI-PhellOS installed, use the `upgrade` command instead.

## Upgrade Command

The official upgrade procedure is:

```bash
# From a project that uses AI-PhellOS, run the NEW framework version:
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --dry-run
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --apply

# Or from a local clone of the updated framework:
node /path/to/AI-PhellOS/scripts/aiwf.js upgrade /path/to/project --dry-run
node /path/to/AI-PhellOS/scripts/aiwf.js upgrade /path/to/project --apply
```

**Key insight**: The CLI from the NEW framework version upgrades the OLD project. Projects do not upgrade themselves using their own outdated CLI.

## Upgrade Rules

1. **Always start with `--dry-run`** to preview changes before applying.
2. **Upgrade never overwrites product artifacts** by default.
3. **Upgrade is idempotent** — running it twice produces the same result.
4. **Conflicts generate `.incoming` files** for manual review.
5. **`package.json` is never overwritten** in existing projects.
6. **A migration report is generated** at `ai/08-memory/FRAMEWORK_MIGRATION.md`.
7. **A version manifest is created/updated** at `ai/.phellos-version.json`.

## File Classification

Every file in an AI-PhellOS installation is classified into one of three categories:

### Framework-Managed

Files that the framework owns and can safely update. These include:

| Path Pattern | Description |
|--------------|-------------|
| `ai/00-rules/*` | Governance and policy documents |
| `ai/agents/*` | Agent role definitions |
| `ai/skills/*` | Reusable execution skills |
| `ai/squads/*` | Squad definitions |
| `ai/templates/*` | Document templates |
| `ai/06-reviews/*` | Review workflows |
| `ai/07-release/*` | Release checklists |
| `ai/10-integrations/*` | Integration adapters |
| `ai/migrations/*` | Migration definitions |
| `ai/handoffs/*` | Handoff protocols |
| `ai/orchestration-log/*` | Orchestration logs |
| `scripts/*` | CLI and utility scripts |
| `prompts/*` | Generic prompt templates |
| `.claude/*` | Claude Code configuration |
| `.codex/*` | Codex configuration |
| `.github/*` | GitHub workflows and templates |

**Upgrade behavior**: Create if missing. Update if changed. No `.incoming` file needed.

### Project-Owned

Files that contain product knowledge and must NEVER be touched by upgrades. These include:

| Path Pattern | Description |
|--------------|-------------|
| `ai/01-discovery/*` | Project discovery artifacts |
| `ai/02-product/*` | Product requirements (PRD, briefs) |
| `ai/03-architecture/*` | Architecture decisions |
| `ai/04-stories/*` | User stories |
| `ai/04-changes/*` | Change packages |
| `ai/05-execution/*` | Execution plans and test plans |
| `ai/08-memory/*` | Project memory and session state |
| `ai/09-intake/*` | Intake artifacts and stack profiles |
| `ai/11-specs/*` | Behavioral specifications |
| `docs/product/*` | Product documentation |
| `docs/architecture/*` | Architecture documentation |
| `docs/discovery/*` | Discovery documentation |
| `docs/handoff/*` | Handoff documentation |
| `src/*`, `app/*`, `lib/*` | Application source code |
| `components/*`, `pages/*` | Frontend components |
| `database/*`, `prisma/*`, `supabase/*` | Database schemas |
| `tests/*` | Project test files |
| `package.json` | Project dependencies |
| `package-lock.json` | Dependency lock file |
| `ai/config.yaml` | Project-specific configuration |
| `*.xlsx` | Spreadsheet data files |

**Upgrade behavior**: Skip entirely. Never modify. Never delete.

### Mixed

Files that started as framework templates but may contain project-specific customizations:

| File | Description |
|------|-------------|
| `AGENTS.md` | Tool-agnostic entrypoint (may have project context) |
| `CLAUDE.md` | Claude Code entrypoint (may have project context) |
| `README.md` | Project readme (may describe the product) |
| `ai/skills/README.md` | Skills index (project may add custom skills) |

**Upgrade behavior**: If the file exists and differs from the framework version, create `<filename>.incoming` with the new version. The original file is preserved. User must manually merge changes.

### Framework-Only

Files that exist in the framework repository but are NOT copied to projects:

| File | Description |
|------|-------------|
| `README.pt-BR.md` | Framework Portuguese readme (marketing) |
| `README.es.md` | Framework Spanish readme (marketing) |
| `README.zh-CN.md` | Framework Chinese readme (marketing) |

**Upgrade behavior**: Skip entirely. These are framework documentation, not project assets.

## Version Manifest

The upgrade command creates or updates `ai/.phellos-version.json`:

```json
{
  "framework": "AI-PhellOS",
  "installedVersion": "0.2.0",
  "installedAt": "2026-05-11T10:00:00.000Z",
  "upgradedAt": "2026-05-11T14:30:00.000Z",
  "source": "github:IntuitivePhella/AI-PhellOS",
  "migrationsApplied": [
    { "id": "0.2.0-safe-upgrade", "appliedAt": "2026-05-11T14:30:00.000Z" },
    { "id": "0.2.0-delivery-audit", "appliedAt": "2026-05-11T14:30:00.000Z" }
  ]
}
```

For legacy projects without this file, the upgrade command reports:

```
Detected AI-PhellOS legacy installation: version unknown
```

## Migration Report

Each upgrade appends a section to `ai/08-memory/FRAMEWORK_MIGRATION.md`:

```markdown
## Migration: 0.1.0 → 0.2.0

**Date**: 2026-05-11T14:30:00.000Z

### Files Added
- ai/00-rules/FRAMEWORK_UPGRADE_POLICY.md
- ai/templates/PHELLOS_VERSION.template.json

### Files Updated
- scripts/aiwf.js

### Files Skipped (project-owned)
- ai/08-memory/PROJECT_MAP.md
- package.json

### Conflicts (manual review required)
- AGENTS.md → AGENTS.md.incoming

### Migrations Applied
- 0.2.0-safe-upgrade
- 0.2.0-delivery-audit
```

## Handling `.incoming` Files

When the upgrade creates `.incoming` files:

1. Compare the `.incoming` file with your current file.
2. Merge relevant changes manually.
3. Delete the `.incoming` file after merging.
4. Commit both the updated file and the deletion.

Do NOT commit `.incoming` files to your repository. Add `*.incoming` to `.gitignore` if needed.

## Rollback

If an upgrade causes issues:

1. The migration report lists all changes made.
2. Use `git diff` or `git status` to see modified files.
3. Revert specific files with `git checkout -- <file>`.
4. The version manifest can be edited or deleted to reset state.

## Safety Guarantees

The upgrade command provides these guarantees:

1. **No data loss**: Project-owned files are never modified or deleted.
2. **No silent overwrites**: Conflicts always create `.incoming` files.
3. **Audit trail**: Migration report documents every change.
4. **Reversible**: All changes can be reverted via git.
5. **Preview first**: `--dry-run` shows the plan without making changes.

## Anti-Patterns

**Do NOT**:

- Run `install existing` on a project that already has AI-PhellOS.
- Copy framework files manually between versions.
- Delete `ai/.phellos-version.json` to "reset" the installation.
- Commit `.incoming` files to the repository.
- Skip the `--dry-run` step before applying upgrades.

## Troubleshooting

### "Target does not appear to be an AI-PhellOS project"

The upgrade command checks for `ai/` directory or `AGENTS.md`. If neither exists, it refuses to proceed. This prevents accidental upgrades of non-AI-PhellOS projects.

### "No changes needed"

If the dry-run shows no changes, your project is already up to date with the framework version.

### "Multiple .incoming files created"

This means several mixed files have project-specific changes. Review and merge each one individually.
