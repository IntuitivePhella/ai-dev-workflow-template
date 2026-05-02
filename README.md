<div align="center">

# 🚀 AI-PhellOS

### An operating system for disciplined, intent-adaptive AI software development with Codex, Claude Code, and markdown-aware coding agents.

<p align="center">
  <img src="https://img.shields.io/badge/AI--PhellOS-Intent--Adaptive-blue" alt="AI-PhellOS">
  <img src="https://img.shields.io/badge/Agents-8_specialists-purple" alt="8 agents">
  <img src="https://img.shields.io/badge/Workflow-Spec--Driven-blueviolet" alt="Spec driven">
  <img src="https://img.shields.io/badge/Quality-Test--Aware-success" alt="Test aware">
  <img src="https://img.shields.io/badge/CLI-Node.js-339933" alt="Node.js CLI">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
</p>

<p align="center">
  <a href="README.md">English</a> •
  <a href="README.pt-BR.md">Português</a> •
  <a href="README.es.md">Español</a> •
  <a href="README.zh-CN.md">中文</a>
</p>

</div>

---

## What AI-PhellOS Is

AI-PhellOS is a portable, markdown-first workflow layer for AI-assisted software development.

It helps coding agents move from raw intent to production-ready implementation through:

```text
Brainstorming → Intent Routing → Specs → Architecture → Stories → TDD → Review → Release
```

The core rule is simple:

```text
Never ask an AI agent to build the whole app.
Ask it to execute one safe, testable, reviewable story at a time.
```

AI-PhellOS does not replace Codex, Claude Code, or optional execution adapters such as Ruflo. It gives them a disciplined operating system: routing, artifacts, readiness, quality gates, scope control, stop conditions, review, release, and durable memory.

---

## Core UX Rule

The user should describe what they want to create, understand, change, fix, refactor, or automate.

The user should not need to say which AI coding tool to use.

```text
Claude Code session → follow CLAUDE.md, .claude/settings.json, and .claude/agents/*
Codex session       → follow AGENTS.md, .codex/config.toml, ai/agents/*, context packs, and skills
Generic agent       → follow AGENTS.md and markdown-first workflow files
Ruflo, if installed → act only as an optional Claude Code execution adapter for approved bounded phases
```

Good prompts:

```text
I want to create a web app with Next.js, React, and Convex.
```

```text
I have an idea for an app for schools, but I am not sure what to build.
```

```text
Analyze this existing repo and map it before suggesting changes.
```

Avoid prompts like:

```text
Use Claude Code to build the whole app.
```

```text
Ask Ruflo to build the app overnight.
```

---

## Quick Start

### Install into an existing repository

```bash
npx ai-phellos install existing .
```

Before npm publishing, from a cloned copy of this repository:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
```

### Start a new project

```bash
npx ai-phellos install new ./my-new-app
```

Before npm publishing:

```bash
node scripts/aiwf.js install new /path/to/new/project
```

### Generate a starter prompt

```bash
aiwf start "I want to create a web app with Next.js, React, and Convex"
```

Then paste the generated prompt into Codex, Claude Code, or another compatible coding agent.

---

## CLI Commands

```bash
aiwf help
aiwf doctor
aiwf install existing .
aiwf install new ./my-new-app
aiwf init existing
aiwf init new
```

Prompt generators:

```bash
aiwf start "I want to create a SaaS for schools"
aiwf map "authentication and billing flow"
aiwf brainstorm "an app for schools"
aiwf plan "Add team invitation flow"
```

Story and gate commands:

```bash
aiwf story feature "Add team invitation flow"
aiwf story bugfix "Fix failed login redirect"
aiwf story refactor "Split billing service"
aiwf validate ai/04-stories/<story-file>.md
aiwf gates
aiwf sensitive HEAD~1 HEAD
aiwf review ai/04-stories/<story-file>.md
```

Node fallback:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js start "Analyze this repo and map it"
```

---

## Prompt Generator Commands

### `aiwf start [request]`

Produces a general AI-PhellOS startup prompt. Use it when you want the agent to classify intent, infer environment, select workflow mode, choose the smallest safe squad, identify artifacts, and decide the first safe action.

### `aiwf map [repo-focus]`

Produces an Existing Project Understanding prompt. Use it before changing an unfamiliar repository. The expected output is a repository map and memory update, not production code.

