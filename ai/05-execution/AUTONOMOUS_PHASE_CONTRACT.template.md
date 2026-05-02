# Autonomous Phase Contract: <title>

Use this contract only when a phase is safe, bounded, and ready for limited autonomous execution.

## Objective

What exactly should be completed in this autonomous phase?

## Workflow mode

- [x] Autonomous phase

## Squad level

- [ ] Level 1 — Pair
- [ ] Level 2 — Mini Squad
- [ ] Level 3 — Full Squad

## Preconditions

- [ ] Rules read
- [ ] Project memory read
- [ ] Project map read or created
- [ ] Story or task is ready
- [ ] Human approval recorded if sensitive areas are touched

## Allowed files and directories

- TBD

## Forbidden files and directories

- TBD

## Forbidden work

- [ ] No billing changes
- [ ] No auth/permission weakening
- [ ] No destructive migrations
- [ ] No production deploy
- [ ] No secrets or env changes
- [ ] No paid external API calls
- [ ] No user data deletion
- [ ] No unrelated refactors

## Required commands

```bash
# tests
TBD

# build/typecheck/lint
TBD
```

## Max iterations

Maximum autonomous loops allowed: TBD

An iteration means: inspect result, make one bounded change, run required verification, decide continue/stop.

## Max change budget

- Max files changed: TBD
- Max approximate lines changed: TBD
- Max dependencies added: 0 unless explicitly approved

## Completion criteria

- [ ] Objective complete
- [ ] Acceptance criteria satisfied
- [ ] Required commands pass
- [ ] No forbidden files touched
- [ ] Risks documented
- [ ] Memory/decision log updated if needed

## Stop immediately if

- tests fail after two serious attempts;
- scope expands beyond this phase;
- a forbidden area needs modification;
- a sensitive area needs approval;
- requirements conflict with project memory or architecture;
- a new dependency, migration, or architecture change is needed;
- rollback becomes unclear;
- production resources or external services are required.

## Rollback plan

How can the autonomous phase be safely reverted?

## Final report required

```markdown
# Autonomous Phase Report

## Summary

## Iterations used

## Files changed

## Commands run

## Acceptance criteria status

## Stop conditions encountered

## Risks

## Follow-ups
```
