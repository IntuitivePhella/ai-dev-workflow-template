# Execution Protocol

Use this for every story. This protocol combines spec-driven planning, TDD discipline, technical execution, review gates, and bounded memory updates.

## Step 0 — Select workflow mode

Read `ai/00-rules/WORKFLOW_MODES.md` and choose the smallest mode that fits the task.

Do not use a larger workflow than needed.

## Step 1 — Read

Read:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/08-memory/PROJECT_MEMORY.md`
- `ai/08-memory/SESSION_STATE.md`, if present
- `ai/08-memory/PROJECT_MAP.md`, if present
- current story or brief
- impact analysis, if present
- test plan, if present

## Step 2 — Confirm boundaries

Before editing code, identify:

- files likely in scope
- files or areas explicitly forbidden
- sensitive areas requiring human approval
- commands required for verification
- assumptions
- stop conditions

## Step 3 — Plan

Write a short implementation plan.

The plan must be small enough to complete in one story. If it is not, split the story.

## Step 4 — Test first

Create or update tests before production code when feasible.

For bugfixes, first reproduce the bug with a failing test or a documented reproduction path.

## Step 5 — Implement

Make the smallest useful change.

Rules:

- Do not perform opportunistic refactors.
- Do not change architecture without updating `ai/03-architecture/DECISION_LOG.md`.
- Do not remove, weaken, or bypass tests.
- Do not touch forbidden areas unless human approval is recorded.

## Step 6 — Verify

Run the commands listed in the story or test plan.

At minimum, run the most relevant available checks:

- tests
- build
- typecheck
- lint
- `node scripts/aiwf.js validate-spec <path>` when the story creates or changes a behavioral spec or spec delta
- `node scripts/aiwf.js validate-change <path>` when the story creates or changes a change package
- `node scripts/aiwf.js sync <change-package-dir>` after an accepted change package needs its supported delta specs applied to durable behavior specs
- `node scripts/aiwf.js archive <change-package-dir>` after an accepted change package has completed tasks and should be preserved for audit history

If a command is unavailable, say so explicitly.

## Step 7 — Review

Review against:

- acceptance criteria
- `ai/00-rules/QUALITY_GATES.md`
- `ai/06-reviews/REVIEW_CHECKLIST.md`

Check product fit, maintainability, regression risk, security, and release readiness.

## Step 8 — Document

Update memory, decision log, release notes, or follow-up files if needed.

For continuity-critical workflows, update `ai/08-memory/SESSION_STATE.md` (or explicitly update `PROJECT_MEMORY.md` with equivalent fields) before marking the task complete.

Do not hide tech debt inside a completed story. Record it separately.

When improving AI-PhellOS inside its own repository, remove or relocate temporary coordination artifacts before publication. One-off plans, context packs, handoffs, and intermediate review packets belong under `ai/_local/` while active and should not be committed unless explicitly approved as durable framework content.

If more work remains after the current turn, write a copy-ready next-chat prompt in `Follow-ups:` so a fresh agent can resume without guessing. The prompt must include the exact next step, relevant files, commands to run, stop conditions, and files or areas that must not be changed.

## Step 9 - Publish approved work

Only when the process is complete and the user explicitly approves publication, use `ai/skills/publish-approved-work.md` to create or switch branches, commit, push, and open a pull request.

Do not treat approval of the implementation as approval to publish. Branch creation, commit, push, and PR creation each require clear human approval.

## Required final report

```text
Summary:
- ...

Files changed:
- ...

Acceptance criteria:
- [x] ...
- [ ] ...

Tests run:
- ...

Risks:
- ...

Follow-ups:
- If more work remains, include:
  Next Chat Prompt:
  <copy-ready prompt for a fresh agent with current phase, relevant files, exact next step, commands, stop conditions, and forbidden areas>
- If no work remains, write: None.
```

