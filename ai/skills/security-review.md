# Skill: Security Review

Evaluate sensitive changes and approval requirements.

## Procedure

1. Identify sensitive areas touched by the story or diff.
2. Check authentication, authorization, permissions, data exposure, secrets, logs, uploads/downloads, webhooks, integrations, infra, and migrations.
3. Identify abuse cases and misuse paths.
4. Verify human approval is recorded when required.
5. Recommend required changes or blockers.

## Output

Use the Security Review format in `ai/agents/AGENT_OUTPUTS.md`.

## Stop conditions

Block when sensitive behavior changes without approval, secrets or personal data may be exposed, destructive migrations are involved, or production access is required.
