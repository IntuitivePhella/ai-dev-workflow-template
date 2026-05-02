# Change Size Policy

AI-assisted development works best when each change is small enough to understand, test, review, and revert.

## Default size rule

A story should target one coherent outcome.

If the work requires unrelated edits across multiple domains, split it.

## Recommended limits

These are guidance limits, not hard laws:

- Files changed: 1-8 for normal stories.
- Lines changed: under 400 for normal stories.
- Modules touched: 1-2 bounded areas.
- New dependencies: 0 unless explicitly justified.
- Database migrations: 1 migration per migration story.
- User-visible behavior changes: 1 primary behavior per story.

## Split triggers

Split the story when:

- acceptance criteria describe multiple independent outcomes;
- frontend, backend, data model, and infrastructure all change at once;
- the implementation needs more than one architectural decision;
- a refactor is needed before the feature can be safely added;
- tests require a large harness unrelated to the feature;
- rollback would be hard to describe in one clear path;
- review would require different experts for unrelated concerns.

## Allowed larger changes

Larger changes are allowed only when:

- the story explicitly says it is a broad refactor, migration, or new project phase;
- a stronger test plan exists;
- rollback or recovery is documented;
- the squad level is escalated appropriately;
- human approval is recorded for sensitive or destructive work.

## Agent behavior

When a request is too large, the agent should not start coding. It should propose a story split:

```markdown
# Story Split Proposal

## Original request

## Why it is too large

## Proposed stories

1. ...
2. ...
3. ...

## Recommended first story

## Dependencies between stories
```
