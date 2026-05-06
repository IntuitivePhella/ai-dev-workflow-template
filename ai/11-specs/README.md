# Behavioral Specs

`ai/11-specs/` stores durable behavioral specs for the project.

A behavioral spec is a contract for observable behavior. It should describe what the system must do from an actor, API, workflow, or integration point of view. It should not describe implementation tasks, temporary plans, internal architecture, or release coordination.

## Relationship to other artifacts

- PRDs explain product intent, users, problems, and outcomes.
- Architecture explains system structure, trade-offs, data flow, and technical boundaries.
- Stories execute one small, testable slice of work.
- Behavioral specs define durable observable behavior that should remain true after stories are complete.
- Delta specs describe proposed changes to durable behavior before those changes are accepted.

## When to create or update a spec

Create or update a behavioral spec when the work changes durable product, workflow, API, integration, or agent-facing behavior that future stories must preserve.

Do not require a behavioral spec for every edit. Routine bugfixes, small refactors, documentation-only edits, local coordination artifacts, and one-story changes may remain simple stories when no durable behavior contract needs to be added or changed.

## Recommended structure

Use `ai/templates/SPEC.template.md`.

Specs should be organized by capability or durable workflow. Prefer stable names such as:

```text
ai/11-specs/session-continuity.md
ai/11-specs/publication-governance.md
ai/11-specs/change-packages.md
```

Run `node scripts/aiwf.js validate-spec <spec-or-delta-file>` before relying on a new or changed spec.

## Requirement format

Each requirement should describe one durable behavior and include at least one scenario that makes the behavior testable.

Example:

```markdown
### Requirement: Stories remain the default execution unit

Agents must use a simple story for small, bounded changes unless the work needs a durable change package.

#### Scenario: Small bugfix

- Given a user requests a small bugfix with clear expected behavior
- When the fix can be implemented and reviewed as one story
- Then the agent should not require a change package
```

## Delta specs

Use `ai/templates/SPEC_DELTA.template.md` inside change packages when proposed work changes durable behavior.

Delta specs are proposals, not accepted behavior. Accepted deltas should later be synced into `ai/11-specs/` by an approved lifecycle step.
