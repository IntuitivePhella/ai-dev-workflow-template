# Refactor: <title>

## Objective

What structure, maintainability, or clarity improvement should this refactor produce?

## Current behavior to preserve

Describe the behavior that must remain unchanged.

## Motivation

Why is this refactor needed now?

## Workflow mode

- [x] Refactor

## Squad level

- [ ] Level 1 — Pair
- [ ] Level 2 — Mini Squad
- [ ] Level 3 — Full Squad

## Allowed files and directories

- TBD

## Forbidden files and directories

- TBD

## Explicit non-goals

- [ ] No product behavior change
- [ ] No new dependency unless approved
- [ ] No API contract change unless approved
- [ ] No schema/data migration unless approved
- [ ] No opportunistic rewrite outside scope

## Safety tests / verification

What proves behavior was preserved?

- [ ] Existing tests identified
- [ ] New characterization tests added if needed
- [ ] Build/typecheck/lint commands identified

## Commands to run

```bash
TBD
```

## Refactor plan

1. Identify seams and current behavior.
2. Add or confirm safety coverage.
3. Make mechanical changes in small steps.
4. Run verification after each meaningful step.
5. Review diff for unintended behavior changes.

## Acceptance criteria

- [ ] Behavior preserved.
- [ ] Structure improved in the stated area.
- [ ] Tests and checks pass.
- [ ] No unrelated cleanup is included.

## Risks

## Rollback plan

## Definition of done

- [ ] Definition of Ready satisfied
- [ ] Safety coverage confirmed
- [ ] Refactor complete
- [ ] Commands pass
- [ ] Diff reviewed for behavior changes
- [ ] Memory/decision log updated if conventions changed
