# Agent Memory Protocol

Agent memory keeps specialist knowledge durable without forcing every agent to reread the whole repository.

## Goal

Reduce repeated analysis and token waste by storing stable, specialist-specific learnings.

## Memory locations

```text
ai/agents/memory/product.history.md
ai/agents/memory/architect.history.md
ai/agents/memory/implementer.history.md
ai/agents/memory/qa.history.md
ai/agents/memory/security.history.md
ai/agents/memory/reviewer.history.md
ai/agents/memory/release.history.md
```

## What belongs in agent memory

- Stable project conventions.
- Specialist-specific risks.
- Repeated patterns.
- Testing commands and caveats.
- Security constraints.
- Release/deploy constraints.
- Decisions that affect future specialist work.

## What does not belong in agent memory

- Temporary task notes.
- Long transcripts.
- Full file dumps.
- Unverified assumptions.
- Secrets or credentials.
- Large implementation details better captured in code.

## Project artifact boundaries

- `PROJECT_MEMORY.md`: operational/project memory for commands, conventions, recurring risks, and cross-cutting rules.
- `PROJECT_MAP.md`: repository structure, entry points, orientation, and system navigation.
- `DOMAIN_GLOSSARY.md`: durable domain vocabulary that should stay consistent across docs, specs, tests, and code.
- `DECISION_LOG.md`: durable decisions and trade-offs that matter to future implementation or review.
- `ADR`: high-impact, hard-to-reverse, surprising, or trade-off-heavy decisions that need preserved reasoning.
- `PROTOTYPE_NOTES`: temporary or transitional exploration artifacts that record findings and the exit decision.
- `HANDOFF`: session-transition guidance, not a durable truth source.

Update the narrowest durable artifact that preserves the right knowledge.

Handoffs should reference durable artifacts instead of copying them.

## Update rules

Update agent memory when:

- a new stable convention is discovered;
- a recurring risk is identified;
- a testing/release/security rule changes;
- a specialist decision should affect future tasks;
- a repeated issue should not be rediscovered.

Do not update agent memory for every small task.

## ADR criteria

Create or recommend an ADR when at least one is true:

- the decision is hard to reverse;
- the decision would be surprising without context;
- the decision involves a real trade-off;
- the decision affects architecture, data model, security, operations, cost, or long-term developer workflow.

Do not require ADRs for every small decision.

## Entry format

```markdown
## YYYY-MM-DD — Short title

- Context:
- Learning:
- Applies to:
- Source artifact:
- Confidence: High / Medium / Low
```

## Consolidation

Important specialist memories should also be summarized in `ai/08-memory/PROJECT_MEMORY.md` when they affect the whole project.
