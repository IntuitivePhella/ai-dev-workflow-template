# Skill: Domain Language

Create and maintain shared domain vocabulary for product, architecture, code names, stories, specs, tests, docs, and durable memory.

Domain terms are durable operational vocabulary. They reduce ambiguity across humans, agents, specs, tests, and implementation.

## When to use

- Product, architecture, or code names are ambiguous.
- The same concept has multiple names across docs, code, tests, routes, APIs, or database terms.
- A story or spec depends on precise terminology.
- A new durable product concept is introduced.
- Existing memory contains unclear, overloaded, legacy, or invented terms.

## When not to use

- The term is a generic technical term with no project-specific meaning.
- The wording is temporary local planning language.
- The current story does not allow terminology or code renaming.
- A term is only copy text and does not affect product, architecture, tests, docs, or code understanding.

## Procedure

1. Identify domain terms in user language, product docs, stories, code, tests, routes, API names, database concepts, and existing memory artifacts.
2. Detect ambiguous, overloaded, conflicting, legacy, or invented terms.
3. Resolve each durable term into a concise definition.
4. Capture aliases and forbidden/legacy names.
5. Connect terms to code locations and artifacts when known.
6. Update `ai/08-memory/DOMAIN_GLOSSARY.md` when a term becomes durable.
7. Use resolved terms consistently in new files, tests, stories, specs, and code.

## Good domain language signals

- A term has one concise definition.
- Aliases and legacy names are explicit.
- Names in stories, specs, tests, and code are consistent.
- Related code or artifacts are linked when known.
- Open ambiguity is documented instead of hidden.

## Bad domain language signals

- New names are invented casually.
- Generic technical terms are added to the glossary.
- Code is renamed without story scope.
- A single term means different things in product and implementation.
- Durable terms are scattered through handoffs or notes instead of memory.

## Important rules

- Do not invent domain terms casually.
- Do not rename code solely for terminology unless the current story explicitly allows it.
- If a terminology choice affects architecture or durable behavior, update `ai/03-architecture/DECISION_LOG.md` or flag that a durable decision is needed.
- Do not use `DOMAIN_GLOSSARY.md` as a dumping ground for generic technical terms.

## Output format

```markdown
# Domain Language Review

## Term

## Definition

## Aliases

## Avoid saying

## Related code/artifacts

## Open ambiguity

## Memory update needed

## Decision/log update needed
```

## Stop conditions

Stop or escalate when:

- two terms could change product behavior and no owner can decide;
- a rename would touch code outside the approved story;
- terminology conflicts with existing specs, memory, or architecture;
- the team needs a durable product or architecture decision before implementation clarity is possible.
