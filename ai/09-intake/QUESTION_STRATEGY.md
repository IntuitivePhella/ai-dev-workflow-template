# Question Strategy

Use this strategy during intake, brainstorming, discovery, and project shaping.

## Core rule

Ask the fewest questions needed to make the next safe move.

Do not ask a long questionnaire upfront.

## Operating model

Use progressive narrowing:

```text
Classify intent
→ Extract what is already known
→ Make safe assumptions explicit
→ Ask one blocking question only if needed
→ Create or update the next artifact
→ Continue narrowing through artifacts
```

## Question types

### Blocking questions

Ask only when proceeding would be unsafe or would force the agent to invent product, architecture, data, billing, auth, compliance, or deployment decisions.

Examples:

- Does the MVP require real authentication now, or can we start without auth?
- Will this store personal or sensitive data?
- Is billing/subscription part of the first release?
- Is this prototype, MVP, or production-bound?

### Clarifying questions

Use sparingly. Prefer assumptions if the answer is not needed for the next artifact.

### Discovery questions

Use inside brainstorming, but batch them as structured hypotheses rather than interrogating the user.

## Default behavior

When information is missing but safe to assume:

1. State the assumption.
2. Proceed to the next artifact.
3. Mark the assumption as revisitable.

Example:

```text
Assumption: this is an MVP, not production-bound. I will avoid auth, billing, and production deployment in the first story unless you say otherwise.
```

## Do not

- Ask 10+ questions before doing useful work.
- Ask the user to choose workflow internals.
- Ask about implementation details before product intent is clear.
- Treat stack preference as a substitute for product clarity.
- Start coding to discover product requirements.

## Good first question patterns

For vague idea:

```text
What is the main problem this product should solve for the first user?
```

For app with stack but unclear product:

```text
What is the first user workflow this app must make possible?
```

For SaaS:

```text
Is this first version a prototype/MVP, or should it be production-ready with auth, permissions, and billing from the start?
```

For sensitive domain:

```text
Will the first version store personal, financial, health, school, child, or other sensitive data?
```

## Output

Every time a question is asked, include:

```markdown
## Why this question matters

## What I will do after your answer
```
