# Squads

Squads are reusable agent configurations for common workflow modes.

They are declarative. They do not force every task to use every agent.

## Principle

```text
A squad is a default routing pattern, not a mandatory meeting.
```

## Available squads

- `new-project/` — idea to brief, discovery, PRD, architecture, stories.
- `existing-project/` — repository mapping and technical diagnosis before coding.
- `core-delivery/` — normal feature/story implementation with QA and review.
- `bugfix/` — reproduction, failing test, minimal fix, regression validation.
- `refactor/` — behavior-preserving structural work with safety checks.
- `security-review/` — sensitive changes, auth, permissions, data, secrets.
- `release/` — release readiness, rollback, known issues, deployment risk.

## How to use

1. Orchestrator classifies the task.
2. Orchestrator selects the closest squad.
3. Orchestrator removes unnecessary agents.
4. Orchestrator creates context packs.
5. Specialists return standardized outputs.
6. Orchestrator consolidates the decision.
