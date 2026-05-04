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

If a command is unavailable, say so explicitly.

## Step 7 — Review

Review against:

- acceptance criteria
- `ai/00-rules/QUALITY_GATES.md`
- `ai/06-reviews/REVIEW_CHECKLIST.md`

Check product fit, maintainability, regression risk, security, and release readiness.

## Step 8 — Document

Update memory, decision log, release notes, or follow-up files if needed.

For continuity-critical workflows, update i/08-memory/SESSION_STATE.md (or explicitly update PROJECT_MEMORY.md with equivalent fields) before marking the task complete.

Do not hide tech debt inside a completed story. Record it separately.

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
- ...
```

