# Bugfix Prompt

Use this prompt when behavior is wrong and expected behavior is known.

```text
Read AGENTS.md or CLAUDE.md and the workflow rules.

Use Mode 4 — Bugfix.

Before implementation:

1. Create a bugfix story from ai/templates/BUGFIX.template.md or update the existing bug report.
2. Document current wrong behavior and expected behavior.
3. Reproduce the bug with a failing test when feasible, or document a clear reproduction path.
4. Identify files likely in scope and forbidden areas.
5. Validate readiness against ai/00-rules/DEFINITION_OF_READY.md.

Implementation rules:

- Make the smallest root-cause fix.
- Add regression coverage when feasible.
- Do not perform opportunistic refactors.
- Stop for human approval if sensitive areas are touched.

Final report must include reproduction, fix summary, tests run, risks, and follow-ups.
```
