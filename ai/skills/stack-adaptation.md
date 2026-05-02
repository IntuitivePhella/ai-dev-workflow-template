# Skill: Stack Adaptation

Adapt the workflow to a concrete technical stack without making unsafe implementation assumptions.

## Procedure

1. Read the selected stack profile under `ai/09-intake/stack-profiles/`.
2. Identify stack-specific architecture assumptions.
3. Identify stack-specific sensitive areas.
4. Identify required setup, test, build, typecheck, and lint commands.
5. Define the first vertical slice that proves the stack without overbuilding the product.
6. Split the app into small stories.
7. Mark unresolved choices as assumptions or blocking questions.
8. Route to Architect, QA, Security, and Release when their expertise reduces risk.

## Rules

- Do not implement auth, billing, permissions, production deploy, user data, or destructive migrations without explicit approval.
- Do not choose paid services, hosting, or dependencies silently.
- Prefer project conventions when adapting an existing repository.
- Prefer stack profiles as guidance, not rigid templates.

## Output

Produce:

- selected stack profile;
- assumptions;
- architecture implications;
- required artifacts;
- first safe story;
- verification commands;
- stop conditions.
