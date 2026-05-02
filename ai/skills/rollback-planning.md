# Skill: Rollback Planning

Define how to recover if the change causes problems.

## Procedure

1. Identify what the story changes: code, config, schema, data, dependencies, infra, or user behavior.
2. Identify whether the change is reversible by git revert alone.
3. Identify any data/schema/config steps that need manual rollback.
4. Identify feature flags, staged rollout, or kill switch options when relevant.
5. Document rollback steps in the story or release notes.

## Output

Include:

- rollback method;
- data/config considerations;
- commands or manual steps;
- owner/human approval needs;
- limitations.

## Stop conditions

Stop when a risky change has no credible rollback or recovery plan.
