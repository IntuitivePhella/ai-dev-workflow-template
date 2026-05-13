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

P0 quality behavior keeps bugfixes diagnosis-driven, development domain-aware, structural improvements routed through architecture deepening, and story splits classified as AFK or HITL when human judgment may be needed.

P1 adds disposable prototypes for uncertainty, intake triage for loose requests, ADRs for durable trade-offs, and handoffs that reference durable artifacts instead of duplicating them.

AI-PhellOS does not replace Codex, Claude Code, or optional execution adapters such as Ruflo. It gives them a disciplined operating system: routing, artifacts, readiness, quality gates, scope control, stop conditions, review, release, and durable memory.

Behavioral specs live under `ai/11-specs/` as durable contracts for observable behavior. They are distinct from PRDs, architecture, and stories: PRDs explain intent, architecture explains structure, stories execute small slices, and specs define behavior that future work must preserve.

Simple stories remain the default execution unit. Use optional change packages under `ai/04-changes/` only when work is broad, multi-story, changes durable behavior contracts, or needs proposal/tasks/spec deltas before implementation.

Projects can optionally copy `ai/config.template.yaml` to `ai/config.yaml` to override spec and change package paths, document default commands, and add artifact-specific rules. When `ai/config.yaml` is absent, AI-PhellOS uses its markdown-first defaults.

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

AI-PhellOS has not been published to npm yet. Until the package is published, install from GitHub or from a local clone.

### Current install from GitHub

Install into an existing repository:

```bash
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf install existing .
```

Start a new project:

```bash
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf install new ./my-new-app
```

### Current install from a local clone

From a cloned copy of this repository:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

### Future npm install, after publishing

```bash
npx ai-phellos install existing .
npx ai-phellos install new ./my-new-app
```

### Generate a starter prompt

After installation or local linking:

```bash
aiwf start "I want to create a web app with Next.js, React, and Convex"
```

Without local linking:

```bash
node scripts/aiwf.js start "I want to create a web app with Next.js, React, and Convex"
```

Then paste the generated prompt into Codex, Claude Code, or another compatible coding agent.

---

## Updating AI-PhellOS in an Existing Project

**Do not use `install existing` to upgrade.** That command is for first-time installation only.

To upgrade an existing AI-PhellOS project to a newer framework version:

```bash
# Preview changes first (always do this)
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --dry-run

# Apply the upgrade
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --apply

# Verify the upgrade
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf doctor
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf gates
```

Or from a local clone of the updated framework:

```bash
node /path/to/AI-PhellOS/scripts/aiwf.js upgrade /path/to/project --dry-run
node /path/to/AI-PhellOS/scripts/aiwf.js upgrade /path/to/project --apply
```

The upgrade command:

- **Never overwrites product artifacts** (PRD, stories, memory, discovery, architecture)
- **Never overwrites package.json**
- **Creates `.incoming` files** when framework files conflict with customizations
- **Generates a migration report** at `ai/08-memory/FRAMEWORK_MIGRATION.md`
- **Is idempotent** — running it twice produces the same result

See `ai/00-rules/FRAMEWORK_UPGRADE_POLICY.md` for detailed upgrade policy and file classification rules.

---

## CLI Commands

```bash
aiwf help
aiwf doctor
aiwf install existing .
aiwf install new ./my-new-app
aiwf init existing
aiwf init new
aiwf upgrade . --dry-run
aiwf upgrade . --apply
aiwf audit ai/04-stories/<story-file>.md
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
aiwf change "Add dark mode"
aiwf status ai/04-changes/<change-package>
aiwf instructions proposal ai/04-changes/<change-package>
aiwf verify ai/04-changes/<change-package>
aiwf sync ai/04-changes/<change-package>
aiwf archive ai/04-changes/<change-package>
aiwf validate-spec ai/11-specs/<spec-file>.md
aiwf validate-change ai/04-changes/<change-package>
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

### `aiwf change <title>`

Creates an optional change package under `ai/04-changes/<date>-<slug>/` by default, or under `paths.changesPath` when `ai/config.yaml` is present. The package includes `proposal.md`, `tasks.md`, `design.md`, and a starter spec delta under `specs/`. Use this for broad, multi-story, or behavior-contracting work; keep simple one-story work on `aiwf story`.

### `aiwf status <change-path> [--json]`

Reports which change package artifacts are complete or missing for `proposal`, `specs`, `design`, and `tasks`. Use `--json` when an agent or script needs stable parseable output and the next missing artifact.

### `aiwf instructions <artifact> <change-path>`

Prints agent-readable guidance for creating or updating a change package artifact. Supported artifacts are `proposal`, `specs`, `design`, and `tasks`; `spec`, `delta`, and `deltas` are accepted aliases for `specs`.

### `aiwf verify <change-path>`

Prints a verification report grouped by Completeness, Correctness, and Coherence. Incomplete tasks are critical failures; missing optional design notes or spec deltas are reported as warnings when they may be intentionally skipped. The report checks artifacts and structural validity, not full code-to-requirement proof.

### `aiwf sync <change-path>`

Applies validated `ADDED` requirements from change package delta specs into the target behavioral specs under `ai/11-specs/` by default, or under `paths.specsPath` when `ai/config.yaml` is present. The first version is intentionally conservative: unsupported delta operations such as `MODIFIED`, `REMOVED`, and `RENAMED` fail with clear messages.

### `aiwf archive <change-path>`

Moves a validated, completed change package to `ai/04-changes/archive/YYYY-MM-DD-<change-id>/`. Archive refuses unchecked tasks by default and preserves the full change package directory for audit history.

### `aiwf validate-spec <path>`

Validates the structural format of a behavioral spec or spec delta. Behavioral specs require purpose, requirements, requirement headings, scenarios, and Given/When/Then steps. Delta specs require target spec, summary, and at least one added, modified, removed, or renamed requirement section.

### `aiwf validate-change <path>`

Validates a change package directory. It checks for `proposal.md`, `tasks.md`, and validates delta specs under `specs/` when that folder exists.

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
- `ai/00-rules/CONTINUOUS_IMPROVEMENT.md`

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
- `ai/templates/PRIVACY_AND_SAFETY_REVIEW.template.md`

Behavior specs and change packages:

- `ai/config.template.yaml` - Optional project config template for paths, commands, and artifact rules.
- `ai/11-specs/README.md` - Durable behavioral specs.
- `ai/04-changes/README.md` - Optional change package workflow.
- `ai/templates/ADR.template.md`
- `ai/templates/PROTOTYPE_NOTES.template.md`
- `ai/templates/SPEC.template.md`
- `ai/templates/SPEC_DELTA.template.md`
- `ai/templates/CHANGE_PROPOSAL.template.md`
- `ai/templates/CHANGE_TASKS.template.md`

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
