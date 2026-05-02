# Orchestration Log

Use this folder to record non-trivial orchestration decisions.

Do not log every small task. Log only decisions that future sessions may need to understand.

## When to create a log entry

Create a log entry when:

- multiple specialists were involved;
- the Orchestrator escalated or de-escalated a squad;
- a specialist returned `Block`, `Fail`, or `No-go`;
- a product or architecture trade-off was decided;
- sensitive approval was required;
- autonomous execution was used;
- a release go/no-go decision was made.

## Filename convention

```text
YYYY-MM-DD-short-task-name.md
```

Example:

```text
2026-05-02-auth-refresh-token-review.md
```

## Log format

```markdown
# Orchestration Log — <task>

## Date

## Task

## Workflow mode

## Squad level

## Agents selected

## Agents skipped and why

## Context packs used

## Specialist outputs considered

## Decision

## Rationale

## Risks

## Follow-ups

## Memory updates required
```
