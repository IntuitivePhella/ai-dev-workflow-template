# Brainstorming Playbook

Use this playbook when the user has an idea but has not clearly defined what to build.

This is the pre-brief discovery layer. It turns vague ideas into a usable project brief, PRD direction, architecture constraints, and first story candidates.

## When to use

Use when the user says things like:

- "I have an idea"
- "I want to build an app but I'm not sure exactly what"
- "Help me shape this product"
- "I want to create something for X"
- "I need a SaaS for Y"
- "Let's brainstorm"
- "I only have the general concept"

Do not use when:

- the user already provides a ready story;
- the user asks for a focused bugfix;
- the user only wants repository understanding;
- the user already has PRD, architecture, and acceptance criteria.

## Goal

Produce enough clarity to safely create:

1. `ai/09-intake/INTAKE.md`
2. `ai/01-discovery/PROJECT_BRIEF.md`
3. `ai/01-discovery/DISCOVERY.md`
4. `ai/02-product/PRD.md` outline
5. `ai/03-architecture/ARCHITECTURE.md` outline
6. first story split under `ai/04-stories/`

Do not write production application code during brainstorming.

## Operating principle

Do not interrogate the user with a long questionnaire.

Use progressive narrowing:

```text
Idea
→ Problem
→ User
→ Desired outcome
→ Use cases
→ MVP boundary
→ Non-goals
→ Risks/sensitive areas
→ Stack assumptions
→ First vertical slice
```

Ask one high-leverage question at a time when needed. Make safe assumptions explicitly.

## Brainstorming phases

### Phase 1 — Idea capture

Capture the raw idea without judging it.

Questions to consider:

- What is the rough idea?
- Who is it for?
- What pain or opportunity does it address?
- What would make it obviously useful?

Output:

```markdown
## Raw idea

## Initial user hypothesis

## Initial problem hypothesis

## Initial desired outcome
```

### Phase 2 — Problem framing

Convert the idea into a problem statement.

Questions to consider:

- What problem exists today?
- How is the user solving it now?
- What is painful, slow, expensive, risky, or manual?
- What happens if the problem is not solved?

Output:

```markdown
## Problem statement

## Current alternatives

## Why now

## Success signal
```

### Phase 3 — User and ICP framing

Clarify who the product is for.

Questions to consider:

- Who is the primary user?
- Who pays, approves, or operates the system?
- Is there more than one role?
- Which user matters for the MVP?

Output:

```markdown
## Primary user

## Secondary users

## Buyer/approver

## MVP user focus
```

### Phase 4 — Solution exploration

Explore possible solution shapes without committing to implementation.

Questions to consider:

- What is the simplest version that creates value?
- What workflows must exist?
- What can be manual in v1?
- What can be postponed?

Output:

```markdown
## Candidate solution

## Core workflows

## MVP capabilities

## Later capabilities
```

### Phase 5 — Scope boundary

Define MVP, non-goals, and story boundaries.

Questions to consider:

- What must be in v1?
- What is explicitly not in v1?
- What would make the first version too big?
- What is the first vertical slice?

Output:

```markdown
## MVP scope

## Non-goals

## First vertical slice

## Story split candidates
```

### Phase 6 — Risk and sensitivity scan

Identify areas that change routing and approval requirements.

Check for:

- authentication;
- authorization/permissions;
- billing/payments;
- personal or sensitive user data;
- uploads/downloads/files;
- public APIs/webhooks/integrations;
- database migrations;
- production infrastructure;
- legal/compliance behavior.

Output:

```markdown
## Sensitive areas

## Approval required

## Risk notes

## Stop conditions
```

### Phase 7 — Stack and implementation direction

If the user has a preferred stack, use a stack profile. If not, document options without prematurely locking the choice.

Questions to consider:

- Is a stack required by the user?
- Is this prototype, MVP, or production-bound?
- Are there known hosting, database, auth, or integration constraints?

Output:

```markdown
## Stack preference

## Stack profile selected

## Architecture assumptions

## Open architecture questions
```

### Phase 8 — Artifact handoff

Convert brainstorming into durable workflow artifacts.

Required handoff:

```markdown
# Brainstorming Handoff

## Product idea

## Problem

## Users

## Desired outcome

## MVP scope

## Non-goals

## Core workflows

## Sensitive areas

## Stack direction

## First vertical slice

## Recommended workflow mode

## Recommended squad level

## Required next artifacts

## Blocking question, if any
```

## Agent routing

Default:

- Orchestrator + Product

Add Architect when:

- stack is selected;
- data model matters;
- integrations are involved;
- technical feasibility is unclear.

Add QA when:

- acceptance criteria or testability need shaping.

Add Security when:

- sensitive areas are likely.

Do not add Implementer during brainstorming.

## Completion criteria

Brainstorming is complete when the agent can safely create a Project Brief without inventing the product.

Minimum clarity required:

- primary user is identified;
- problem statement is clear enough;
- desired outcome is clear enough;
- MVP boundary is drafted;
- obvious non-goals are listed;
- sensitive areas are flagged;
- next artifact is clear.

## If clarity is still low

Produce a Brainstorming Gap Report:

```markdown
# Brainstorming Gap Report

## What is clear

## What is unclear

## Unsafe assumptions

## One blocking question

## Suggested next step
```
