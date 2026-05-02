# AGENTS.md

Instructions for Codex and other coding agents.

## Mission

You are working inside a disciplined, spec-driven, Orchestrator-routed AI development workflow.

Your job is not to improvise. Your job is to:

1. Understand context.
2. Work from explicit specs.
3. Decompose work into small stories.
4. Route work to the smallest useful specialist squad.
5. Use tests before implementation.
6. Keep changes small and reviewable.
7. Record decisions and risks.
8. Stop when the work needs human judgment.

## Required reading order

Before doing any coding task, read:

1. `ai/00-rules/AI_RULES.md`
2. `ai/00-rules/WORKFLOW_MODES.md`
3. `ai/00-rules/QUALITY_GATES.md`
4. `ai/agents/ORCHESTRATOR.md`
5. `ai/agents/ROUTING_MATRIX.md`
6. `ai/agents/SQUAD_LEVELS.md`
7. `ai/08-memory/PROJECT_MEMORY.md`
8. `ai/08-memory/PROJECT_MAP.md`, if present
9. The relevant story in `ai/04-stories/`
10. The relevant test plan in `ai/05-execution/`, if present
11. `ai/05-execution/EXECUTION_PROTOCOL.md`

## Operating model

Use the smallest workflow mode that fits the request:

- New project
- Existing project understanding
- New feature in existing project
- Bugfix
- Refactor
- Autonomous phase

Then select the smallest safe squad level:

- Level 0 — Orchestrator only
- Level 1 — Orchestrator + 1 specialist
- Level 2 — Orchestrator + 2-3 specialists
- Level 3 — Full Squad for high-risk or broad work

Do not combine discovery, planning, implementation, and review in one uncontrolled pass.

## Specialist routing rules

- Start with Orchestrator.
- Add specialists only when their expertise reduces risk or ambiguity.
- Use `ai/agents/ROUTING_MATRIX.md` to choose agents.
- Use `ai/agents/CONTEXT_PACK.template.md` to keep specialist work token-efficient.
- Use `ai/agents/HANDOFF.template.md` only when durable handoff is necessary.
- Use `ai/agents/AGENT_OUTPUTS.md` for standardized specialist outputs.

## Global operating rules

- Do not implement without a brief, story, bug report, or explicit task.
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
3. Create or update `ai/05-execution/TEST_PLAN.md` when the change is non-trivial.
4. Convert the request into a story under `ai/04-stories/`.
5. Route specialists as needed.
6. Write or update tests first.
7. Implement.
8. Run tests/build/typecheck/lint where available.
9. Review against quality gates.
10. Update memory.

## Standard workflow for new projects

1. Create `ai/01-discovery/PROJECT_BRIEF.md`.
2. Route Product and Architect as needed.
3. Create `ai/01-discovery/DISCOVERY.md`.
4. Create `ai/02-product/PRD.md`.
5. Create `ai/03-architecture/ARCHITECTURE.md`.
6. Create stories under `ai/04-stories/`.
7. Execute one story at a time.
8. Review and update memory after each story.

## Autonomous execution rule

Only use autonomous execution when `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists and contains:

- objective
- allowed files
- forbidden files/areas
- required commands
- completion promise
- max iterations
- stop conditions

Never use autonomous execution for sensitive areas without human approval.

## Completion format

At the end of every task, respond with:

```text
Summary:
- ...

Squad used:
- Level: ...
- Agents: ...

Files changed:
- ...

Acceptance criteria:
- [x] ...
- [ ] ...

Tests run:
- ...

Risks:
- ...

Follow-ups:
- ...
```
