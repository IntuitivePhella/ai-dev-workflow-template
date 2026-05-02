# Refactor Prompt

Use this prompt for behavior-preserving structural improvements.

```text
Read AGENTS.md or CLAUDE.md and the workflow rules.

Use Mode 5 — Refactor.

Do not implement until the refactor is ready.

First:

1. Create a refactor story from ai/templates/REFACTOR.template.md.
2. State the current behavior that must be preserved.
3. Identify allowed files and forbidden files.
4. Identify safety tests or add characterization tests if needed.
5. Validate readiness against ai/00-rules/DEFINITION_OF_READY.md.

Rules:

- No product behavior changes.
- No dependency swaps unless approved.
- No schema/API changes unless approved.
- No unrelated cleanup.
- Run tests/build/typecheck/lint where available.

Final report must state how behavior preservation was verified.
```
