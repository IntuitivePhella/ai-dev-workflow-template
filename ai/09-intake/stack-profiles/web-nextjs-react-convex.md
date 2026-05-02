# Stack Profile: Web App — Next.js + React + Convex

Use this profile when the user wants to create or evolve a web app with Next.js, React, and Convex.

## Default classification

- Project type: Web app / SaaS candidate
- Workflow mode for new app: New Project
- Workflow mode for existing app: Existing Project Understanding first, then New Feature
- Default squad: Level 2
- Escalate to Level 3 when auth, permissions, billing, user data, migrations, or production deploy are involved

## Recommended agents

### New project

Required:

- Orchestrator
- Product
- Architect
- QA

Add:

- Security when auth, user data, uploads, integrations, or permissions are involved
- Release when deployment, migrations, or launch plan is involved
- Reviewer before merging generated implementation

### Existing project

Required first:

- Orchestrator
- Architect

Then route by story:

- Implementer for ready stories
- QA for test plan and acceptance criteria validation
- Security for sensitive areas
- Reviewer for non-trivial diffs

## Default architecture assumptions

These assumptions are safe starting points, not final decisions.

- Next.js App Router unless the existing project uses Pages Router.
- React server components where useful, client components only when interactivity is required.
- Convex for data, server functions, and real-time sync.
- TypeScript by default.
- Component-driven UI with clear boundaries between app routes, UI components, Convex functions, and shared domain logic.
- Authentication must be explicitly selected and approved before implementation.
- Payments must be treated as sensitive and require human approval.

## Suggested project structure

```text
app/                         # Next.js routes and layouts
components/                  # Reusable UI components
convex/                      # Convex schema, queries, mutations, actions
lib/                         # Shared utilities and adapters
features/                    # Optional domain feature modules
__tests__/ or tests/         # Test files, depending on chosen runner
ai/                          # Workflow artifacts
```

## Required discovery questions

Ask only what blocks safe progress. Prefer assumptions when safe.

1. What is the app's primary user and core job-to-be-done?
2. Does the app need authentication in the first version?
3. Does the app store personal or sensitive user data?
4. Does the app need payments/subscriptions?
5. Is this a prototype, MVP, or production-bound app?

If the user already answered enough, do not ask again.

## Required artifacts for a new app

1. `ai/09-intake/INTAKE.md`
2. `ai/01-discovery/PROJECT_BRIEF.md`
3. `ai/02-product/PRD.md`
4. `ai/03-architecture/ARCHITECTURE.md`
5. `ai/05-execution/TEST_PLAN.md`
6. Stories under `ai/04-stories/`

## First story recommendation

Do not start with the full app.

Recommended first story:

```text
Create the project skeleton and first vertical slice shell without auth, billing, or production deploy.
```

Acceptance criteria should include:

- Next.js app boots locally.
- TypeScript is configured.
- Convex is initialized or stubbed according to environment constraints.
- One route renders the product shell.
- One minimal Convex query/mutation or placeholder contract exists.
- Test/build/typecheck commands are documented.
- No auth, billing, or sensitive user data is implemented unless explicitly approved.

## Common story split

1. Project skeleton and tooling
2. Product shell and navigation
3. Convex schema and first data flow
4. Core feature vertical slice
5. Auth integration, if approved
6. Permissions and multi-user behavior, if needed
7. Billing/subscription, if approved
8. QA hardening and release readiness

## Verification commands

Use project-specific commands if they already exist. Otherwise propose:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

If commands are missing, create or document them as part of the relevant story.

## Sensitive defaults

Treat these as sensitive:

- authentication provider setup;
- user profile data;
- organization/team membership;
- file uploads;
- billing/subscriptions;
- production deployment;
- Convex production database changes;
- environment variables and secrets.

## Stop conditions

Stop before implementation when:

- auth provider is undecided but required;
- billing/subscriptions are requested without approval;
- personal data model is unclear;
- production deploy is requested without release/rollback plan;
- Convex schema changes could affect existing production data;
- the requested first build includes more than one vertical slice.
