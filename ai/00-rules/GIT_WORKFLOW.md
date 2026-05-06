# Git Workflow

Use this repository workflow to keep AI-generated changes small, reviewable, and reversible.

## Core rules

1. One branch per story, bugfix, refactor, migration, or autonomous phase.
2. One pull request should solve one coherent problem.
3. Do not mix feature work with opportunistic refactors.
4. Do not commit generated secrets, local environment files, credentials, or production data.
5. Do not force-push shared branches unless explicitly approved.
6. Do not merge while required gates are failing.
7. Do not commit transient local coordination artifacts; publish only source files, tests, documentation, templates, examples, and approved durable workflow artifacts that belong in the shared repository.
8. When working on AI-PhellOS itself, keep one-off execution plans, temporary context packs, transient handoffs, and intermediate review packets out of the published framework. Store them under `ai/_local/` while active, then remove them or leave them ignored before publication.

## Branch naming

Use:

```text
ai/<story-id>-<short-slug>
```

Examples:

```text
ai/001-login-rate-limit
ai/bugfix-payment-webhook-retry
ai/refactor-auth-service-boundaries
ai/migration-add-org-membership-index
```

## Commit rules

Prefer small commits that match the story progression:

```text
test: add failing coverage for <behavior>
feat: implement <small change>
fix: correct <specific defect>
refactor: simplify <module> without behavior change
docs: update <artifact>
chore: update workflow metadata
```

A commit should be understandable without reading the entire diff.

## Pull request requirements

When a completed story or phase is ready to publish, use `ai/skills/publish-approved-work.md` to run the approval-gated branch, commit, push, and PR procedure.

Publication requires explicit human approval. Do not infer approval to create a branch, commit, push, or open a PR from approval of the implementation itself.

Every PR should include:

```markdown
## Summary

## Story / artifact

## Workflow mode

## Squad level

## Files changed

## Acceptance criteria

## Tests run

## Quality gates

## Security / sensitive areas

## Rollback plan

## Risks and follow-ups
```

## Required checks before PR is ready

- [ ] Story passes `Definition of Ready`.
- [ ] Quality gates 0-3 are satisfied.
- [ ] Relevant tests pass.
- [ ] Build/typecheck/lint pass where available.
- [ ] Accepted change package deltas are synced with `aiwf sync` when durable behavior specs must change.
- [ ] Completed change packages are archived with `aiwf archive` when their tasks are checked off and the package should remain in audit history.
- [ ] No forbidden files were changed.
- [ ] Transient coordination artifacts are excluded or explicitly approved as durable framework content.
- [ ] Sensitive areas have approval when applicable.
- [ ] Memory or decision log updated when project conventions, architecture, commands, or risks changed.

## Merge policy

Prefer squash merge for AI-generated story branches unless commit history is intentionally meaningful.

Do not merge when:

- acceptance criteria are incomplete;
- tests are failing without documented approval;
- rollback is unclear for risky changes;
- security, auth, billing, permissions, data deletion, or production infra were touched without explicit approval;
- transient coordination artifacts are included without explicit approval as durable project content;
- the diff includes unrelated cleanup or hidden scope.

## Emergency rollback

Every story must include one rollback approach:

- revert PR;
- feature flag disablement;
- config rollback;
- migration down/recovery plan;
- operational runbook step.

If rollback is impossible or high-risk, the story requires explicit human approval before implementation.
