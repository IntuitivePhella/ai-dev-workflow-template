# Skill: Regression Analysis

Identify where a change could break existing behavior.

## Procedure

1. Identify user flows adjacent to the change.
2. Identify shared modules, schemas, utilities, API contracts, and UI components affected.
3. Identify tests that should already cover those areas.
4. Identify missing regression coverage.
5. For confirmed bugs or regressions, connect to `ai/skills/diagnose.md`.
6. Require regression coverage when a root cause is fixed.
7. Identify affected domain terms and behavior contracts.
8. Record root cause, prevention, and verification.
9. Recommend targeted checks before completion.

## Output

Include likely regressions, affected flows, affected domain terms, behavior contracts, root cause, prevention, missing tests, manual QA notes, verification, and recommendation: pass, pass with concerns, fail, or split.
