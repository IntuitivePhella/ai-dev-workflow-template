# Change Packages

`ai/04-changes/` stores optional change packages for larger or multi-story work.

A change package groups the proposal, tasks, design notes, and spec deltas for a coherent behavior change. It is useful when a simple story is not enough to explain the intended change safely.

## Default rule

Use a simple story by default.

Use a change package when the work is broad, multi-story, changes durable behavior contracts, needs explicit proposal and task tracking, or requires spec deltas that should be reviewed before implementation.

Do not require a change package for routine bugfixes, small refactors, documentation-only edits, local process residue, or one-story changes that do not update durable behavior.

## Relationship to stories

A change package does not replace stories. It gives a larger change a stable planning container. Implementation should still proceed one ready story at a time.

Typical flow:

```text
change package -> reviewed tasks -> one story at a time -> verification -> sync added specs -> archive completed package
```

## Suggested layout

```text
ai/04-changes/<date>-<slug>/
  proposal.md
  tasks.md
  design.md
  specs/
    <capability>.delta.md
```

Use:

- `node scripts/aiwf.js change "Add dark mode"` to scaffold a package.
- `node scripts/aiwf.js status ai/04-changes/<date>-<slug>` to show which package artifacts are complete or missing.
- `node scripts/aiwf.js status ai/04-changes/<date>-<slug> --json` when an agent or script needs parseable status.
- `node scripts/aiwf.js instructions <proposal|specs|design|tasks> ai/04-changes/<date>-<slug>` to get next-artifact guidance.
- `node scripts/aiwf.js validate-change ai/04-changes/<date>-<slug>` to validate proposal, tasks, and delta specs.
- `node scripts/aiwf.js verify ai/04-changes/<date>-<slug>` to report Completeness, Correctness, and Coherence before completion.
- `node scripts/aiwf.js sync ai/04-changes/<date>-<slug>` to apply validated `ADDED` requirements to target specs under `ai/11-specs/`.
- `node scripts/aiwf.js archive ai/04-changes/<date>-<slug>` to move a validated package with completed tasks to archive history.
- `ai/templates/CHANGE_PROPOSAL.template.md`
- `ai/templates/CHANGE_TASKS.template.md`
- `ai/templates/SPEC_DELTA.template.md`
- `ai/templates/VERIFY_REPORT.template.md`

## Lifecycle

The CLI can scaffold a change package with proposal, tasks, design notes, and a starter spec delta. Agents must still review and fill the package before implementation.

Run `node scripts/aiwf.js status <change-package-dir>` to identify missing artifacts, then use `node scripts/aiwf.js instructions <artifact> <change-package-dir>` for agent-readable guidance on the next artifact.

Run `node scripts/aiwf.js validate-change <change-package-dir>` before implementing from a change package and before sync or archive.

Run `node scripts/aiwf.js verify <change-package-dir>` before completing a change package. Verify reports unchecked tasks as critical, warns when optional design notes or spec deltas are missing, and states that artifact checks do not prove implementation correctness.

Run `node scripts/aiwf.js sync <change-package-dir>` only after the change is accepted and its delta specs should update durable behavior specs. Sync currently supports `ADDED` requirements only. `MODIFIED`, `REMOVED`, and `RENAMED` operations are rejected until a later story defines conservative merge semantics for them.

Run `node scripts/aiwf.js archive <change-package-dir>` only after tasks are complete. Archive refuses unchecked tasks by default and moves the full package under `ai/04-changes/archive/YYYY-MM-DD-<change-id>/`.

Out of scope until later stories:

- Automated proof that code exactly matches every requirement.

Lifecycle automation does not replace story execution. Agents should keep implementation bounded to the approved story, then sync and archive only when the change package is ready for durable history.
