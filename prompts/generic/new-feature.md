# New Feature Prompt

Use this prompt for a meaningful new feature in an existing project.

```text
Read AGENTS.md or CLAUDE.md and the workflow rules.

Use Mode 3 — New Feature in Existing Project.

Do not implement immediately.

First:

1. Create or update ai/02-product/FEATURE_BRIEF.md or a feature story under ai/04-stories/.
2. Create or update ai/05-execution/IMPACT_ANALYSIS.md.
3. Create or update ai/05-execution/TEST_PLAN.md or embed the test plan in the story.
4. Select the smallest safe squad using ai/agents/ROUTING_MATRIX.md.
5. Validate readiness against ai/00-rules/DEFINITION_OF_READY.md.
6. If the story is ready, execute one story only using ai/05-execution/EXECUTION_PROTOCOL.md.

Constraints:

- Use TDD where feasible.
- Do not touch files outside scope without explaining why.
- Do not add dependencies without documenting trade-offs.
- Stop for human approval if auth, billing, permissions, user data, secrets, migrations, infra, or paid external APIs are touched.

Before final answer, run relevant tests/build/typecheck/lint where available and report what was run.
```
