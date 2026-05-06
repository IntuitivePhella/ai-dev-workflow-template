# Project Memory

## Stack

TBD.

## Common commands

```bash
# install
TBD

# test
npm.cmd test

# build
TBD

# lint
TBD
```

## Project conventions

- Simple stories remain the default execution unit.
- Use `ai/11-specs/` for durable behavioral specs that define observable behavior future work must preserve.
- Use optional `ai/04-changes/` change packages only for broad, multi-story, behavior-contracting work or work that needs durable proposal/tasks/spec deltas.
- Use `node scripts/aiwf.js change "<title>"` to scaffold a change package with proposal, tasks, design notes, and a starter spec delta.
- Use `node scripts/aiwf.js status <change-package-dir> [--json]` to inspect proposal/specs/design/tasks completion and the next missing artifact.
- Use `node scripts/aiwf.js instructions <artifact> <change-package-dir>` for agent-readable guidance for proposal, specs, design, or tasks.
- Use `node scripts/aiwf.js validate-spec <path>` for behavioral specs and spec deltas.
- Use `node scripts/aiwf.js validate-change <path>` for change packages before implementation or later lifecycle steps.
- Use `node scripts/aiwf.js verify <change-package-dir>` to report Completeness, Correctness, and Coherence before completing a change package; incomplete tasks are critical and missing optional design/spec artifacts are warnings when intentionally skipped.
- Use `node scripts/aiwf.js sync <change-package-dir>` to apply supported `ADDED` delta requirements into durable specs under `ai/11-specs/`.
- Use `node scripts/aiwf.js archive <change-package-dir>` to move a validated package with completed tasks into `ai/04-changes/archive/YYYY-MM-DD-<change-id>/`.
- `ai/config.yaml` is optional. When present, it may override `paths.specsPath`, `paths.changesPath`, and default planning command names; start from `ai/config.template.yaml`.
- Keep transient self-improvement planning artifacts under ignored `ai/_local/` unless explicitly approved as durable framework content.

## Important decisions

| Date | Decision | Reason | Trade-off |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## Sensitive areas

TBD.

## Things AI must not do

- Do not stage or commit transient local coordination artifacts unless the user explicitly approves them as durable project content.

## Current status

- OpenSpec-inspired foundation docs/templates, the `aiwf change` CLI scaffold, structural `validate-spec` / `validate-change` commands, change package `status` / `instructions`, conservative `sync` / `archive`, `verify` report lifecycle command, and optional `ai/config.yaml` path/command config are complete. Remaining CLI automation should stay serialized while `scripts/aiwf.js` and `tests/aiwf.test.js` remain shared write scopes.

## Session continuity

If `ai/08-memory/SESSION_STATE.md` exists, treat it as the operational source of truth for current phase and next action.