### `aiwf brainstorm <idea>`

Produces a pre-brief brainstorming prompt. Use it when the product idea is vague or immature. The agent should ask one high-leverage question at a time and produce a Brainstorming Handoff before PRD, architecture, or code.

### `aiwf plan <feature-or-change>`

Produces a planning prompt for a feature, bugfix, refactor, migration, or other change. The expected output includes routing, impact analysis, acceptance criteria, scope, tests, rollback, stop conditions, and recommended story title.

---

## Workflow Modes

| Mode | Purpose | First Safe Action |
| --- | --- | --- |
| Brainstorming / Pre-brief shaping | Shape vague ideas into problem, user, MVP boundary, risks, and handoff | Ask one high-leverage question |
| New Project | Move from brief to discovery, PRD, architecture, stories, and implementation | Create intake and project brief |
| Existing Project Understanding | Map a repository before coding | Create `PROJECT_MAP.md` |
| New Feature in Existing Project | Plan and execute a feature safely | Create impact analysis |
| Bugfix | Reproduce, test, minimally fix, and prevent regression | Reproduce the bug |
| Refactor | Improve structure without behavior change | Define preserved behavior |
| Autonomous Phase | Run bounded automation only with a contract | Create autonomous phase contract |

---

## Agent Squad Model

| Agent | Responsibility | Use When |
| --- | --- | --- |
| Orchestrator | Routes work, controls scope, budget, gates, and handoffs | Always start here |
| Product | Problem, user, scope, non-goals, acceptance criteria | Ideas, new products, ambiguous features |
| Architect | Architecture, data model, APIs, dependencies, trade-offs | New projects, risky changes, integrations |
| Implementer | One story, tests first, smallest useful change | Story is ready |
| QA | Acceptance criteria, test plan, edge cases, regressions | Before or after implementation |
| Security | Auth, permissions, data exposure, secrets, abuse paths | Sensitive areas |
| Reviewer | Senior engineering review, maintainability, simplicity | Non-trivial diffs |
| Release | Readiness, rollback, known issues, deployment risk | Shipping or deployment |

Default rule:

```text
Use the fewest agents necessary to safely complete the task.
```

---

## Documentation Map

Entry points:

- `AGENTS.md` — Codex and generic agent instructions.
- `CLAUDE.md` — Claude Code-specific instructions.
- `.codex/config.toml` — Codex safety profile.
- `.claude/settings.json` — Claude Code command guardrails.

Core rules:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/00-rules/DEFINITION_OF_READY.md`
- `ai/00-rules/CHANGE_SIZE_POLICY.md`
- `ai/00-rules/GIT_WORKFLOW.md`

Intake and planning:

- `ai/09-intake/INTENT_ROUTER.md`
- `ai/09-intake/QUESTION_STRATEGY.md`
- `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`
- `ai/09-intake/INTAKE.template.md`
- `ai/09-intake/stack-profiles/`

Agents and execution:

- `ai/agents/ORCHESTRATOR.md`
- `ai/agents/ROUTING_MATRIX.md`
- `ai/agents/SQUAD_LEVELS.md`
- `ai/05-execution/EXECUTION_PROTOCOL.md`
- `ai/06-reviews/REVIEW_CHECKLIST.md`

Optional integrations:

- `ai/10-integrations/ruflo/` — Optional Ruflo execution-adapter policy, workflow mapping, prompts, templates, and reports.

---

## Optional Ruflo Integration

Ruflo support is included as an optional execution-adapter integration for teams that use Claude Code and want bounded multi-agent execution, swarms, test generation, browser checks, diff review, documentation support, security review, or controlled autonomous phases.

AI-PhellOS does not vendor, install, pin, update, or manage Ruflo.

Recommended usage:

```text
AI-PhellOS prepares the work.
Ruflo executes the approved bounded phase, if installed and appropriate.
AI-PhellOS verifies, reviews, releases, and updates memory.
```

Do not use Ruflo as a replacement for AI-PhellOS routing, specs, Definition of Ready, quality gates, sensitive-area approval, review, or release.

---

## Development

```bash
npm test
node scripts/aiwf.js doctor
npm run pack:dry-run
```

The CLI intentionally uses Node.js built-ins and keeps dependencies minimal.

---

## License

MIT

---

<div align="center">

Built for developers who want AI to work like a disciplined engineering team.

</div>
