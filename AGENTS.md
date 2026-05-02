# AGENTS.md

Instructions for Codex and other coding agents.

## Mission

You are working inside a disciplined, spec-driven, Orchestrator-routed AI development workflow.

Your job is not to improvise. Your job is to:

1. Understand context.
2. Classify the user's intent and project maturity before choosing a workflow.
3. Run brainstorming when the user only has an idea or rough concept.
4. Work from explicit specs.
5. Decompose work into small stories.
6. Route work to the smallest useful specialist squad.
7. Use tests before implementation.
8. Keep changes small and reviewable.
9. Record decisions and risks.
10. Stop when the work needs human judgment.

## Adaptive intake and brainstorming rule

When the user describes what they want to create, change, fix, understand, refactor, or automate, start with intent routing unless a ready story already exists.

Read:

1. `ai/09-intake/INTENT_ROUTER.md`
2. `ai/09-intake/QUESTION_STRATEGY.md`
3. `ai/09-intake/BRAINSTORMING_PLAYBOOK.md` when project maturity is Idea only or Rough concept
4. `ai/09-intake/INTAKE.template.md`
5. Any relevant stack profile under `ai/09-intake/stack-profiles/`
6. Relevant skills under `ai/skills/`

Produce an Intent Routing Result before implementation.

If the user has only a vague idea, do not jump directly to PRD, architecture, story, or code. Run the brainstorming flow first and produce a Brainstorming Handoff.

Example:

```text
User: I have an idea for an app for schools, but I am not sure what exactly to build.

Routing:
- Project maturity: Idea only
- Pre-brief phase: Brainstorming
- Squad: Orchestrator + Product
- First safe action: create a brainstorming artifact, make safe assumptions explicit, and ask one high-leverage question about the primary problem/user
```

Example with stack:

```text
User: I want to use Claude Code to create a web app with Next.js, React, and Convex.

Routing:
- Tool target: Claude Code
- Project state: New project
- Project maturity: Rough concept unless product/user/MVP are already clear
- Project type: Web app / SaaS candidate
- Stack profile: ai/09-intake/stack-profiles/web-nextjs-react-convex.md
- Workflow mode: Brainstorming first if vague, otherwise New Project
- Squad level: Level 2 or Level 3 depending on auth, billing, user data, and deployment risk
- First safe action: run brainstorming if needed, then fill intake and project brief, draft PRD, architecture, test plan, and first story split
```

Do not start by building the app. Start by adapting the workflow to the user's intent and maturity.

## Required reading order

Before doing any coding task, read:

1. `ai/00-rules/AI_RULES.md`
2. `ai/00-rules/WORKFLOW_MODES.md`
3. `ai/00-rules/QUALITY_GATES.md`
4. `ai/00-rules/DEFINITION_OF_READY.md`
5. `ai/00-rules/CHANGE_SIZE_POLICY.md`
6. `ai/00-rules/GIT_WORKFLOW.md`
7. `ai/agents/ORCHESTRATOR.md`
8. `ai/agents/ROUTING_MATRIX.md`
9. `ai/agents/SQUAD_LEVELS.md`
10. `ai/09-intake/INTENT_ROUTER.md` when the request is not already a ready story
11. `ai/09-intake/BRAINSTORMING_PLAYBOOK.md` when the request is an idea or rough concept
12. `ai/08-memory/PROJECT_MEMORY.md`
13. `ai/08-memory/PROJECT_MAP.md`, if present
14. The relevant story in `ai/04-stories/`
15. The relevant test plan in `ai/05-execution/`, if present
16. `ai/05-execution/EXECUTION_PROTOCOL.md`

## Operating model

Use the smallest workflow mode that fits the request:

- Brainstorming / pre-brief shaping
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
- Use `ai/skills/*` as focused procedures, not as replacements for rules or stories.

## Global operating rules

- Do not implement without a brief, story, bug report, or explicit task.
- Do not implement before checking `ai/00-rules/DEFINITION_OF_READY.md`.
- Do not exceed `ai/00-rules/CHANGE_SIZE_POLICY.md` without splitting or escalating.
- Do not change architecture without updating `ai/03-architecture/DECISION_LOG.md`.
- Do not remove or weaken tests to make the build pass.
- Do not perform opportunistic refactors during feature work.
- Do not touch billing, authentication, permissions, destructive migrations, production deploy, user data, paid APIs, or secrets without explicit human approval.
- Prefer the smallest useful change.
- Always summarize files changed, tests run, and risks remaining.
- Stop when blocked by product decisions.

## Cross-platform command rule

Prefer the Node CLI because it works on Linux, macOS, and Windows:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js story feature "Feature title"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

Use Bash scripts only as compatibility fallback for Linux, macOS, Git Bash, or WSL.

## Standard adaptive workflow for new project requests

1. Classify intent and project maturity with `ai/09-intake/INTENT_ROUTER.md`.
2. If maturity is Idea only or Rough concept, run `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`.
3. Use `ai/09-intake/QUESTION_STRATEGY.md` to ask at most one blocking/high-leverage question at a time.
4. Create a brainstorming artifact from `ai/templates/BRAINSTORMING.template.md` when needed.
5. Select a stack profile when available.
6. Create or update `ai/09-intake/INTAKE.md`.
7. Create `ai/01-discovery/PROJECT_BRIEF.md`.
8. Route Product and Architect as needed.
9. Create `ai/01-discovery/DISCOVERY.md`.
10. Create `ai/02-product/PRD.md`.
11. Create `ai/03-architecture/ARCHITECTURE.md`.
12. Create a story split under `ai/04-stories/`.
13. Execute one story at a time.
14. Review and update memory after each story.

## Standard workflow for existing projects

1. Create or update `ai/08-memory/PROJECT_MAP.md`.
2. Create or update `ai/05-execution/IMPACT_ANALYSIS.md`.
3. Create or update `ai/05-execution/TEST_PLAN.md` when the change is non-trivial.
4. Convert the request into a story under `ai/04-stories/`.
5. Validate story readiness with `node scripts/aiwf.js validate <story-file>` when the CLI is available.
6. Route specialists as needed.
7. Write or update tests first.
8. Implement.
9. Run tests/build/typecheck/lint where available.
10. Review against quality gates.
11. Run `node scripts/aiwf.js review <story-file>` when the CLI is available.
12. Update memory.

## Story creation shortcuts

When the CLI is available, create stories with:

```bash
node scripts/aiwf.js story feature "Feature title"
node scripts/aiwf.js story bugfix "Bug title"
node scripts/aiwf.js story refactor "Refactor title"
node scripts/aiwf.js story migration "Migration title"
node scripts/aiwf.js story generic "Generic story title"
```

Then validate readiness:

```bash
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
```

## Autonomous execution rule

Only use autonomous execution when `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists and contains:

- objective
- allowed files
- forbidden files/areas
- required commands
- completion promise
- max iterations
- max change budget
- stop conditions
- rollback plan

Use `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.template.md` to create the contract.

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

Quality gates/scripts:
- ...

Risks:
- ...

Follow-ups:
- ...
```
