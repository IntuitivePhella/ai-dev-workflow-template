# Skill: Engineering Review

Review implementation quality before merge or release.

## Procedure

1. Compare implementation against story and acceptance criteria.
2. Review changed files for maintainability, simplicity, and architecture consistency.
3. Check whether tests are meaningful and not weakened.
4. Check whether scope stayed within allowed files and story boundaries.
5. Check whether architecture or product decisions were logged when needed.
6. Check TDD quality:
   - public behavior tests;
   - regression coverage;
   - no weakened or skipped tests.
7. Check architecture:
   - deep modules;
   - clean seams;
   - low coupling;
   - locality;
   - no opportunistic refactor.
8. Check domain language consistency:
   - names align with `ai/08-memory/DOMAIN_GLOSSARY.md` when present;
   - ambiguous names are flagged.
9. Check AFK/HITL classification if reviewing a story or plan.
10. Check whether prototype artifacts were deleted, archived, or absorbed deliberately.
11. Check whether ADR/DECISION_LOG updates were made when durable decisions were introduced.
12. Check whether the handoff duplicated durable artifacts instead of referencing them.
13. Identify required changes, risks, and follow-ups.

## Output

Use the Engineering Review format in `ai/agents/AGENT_OUTPUTS.md`.
