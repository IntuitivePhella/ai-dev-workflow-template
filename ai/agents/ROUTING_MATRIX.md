# Routing Matrix

Use this matrix to select the smallest safe squad.

## Default rule

```text
Start with Orchestrator. Add specialists only when their expertise reduces risk or ambiguity.
```

## By workflow mode

| Workflow mode | Required agents | Optional agents |
|---|---|---|
| New Project | Orchestrator, Product, Architect, QA | Security, Reviewer, Release |
| Existing Project Understanding | Orchestrator, Architect | Security, Reviewer |
| New Feature in Existing Project | Orchestrator, Product, Implementer, QA | Architect, Security, Reviewer, Release |
| Bugfix | Orchestrator, Implementer, QA | Reviewer, Security |
| Refactor | Orchestrator, Architect, Implementer, QA, Reviewer | Security |
| Autonomous Phase | Orchestrator, Implementer, QA, Reviewer | Security, Release |

## Specialist triggers

### Product Agent

Call Product when:

- user behavior changes;
- feature scope is unclear;
- acceptance criteria are missing;
- UX flow changes;
- prioritization or non-goals need definition.

Skip Product when:

- the task is a pure bugfix with known expected behavior;
- the task is a mechanical refactor;
- the task is code cleanup with no behavior change.

### Architect Agent

Call Architect when:

- multiple modules are affected;
- data model changes;
- public APIs change;
- dependencies are added or replaced;
- performance/scalability matters;
- architecture, layering, or boundaries are unclear.

Skip Architect when:

- the change is isolated and follows existing patterns;
- the task is cosmetic;
- only docs or copy changes.

### Implementer Agent

Call Implementer when:

- a story, bug report, or explicit coding task is ready;
- scope and acceptance criteria are clear;
- tests/verification commands are known or discoverable.

Do not call Implementer when:

- the work is still discovery/planning;
- sensitive approval is missing;
- architecture/product decisions are unresolved.

### QA Agent

Call QA when:

- acceptance criteria must be validated;
- tests need planning;
- bug reproduction is needed;
- regression risk exists;
- release confidence matters.

Skip QA only for trivial docs/copy changes with no behavioral risk.

### Security Agent

Call Security when the task touches:

- authentication;
- authorization/permissions;
- billing/payments;
- secrets/env vars;
- user or personal data;
- logs containing sensitive data;
- uploads/downloads/files;
- public APIs/webhooks;
- integrations;
- database migrations;
- infrastructure;
- multi-tenant boundaries.

### Reviewer Agent

Call Reviewer when:

- code changed and needs senior engineering review;
- refactor was performed;
- architecture consistency matters;
- complexity risk exists;
- autonomous output needs acceptance.

### Release Agent

Call Release when:

- user-visible behavior changed;
- deployment is planned;
- migrations are involved;
- rollback is needed;
- release notes are needed;
- operational risk exists.

## Escalation rules

Escalate squad level when:

- a specialist returns `Block`;
- scope expands beyond one story;
- sensitive areas are touched;
- tests cannot verify the behavior;
- architecture or product decisions conflict;
- release risk is unclear.

## De-escalation rules

De-escalate when:

- the task is documentation-only;
- the change is isolated and low-risk;
- acceptance criteria are already clear;
- no code or behavior changes;
- existing tests cover the area well.
