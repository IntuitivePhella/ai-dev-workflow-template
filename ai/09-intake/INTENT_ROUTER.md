# Intent Router

Use this router when the user describes what they want to create, change, fix, understand, refactor, or automate.

The goal is to translate natural language intent into the smallest safe workflow configuration.

## Router output

Every intake should produce:

```markdown
# Intent Routing Result

## User intent

## Tool target

Codex / Claude Code / Generic

## Project state

New project / Existing project / Unknown

## Project type

Web app / SaaS / API / Mobile / Desktop / CLI / Library / Automation / AI agent / Other

## Stack profile

Known stack or proposed stack.

## Workflow mode

From `ai/00-rules/WORKFLOW_MODES.md`.

## Squad level

From `ai/agents/SQUAD_LEVELS.md`.

## Agents selected

## Agents skipped and why

## Required artifacts

## First safe action

## Blocking questions

Ask at most one blocking question. If reasonable assumptions are safe, proceed with assumptions.

## Assumptions

## Stop conditions
```

## Intent classification

### New project creation

Signals:

- "create an app"
- "build a web app"
- "start a SaaS"
- "new project"
- "MVP"
- "from scratch"

Use:

- Workflow mode: New Project
- Minimum squad: Level 2 for simple MVP, Level 3 for production SaaS or sensitive domain
- Required artifacts: Project brief, PRD, architecture, first epic/stories
- First safe action: create/fill `ai/09-intake/INTAKE.md` and `ai/01-discovery/PROJECT_BRIEF.md`

Do not write production application code before project brief, PRD, architecture, and first story exist.

### Existing project understanding

Signals:

- "analyze this repo"
- "understand the project"
- "map the codebase"
- "what is going on here"

Use:

- Workflow mode: Existing Project Understanding
- Minimum squad: Level 1 or Level 2
- Required artifacts: `PROJECT_MAP.md`, `PROJECT_MEMORY.md`
- First safe action: repo map only, no production code changes

### New feature in existing project

Signals:

- "add feature"
- "implement flow"
- "create dashboard"
- "add auth"
- "integrate payment"

Use:

- Workflow mode: New Feature in Existing Project
- Minimum squad: Level 2
- Escalate to Level 3 for auth, billing, permissions, user data, migrations, infra, or broad changes
- Required artifacts: feature brief or story, impact analysis, test plan

### Bugfix

Signals:

- "fix bug"
- "not working"
- "error"
- "failing test"
- "regression"

Use:

- Workflow mode: Bugfix
- Minimum squad: Level 1 or Level 2
- Required artifacts: reproduction, expected behavior, failing test or documented reproduction path

### Refactor

Signals:

- "clean up"
- "improve structure"
- "refactor"
- "simplify"
- "split module"

Use:

- Workflow mode: Refactor
- Minimum squad: Level 2
- Required artifacts: behavior to preserve, allowed files, safety tests

### Autonomous phase

Signals:

- "run through the phases"
- "work autonomously"
- "continue until done"
- "overnight"

Use:

- Workflow mode: Autonomous Phase only when an autonomous phase contract exists
- Required artifact: `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md`
- Never use for sensitive areas without human approval

## Tool target selection

### Claude Code

Use when the user says Claude Code, SuperClaude, subagents, slash commands, or wants local repo execution.

Required additions:

- Read `CLAUDE.md`
- Use `.claude/agents/*` when specialist isolation helps
- Use `.claude/settings.json` guardrails
- Prefer subagents only when the Orchestrator selects them

### Codex

Use when the user says Codex, OpenAI Codex, AGENTS.md, or wants a generic coding agent workflow.

Required additions:

- Read `AGENTS.md`
- Use `ai/agents/*` and context packs instead of Claude-specific subagents
- Use `.codex/config.toml` safety profile

### Generic

Use when the tool is not specified.

Required additions:

- Default to `AGENTS.md`
- Keep all instructions markdown-first
- Avoid tool-specific assumptions

## Stack profile selection

If stack is explicitly given, select the closest stack profile under `ai/09-intake/stack-profiles/`.

If stack is not given:

- Ask one blocking question only if stack choice materially affects the first artifact.
- Otherwise create product and architecture artifacts with stack marked as TBD.

## First safe action examples

### User says: "I want to use Claude Code to create a web app with Next.js, React, Convex"

Routing:

- Tool target: Claude Code
- Project state: New project
- Project type: Web app / SaaS candidate
- Stack profile: `web-nextjs-react-convex.md`
- Workflow mode: New Project
- Squad level: Level 3 if auth/billing/user data are likely, otherwise Level 2
- Agents: Orchestrator, Product, Architect, QA; Security if auth/user data exists
- First safe action: create intake, project brief, PRD outline, architecture outline, first story split

### User says: "Analyze this repo and add payments"

Routing:

- Tool target: inferred from environment
- Project state: Existing project
- Project type: unknown until mapped
- Workflow mode: Existing Project Understanding first, then New Feature
- Squad level: Level 3 because billing/payments are sensitive
- First safe action: map repo and stop before changing billing code
