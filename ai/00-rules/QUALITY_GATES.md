# Quality Gates

Quality gates define when an agent may move from one phase to the next.

## Gate 0 — Understanding

Before planning or coding:

- [ ] Rules read
- [ ] Project memory read
- [ ] Project map read or created
- [ ] Relevant files inspected
- [ ] Assumptions listed

## Gate 1 — Specification

Before implementation:

- [ ] Problem is clear
- [ ] Acceptance criteria are testable
- [ ] Non-goals are explicit
- [ ] Impact analysis exists for existing projects
- [ ] Test plan exists or is embedded in the story
- [ ] Human approval captured for sensitive areas

## Gate 2 — Execution

During implementation:

- [ ] Work is limited to one story or phase
- [ ] Files in scope are respected
- [ ] Tests are written or updated before/alongside code
- [ ] No tests are removed or weakened
- [ ] Architecture changes are logged
- [ ] Stop conditions are respected

## Gate 3 — Verification

Before completion:

- [ ] Relevant tests pass
- [ ] Build/typecheck/lint pass when available
- [ ] Acceptance criteria are checked one by one
- [ ] Security-sensitive changes are reviewed
- [ ] Regression risk is considered

## Gate 4 — Review

Before merge/release:

- [ ] Product review: solves the intended problem
- [ ] Engineering review: maintainable and minimal
- [ ] QA review: tested and reproducible
- [ ] Release review: rollback and known issues are clear
- [ ] Follow-ups are documented

## Gate 5 — Memory

After completion:

- [ ] `PROJECT_MEMORY.md` updated when commands, conventions, or risks changed
- [ ] `DECISION_LOG.md` updated when architecture/product decisions changed
- [ ] New tech debt captured separately, not hidden in the feature
