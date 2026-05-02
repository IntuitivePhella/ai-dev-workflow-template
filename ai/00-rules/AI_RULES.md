# AI Rules

## Non-negotiables

1. Never implement without a brief, story, bug report, or explicit task.
2. Never remove tests to make a build pass.
3. Never weaken validation, authentication, authorization, or logging without approval.
4. Never perform opportunistic refactors during feature work.
5. Never change architecture without documenting the decision.
6. Never run destructive database migrations without explicit approval.
7. Never deploy to production without explicit approval.
8. Always run relevant tests before marking work complete.
9. Always report assumptions, risks, and follow-ups.
10. Always keep changes small enough to review.

## Sensitive areas requiring human approval

- Billing
- Authentication
- Authorization/permissions
- Secrets
- Production infrastructure
- Data deletion
- User personal data
- Email/SMS/WhatsApp sending
- Paid external APIs
- Legal/compliance behavior
- Destructive migrations

## Agent stop conditions

Stop and ask for approval when:

- A product decision is required.
- The requested change conflicts with architecture.
- Tests cannot pass after two serious attempts.
- The story scope is too large.
- A dependency, framework, or database choice must change.
- You need to access external services or production resources.
