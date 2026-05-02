# Classification Rules

Use this file before selecting agents or squads.

## Classification sequence

1. Identify the workflow mode.
2. Identify risk level.
3. Identify sensitive triggers.
4. Identify likely impacted files/modules.
5. Select the smallest squad that covers the risk.
6. Create context packs for selected specialists.
7. Log the orchestration decision when the task is non-trivial.

## Workflow mode classifier

| Signal | Workflow mode |
|---|---|
| Empty repo, new idea, product concept | New Project |
| User asks to understand repo, analyze architecture, map codebase | Existing Project Understanding |
| User asks to add user-visible behavior | New Feature in Existing Project |
| User reports wrong behavior, failing test, regression, error | Bugfix |
| User asks to improve structure without behavior change | Refactor |
| User asks to run hands-off, overnight, loop, phase-by-phase | Autonomous Phase |

## Risk classifier

### Low risk

- Documentation-only changes
- Comments or copy updates
- Non-behavioral formatting
- Small isolated edits with tests already present

Default squad: Level 0 or Level 1.

### Medium risk

- New feature in one module
- Bugfix with moderate regression risk
- Refactor with safety tests
- Integration with non-sensitive internal modules
- Public behavior change with clear acceptance criteria

Default squad: Level 2.

### High risk

- Authentication
- Authorization or permissions
- Billing/payments
- Personal data
- Public APIs or webhooks
- Database migrations
- Infrastructure/deploy
- Multi-module architecture changes
- New dependencies or framework changes
- Autonomous execution

Default squad: Level 2 or Level 3.

## Sensitive trigger classifier

If any trigger below appears, include Security Agent unless explicitly irrelevant:

- auth
- login
- session
- token
- permission
- role
- billing
- payment
- invoice
- secret
- env var
- personal data
- PII
- upload
- download
- webhook
- public API
- database migration
- production
- infrastructure
- multi-tenant
- tenant isolation

## Agent inclusion rules

### Product

Include when the task changes user behavior, scope, UX, acceptance criteria, or product trade-offs.

### Architect

Include when the task changes modules, APIs, data model, dependencies, architecture boundaries, or integration patterns.

### Implementer

Include only when the work is ready to execute.

### QA

Include when behavior must be verified, tests must be designed, or regression risk exists.

### Security

Include when sensitive triggers exist.

### Reviewer

Include after implementation when maintainability, simplicity, or architecture consistency matters.

### Release

Include when user-visible, deploy, migration, rollback, or operational readiness matters.

## Defer implementation when

- No acceptance criteria exist.
- Scope is unclear.
- Sensitive approval is missing.
- Architecture is disputed.
- Required verification commands are unknown.
- The story is too large to complete safely.

## Token-saving rules

- Prefer Level 0/1 for low-risk tasks.
- Do not ask every specialist to read the full repo.
- Use `CONTEXT_PACK.template.md` for specialists.
- Require concise specialist outputs.
- Log decisions only for non-trivial tasks.
- Create durable handoff files only when future sessions need them.
