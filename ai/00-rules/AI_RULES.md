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

## Sensitive product domains requiring Privacy & Safety Review

Some projects are sensitive even before implementation touches authentication, billing, production infrastructure, or real user data.

Automatically trigger a Privacy & Safety Review when the product involves any of the following:

- Healthcare, elder care, mental health, disability care, or child safety.
- Surveillance, monitoring, cameras, video, audio, biometrics, face recognition, or image analysis of people.
- Physical safety alerts, emergency response, fall detection, medical-like triage, risk scoring, or incident escalation.
- Vulnerable populations, including elderly people, children, patients, residents, detainees, workers under monitoring, or people in care facilities.
- Location tracking, access control, restricted areas, staff monitoring, or behavior monitoring.
- Legal, compliance, consent, retention, audit logs, evidence handling, or regulated reporting.

Required behavior:

1. Do not block harmless planning or mock-only prototyping.
2. Mark the project or story as sensitive-domain.
3. Include Security as a consultative agent at minimum.
4. Generate or update a privacy/safety artifact.
5. Keep real integrations, real personal data, real camera feeds, production alerts, and real notifications out of scope until explicitly approved.
6. Record assumptions about consent, retention, access control, auditability, and data minimization.
7. Add stop conditions for any move from mock data to real sensitive data or real-world alerting.

Recommended artifact:

```text
ai/06-reviews/PRIVACY_AND_SAFETY_REVIEW.md
```

## Agent stop conditions

Stop and ask for approval when:

- A product decision is required.
- The requested change conflicts with architecture.
- Tests cannot pass after two serious attempts.
- The story scope is too large.
- A dependency, framework, or database choice must change.
- You need to access external services or production resources.
