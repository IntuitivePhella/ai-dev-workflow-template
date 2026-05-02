# AGENTS.md

Instructions for Codex and other coding agents.

## Mission

You are working inside a disciplined, spec-driven AI development workflow.

Your job is not to improvise. Your job is to:

1. Understand context.
2. Work from explicit specs.
3. Decompose work into small stories.
4. Use tests before implementation.
5. Keep changes small and reviewable.
6. Record decisions and risks.

## Required reading order

Before doing any coding task, read:

1. `ai/00-rules/AI_RULES.md`
2. `ai/08-memory/PROJECT_MEMORY.md`
3. `ai/08-memory/PROJECT_MAP.md`, if present
4. The relevant story in `ai/04-stories/`
5. The relevant test plan in `ai/05-execution/`

## Global operating rules

- Do not implement without a brief, story, or explicit bug report.
- Do not change architecture without updating `ai/03-architecture/DECISION_LOG.md`.
- Do not remove or weaken tests to make the build pass.
- Do not perform opportunistic refactors during feature work.
- Do not touch billing, authentication, permissions, destructive migrations, production deploy, or secrets without explicit human approval.
- Prefer the smallest useful change.
- Always summarize files changed, tests run, and risks remaining.
- Stop when blocked by product decisions.

## Standard workflow for existing projects

1. Create or update `ai/08-memory/PROJECT_MAP.md`.
2. Create or update `ai/05-execution/IMPACT_ANALYSIS.md`.
3. Convert the request into a story under `ai/04-stories/`.
4. Write or update tests first.
5. Implement.
6. Run tests/build.
7. Review.
8. Update memory.

## Standard workflow for new projects

1. Create `ai/01-discovery/PROJECT_BRIEF.md`.
2. Create `ai/01-discovery/DISCOVERY.md`.
3. Create `ai/02-product/PRD.md`.
4. Create `ai/03-architecture/ARCHITECTURE.md`.
5. Create stories under `ai/04-stories/`.
6. Execute one story at a time.

## Completion format

At the end of every task, respond with:

```text
Summary:
- ...

Files changed:
- ...

Tests run:
- ...

Risks:
- ...

Follow-ups:
- ...
```
