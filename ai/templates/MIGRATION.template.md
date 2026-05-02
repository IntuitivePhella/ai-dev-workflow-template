# Migration: <title>

## Objective

What data, schema, infrastructure, or compatibility change should this migration accomplish?

## Migration type

- [ ] Database schema
- [ ] Data backfill
- [ ] Config/infrastructure
- [ ] API contract/versioning
- [ ] Dependency/runtime
- [ ] Other

## Current state

## Target state

## Workflow mode

- [ ] New feature in existing project
- [ ] Refactor
- [ ] Autonomous phase

## Squad level

- [ ] Level 2 — Mini Squad
- [ ] Level 3 — Full Squad

## Human approval

Required for destructive migrations, production infrastructure, data deletion, user data, secrets, billing, auth, permissions, and paid external services.

Approval recorded: Yes/No

## Affected data / systems

- TBD

## Compatibility plan

How will old and new code/data coexist during rollout?

## Rollout plan

1. TBD

## Rollback / recovery plan

How can the migration be reverted or recovered if it fails?

## Files likely in scope

- TBD

## Files or areas explicitly forbidden

- TBD

## Tests required

- [ ] Migration test or dry run
- [ ] Backward compatibility test
- [ ] Regression tests for affected flows
- [ ] Manual verification if needed

## Commands to run

```bash
TBD
```

## Observability

What logs, metrics, admin checks, or queries confirm success?

## Acceptance criteria

- [ ] Migration can run safely.
- [ ] Compatibility plan is documented.
- [ ] Rollback or recovery plan is documented.
- [ ] Tests/checks pass.
- [ ] Sensitive approvals are recorded.

## Risks

## Definition of done

- [ ] Definition of Ready satisfied
- [ ] Approval recorded if required
- [ ] Migration implemented
- [ ] Tests/checks pass
- [ ] Rollout and rollback documented
- [ ] Decision log updated if architecture/data model changed
