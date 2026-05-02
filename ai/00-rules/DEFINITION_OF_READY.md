# Definition of Ready

A story, bugfix, refactor, migration, or autonomous phase is ready for execution only when the agent can safely implement it without inventing product scope or architecture.

## Universal readiness checklist

Before implementation starts, all items below must be true or explicitly marked as not applicable.

- [ ] Objective is clear.
- [ ] Workflow mode is selected.
- [ ] Squad level is selected.
- [ ] Acceptance criteria are testable.
- [ ] Non-goals are explicit.
- [ ] Files likely in scope are listed.
- [ ] Files or areas explicitly forbidden are listed.
- [ ] Sensitive areas are identified.
- [ ] Human approval is recorded when sensitive areas are touched.
- [ ] Required tests or verification commands are listed.
- [ ] Rollback plan is defined.
- [ ] Stop conditions are defined.
- [ ] Open questions are either resolved or documented as assumptions.

## Required by workflow mode

### New Project

Ready when:

- `PROJECT_BRIEF.md` exists.
- Initial user, problem, and desired outcome are clear.
- PRD and architecture work are explicitly planned before production code.

### Existing Project Understanding

Ready when:

- Repository root can be inspected.
- Project memory exists or will be created.
- No production code changes are planned in the same pass.

### New Feature in Existing Project

Ready when:

- Feature brief or story exists.
- Impact analysis exists or is explicitly unnecessary.
- Test plan exists or is embedded in the story.
- Product behavior and non-goals are clear.

### Bugfix

Ready when:

- Current wrong behavior is described.
- Expected behavior is described.
- Reproduction steps, failing test, or observable failure are available.
- Regression test target is identified.

### Refactor

Ready when:

- Current behavior to preserve is described.
- Safety tests or verification commands are identified.
- Allowed files are listed.
- Behavior changes are explicitly forbidden.

### Migration

Ready when:

- Migration objective is clear.
- Data affected is identified.
- Backward compatibility is considered.
- Rollback or recovery plan exists.
- Human approval is recorded for destructive migrations.

### Autonomous Phase

Ready when:

- `AUTONOMOUS_PHASE_CONTRACT.md` exists.
- Max iterations, allowed files, forbidden files, commands, completion criteria, and stop conditions are explicit.

## Not ready conditions

Do not implement when:

- Acceptance criteria are vague.
- Scope crosses multiple unrelated stories.
- The agent must choose product behavior without approval.
- Sensitive areas are touched without approval.
- Test/build commands are unknown and not discoverable.
- Rollback is undefined for risky changes.
- The requested change conflicts with project memory or architecture.

## Agent behavior when not ready

The agent must not improvise execution. It should produce a readiness gap report:

```markdown
# Readiness Gap Report

## Blocking gaps

## Assumptions that would be unsafe

## Minimum information needed

## Suggested next artifact
```
