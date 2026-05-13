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

## Focused skill routing

### Prototype

- When to use: uncertain design, product, UX, integration, performance, or technical questions where a disposable experiment is safer than premature production architecture.
- Agents involved: Orchestrator by default; add Product for UX/product uncertainty and Architect for technical direction or absorption review.
- Artifacts touched: prototype notes, bounded prototype code when explicitly allowed, relevant specs/stories only as references, and `DECISION_LOG.md` or ADRs when findings become durable decisions.
- Stop/escalation condition: prototype scope expands, sensitive areas appear without approval, or absorption into production is attempted without a real story/change.

### Work Intake Triage

- When to use: loose requests, mixed asks, bug reports, stakeholder requests, change proposals, or any work item that is not obviously ready for story execution.
- Agents involved: Orchestrator by default; add Product when scope or acceptance criteria need shaping, and Architect when system impact is unclear.
- Artifacts touched: intake notes, existing stories/specs for context, and readiness outputs that classify the work as `needs-discovery`, `needs-info`, `ready-for-story`, `ready-for-human`, `ready-for-agent`, `blocked`, or `out-of-scope`.
- Stop/escalation condition: triage would invent missing context, the request touches sensitive areas without explicit safeguards, or a human decision is required before the next step.

### ADR / Durable Decision

- When to use: hard-to-reverse, surprising, trade-off-heavy, or long-lived decisions affecting architecture, data model, security, operations, cost, or developer workflow.
- Agents involved: Orchestrator plus Architect by default; add Product when the decision changes user-facing behavior or scope boundaries.
- Artifacts touched: `ai/03-architecture/DECISION_LOG.md`, `ai/templates/ADR.template.md`, related specs/stories, and project memory when the decision changes operating rules.
- Stop/escalation condition: the decision lacks ownership, conflicts with existing memory/specs, or needs explicit human approval before becoming durable.

### Diagnose

- When to use: bugfixes, flaky tests, performance regressions, regressions, and unexplained failures.
- Agents involved: Orchestrator plus Implementer and QA when execution or verification is needed.
- Artifacts touched: bug report/story, failing test or reproduction, regression coverage, `PROJECT_MEMORY.md` when a recurring risk is discovered.
- Stop/escalation condition: reproduction cannot be established, tests are weakened, two serious fix attempts fail, or sensitive areas require approval.

### Domain Language

- When to use: ambiguous, overloaded, conflicting, legacy, or invented product/domain terminology.
- Agents involved: Orchestrator plus Product; add Architect when terminology affects architecture or durable behavior.
- Artifacts touched: stories, specs, tests, docs, code names when in scope, `ai/08-memory/DOMAIN_GLOSSARY.md`, and `DECISION_LOG.md` when a durable decision is needed.
- Stop/escalation condition: a naming choice changes product behavior, conflicts with existing memory/specs, or requires code renaming outside the approved story.

### Architecture Deepening

- When to use: explicit refactor or architecture improvement work, shallow modules, bad seams, high coupling, scattered domain rules, or hard-to-test areas.
- Agents involved: Orchestrator plus Architect; add Implementer, QA, and Reviewer for approved structural stories.
- Artifacts touched: `PROJECT_MAP.md`, architecture docs, `DECISION_LOG.md`, relevant stories/specs, tests, and candidate refactor stories.
- Stop/escalation condition: behavior preservation cannot be proven, the candidate is a broad rewrite, public behavior would change, or sensitive areas require approval.

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
