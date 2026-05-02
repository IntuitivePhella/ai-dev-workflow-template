# Agent Squads

This folder defines specialist agent roles for the workflow.

The goal is not to make every task use every agent. The goal is to let the Orchestrator route work to the smallest useful squad.

## Principle

```text
Use specialists to reduce risk, not to create bureaucracy.
```

## Default operating model

1. Orchestrator selects the workflow mode.
2. Orchestrator selects the smallest squad level.
3. Each specialist receives a compact context pack.
4. Each specialist returns a standardized output.
5. Orchestrator consolidates decisions and moves the workflow forward.

## Available agents

- `ORCHESTRATOR.md` — routes work, controls scope, budget, gates, and handoffs.
- `PRODUCT.md` — clarifies problem, user, value, scope, and acceptance criteria.
- `ARCHITECT.md` — evaluates architecture, data model, APIs, dependencies, and trade-offs.
- `IMPLEMENTER.md` — executes one story with tests and minimal code changes.
- `QA.md` — validates acceptance criteria, test coverage, edge cases, and regressions.
- `SECURITY.md` — reviews sensitive areas, threats, auth, permissions, data exposure, and secrets.
- `REVIEWER.md` — performs senior engineering review for maintainability and simplicity.
- `RELEASE.md` — checks release readiness, rollback, known issues, and deployment risk.

## Supporting files

- `ROUTING_MATRIX.md` — when to call each agent.
- `SQUAD_LEVELS.md` — token-aware squad sizes.
- `HANDOFF.template.md` — standard handoff contract.
- `AGENT_OUTPUTS.md` — standard output format for each agent.
- `CONTEXT_PACK.template.md` — minimal context bundle for specialist work.
