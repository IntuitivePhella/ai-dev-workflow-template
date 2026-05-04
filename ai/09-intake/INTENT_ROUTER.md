# Intent Router

Use this router when the user describes what they want to create, change, fix, understand, refactor, or automate.

The goal is to translate natural language intent into the smallest safe workflow configuration.

## Core UX rule

The user should not need to say which AI coding tool is being used.

The execution environment is inferred from where the framework is running:

```text
Claude Code session → follow CLAUDE.md, .claude/settings.json, and .claude/agents/*
Codex session       → follow AGENTS.md, .codex/config.toml, ai/agents/*, context packs, and skills
Generic agent       → follow AGENTS.md and markdown-first workflow files
```

The user should describe the product, project, feature, bug, refactor, or idea. The framework chooses the correct route for the current tool automatically.

## Router output

Every intake should produce:

```markdown
# Intent Routing Result

## User intent

## Execution environment

Claude Code / Codex / Generic / Unknown

## Project state

New project / Existing project / Unknown

## Project maturity

Idea only / Rough concept / Defined product / Ready story / Existing codebase

## Project type

Web app / SaaS / API / Mobile / Desktop / CLI / Library / Automation / AI agent / Other

## Stack profile

Known stack or proposed stack.

## Sensitive domain

Yes / No / Unknown

## Privacy & Safety Review required

Yes / No

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

## Execution environment selection

### Claude Code environment

Use when the framework is running inside Claude Code.

Required behavior:

- Read `CLAUDE.md`
- Use `.claude/agents/*` only when specialist isolation helps and the Orchestrator selects them
- Use `.claude/settings.json` guardrails
- Keep `ai/agents/*` as the tool-agnostic source of truth

### Codex environment

Use when the framework is running inside Codex.

Required behavior:

- Read `AGENTS.md`
- Use `ai/agents/*`, skills, and context packs
- Use `.codex/config.toml` safety profile
- Do not expect Claude-specific subagents

### Generic environment

Use when the tool is not identifiable.

Required behavior:

- Default to `AGENTS.md`
- Keep all instructions markdown-first
- Avoid tool-specific assumptions

## Project maturity classification

### Idea only

Signals:

- "I have an idea"
- "not sure exactly what to build"
- "help me shape this"
- "let's brainstorm"
- "I want to create something for..."
- "I need an app/SaaS but don't know the details"

Use:

- Pre-brief phase: Brainstorming
- Read: `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`
- Read: `ai/09-intake/QUESTION_STRATEGY.md`
- Create: brainstorming artifact from `ai/templates/BRAINSTORMING.template.md`
- Minimum squad: Orchestrator + Product
- Add Architect only if stack/feasibility matters
- Do not use Implementer
- First safe action: guide brainstorming and produce a Brainstorming Handoff

### Rough concept

Signals:

- target domain exists but user/problem/MVP are not clear;
- stack may be known but product scope is vague;
- user has examples but no acceptance criteria.

Use:

- Brainstorming, then New Project
- Required artifacts: Brainstorming, Intake, Project Brief, Discovery
- First safe action: progressive narrowing, then brief

## Sensitive domain detection

During intake, classify the request as `Sensitive domain: yes` when it mentions or implies:

- healthcare, elder care, nursing homes, care facilities, patients, caregivers, elderly people, children, vulnerable users;
- cameras, surveillance, monitoring, video, audio, image analysis, snapshots, biometrics, face recognition;
- physical safety, emergency alerts, fall detection, incident response, restricted areas, risk events;
- personal data, sensitive data, consent, retention, audit logs, compliance, legal obligations.

If `Sensitive domain: yes`:

- Use at least Level 3 for new products or broad planning.
- Include Security consultatively even if no real backend exists yet.
- Add Privacy & Safety Review as a required artifact.
- Treat mock-only work as allowed, but explicitly prohibit real sensitive data, real camera feeds, production notifications, or real-world escalation until human approval.
- Add stop conditions for auth, permissions, retention, audit logs, real image/video, real alerts, and external integrations.

### Defined product

Signals:

- user, problem, MVP and stack are mostly known;
- PRD/architecture can be drafted without inventing core scope.

Use:

- Workflow mode: New Project
- Required artifacts: Intake, Project Brief, PRD, Architecture, Test Plan, Story split

### Ready story

Signals:

- acceptance criteria, scope, tests, commands, and stop conditions are clear.

Use:

- Workflow mode matching the story type
- First safe action: Definition of Ready validation

### Existing codebase

Signals:

- user references a repository or existing project.

Use:

- Workflow mode: Existing Project Understanding first unless a current project map exists

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

- If idea is vague: Brainstorming first, then New Project
- Workflow mode: New Project after brainstorming/brief clarity exists
- Minimum squad: Level 2 for simple MVP, Level 3 for production SaaS or sensitive domain
- Required artifacts: Brainstorming when vague, Project brief, PRD, architecture, first epic/stories
- First safe action: create/fill `ai/09-intake/INTAKE.md` and, when needed, a brainstorming artifact before `PROJECT_BRIEF.md`

Do not write production application code before brainstorming/brief, PRD, architecture, and first story exist.

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

## Stack profile selection

If stack is explicitly given, select the closest stack profile under `ai/09-intake/stack-profiles/`.

If stack is not given:

- Ask one blocking question only if stack choice materially affects the first artifact.
- Otherwise create product and architecture artifacts with stack marked as TBD.

## First safe action examples

### User says: "I have an idea for an app for schools, but I'm not sure what exactly to build"

Routing:

- Project maturity: Idea only
- Pre-brief phase: Brainstorming
- Execution environment: inferred from current tool
- Workflow mode: not implementation-ready
- Squad level: Level 1 or Level 2
- Agents: Orchestrator, Product; Architect optional
- First safe action: create a brainstorming artifact and ask one high-leverage question about the primary problem/user

### User says: "I want to create a web app with Next.js, React, and Convex"

Routing:

- Execution environment: inferred from current tool
- Project state: New project
- Project maturity: Rough concept unless product/user/MVP are already clear
- Project type: Web app / SaaS candidate
- Stack profile: `web-nextjs-react-convex.md`
- Workflow mode: Brainstorming first if vague, otherwise New Project
- Squad level: Level 3 if auth/billing/user data are likely, otherwise Level 2
- Agents: Orchestrator, Product, Architect, QA; Security if auth/user data exists
- First safe action: create intake, run brainstorming if product is vague, then project brief, PRD outline, architecture outline, first story split

### User says: "Analyze this repo and add payments"

Routing:

- Execution environment: inferred from current tool
- Project state: Existing project
- Project type: unknown until mapped
- Workflow mode: Existing Project Understanding first, then New Feature
- Squad level: Level 3 because billing/payments are sensitive
- First safe action: map repo and stop before changing billing code
