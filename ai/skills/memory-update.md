# Skill: Memory Update

Keep durable project knowledge accurate after meaningful work.

## Memory targets

- `ai/08-memory/PROJECT_MEMORY.md` is for operational/project memory: commands, conventions, risks, recurring decisions, and project rules.
- `ai/08-memory/PROJECT_MAP.md` is for repository structure and system orientation.
- `ai/08-memory/DOMAIN_GLOSSARY.md` is for durable domain vocabulary.
- `ai/03-architecture/DECISION_LOG.md` is for durable decisions and trade-offs.
- `ADR` is for high-impact, hard-to-reverse, surprising, or trade-off-heavy decisions that need preserved reasoning.
- `PROTOTYPE_NOTES` is for disposable exploration findings and the exit decision.
- `HANDOFF` is for session transition only and should not become a second memory system.

## Procedure

1. Update `ai/08-memory/PROJECT_MEMORY.md` when commands, conventions, risks, project rules, or recurring decisions changed.
2. Update `ai/08-memory/PROJECT_MAP.md` when repo structure, entry points, stack, or commands changed.
3. Update `ai/08-memory/DOMAIN_GLOSSARY.md` when domain terms are clarified or become durable.
4. Update `ai/03-architecture/DECISION_LOG.md` when architecture or product decisions changed.
5. Create or update an ADR when a decision is hard to reverse, surprising, trade-off-heavy, or affects architecture, data model, security, operations, cost, or long-term developer workflow.
6. Create or update `PROTOTYPE_NOTES` when a prototype was used to answer a question and needs a durable exit decision.
7. Use `HANDOFF` only for session transition and keep it path-reference based.
8. Update the narrowest durable artifact that preserves the right knowledge.
9. Capture tech debt separately instead of hiding it inside completed work.
10. Keep memory concise and operational.

## Do not update memory for

- trivial copy edits;
- purely local experiment notes;
- temporary implementation details that do not affect future work.

## Rules

- Do not duplicate durable artifacts in handoffs; reference paths instead.
- `HANDOFF` should reference durable artifacts rather than duplicate them.
- Domain terminology updates should go to `DOMAIN_GLOSSARY.md`, not random notes.
- Do not use memory files as raw transcripts.

## Output

List memory files updated and what durable knowledge changed.
