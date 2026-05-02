# AI Development Workflow Template

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [中文](README.zh-CN.md)

A repo-template and installable CLI for disciplined AI-assisted software development with **Codex** or **Claude Code**.

## Core UX rule

The user should **not** need to say which AI coding tool to use.

If the framework is installed and the user opens the project in Claude Code or Codex, the execution environment is already known:

```text
Claude Code session → follow CLAUDE.md, .claude/settings.json, and .claude/agents/*
Codex session       → follow AGENTS.md, .codex/config.toml, ai/agents/*, context packs, and skills
Generic agent       → follow AGENTS.md and markdown-first workflow files
```

The user's prompt should describe **what they want to create, understand, change, fix, refactor, or automate**.

Good prompts:

```text
I want to create a web app with Next.js, React, and Convex.
I have an idea for an app for schools, but I am not sure exactly what to build.
Analyze this existing repo and map it before suggesting changes.
Add a team invitation flow to this project.
Fix the webhook retry duplication bug.
```

Avoid prompts that repeat the execution tool:

```text
Use Claude Code to create...
Use Codex to build...
```

The framework should infer the environment and route automatically.

## What this workflow is

```text
BMAD-first, Superpowers-enforced, SuperClaude-assisted, GStack-reviewed, GSD/RalphLoop-bounded, Orchestrator-routed, Intent-adaptive.
```

Or, more directly:

```text
Brainstormed. Spec-driven. Test-enforced. Specialist-routed. Review-gated. Automation-bounded. Adapted to user intent and stack.
```

Translated into tool-agnostic practice:

```text
1. Understand the project or idea
2. Infer the execution environment from the current tool
3. Classify the user's intent, project maturity, and desired stack
4. Run guided brainstorming when the idea is vague
5. Create or update specs
6. Decompose into small stories
7. Validate readiness before implementation
8. Route work to the smallest useful specialist squad
9. Execute with tests first
10. Review with product, engineering, QA, security, and release lenses
11. Release with rollback and memory updates
```

## Adaptive user experience

The framework starts from user intent instead of assuming one fixed path.

If the user only has an idea, the flow is:

```text
Raw idea
→ Intent Router
→ Project maturity classification
→ Brainstorming Playbook
→ One high-leverage question at a time
→ Brainstorming Handoff
→ Intake
→ Project Brief
→ Discovery
→ PRD
→ Architecture
→ Story split
→ First ready story
```

If the user already has a stack and rough product direction, the flow is:

```text
User natural-language request
→ Intent Router
→ Execution environment inferred from current tool
→ Stack Profile
→ Brainstorming if product is vague
→ Required artifacts
→ Smallest safe squad
→ First safe story
→ TDD implementation
→ Review and memory update
```

Example:

```text
I want to create a web app with Next.js, React, and Convex.
```

Expected routing result:

```text
Execution environment: inferred from current tool
Project state: New project
Project maturity: Rough concept unless product/user/MVP are already clear
Project type: Web app / SaaS candidate
Stack profile: Next.js + React + Convex
Workflow mode: Brainstorming first if vague, otherwise New Project
Squad level: Level 2 by default, Level 3 if auth, billing, permissions, user data, migrations, or deployment are involved
First safe action: brainstorm if needed, then create intake, project brief, PRD, architecture, test plan, and first story split before production app code
```

Vague idea example:

```text
I have an idea for an app for schools, but I am not sure what exactly to build.
```

Expected routing result:

```text
Project maturity: Idea only
Pre-brief phase: Brainstorming
Squad: Orchestrator + Product
First safe action: create a brainstorming artifact and ask one high-leverage question about the primary problem/user
No production code yet
```

## Install into any repository

After publishing to npm, use:

```bash
npx ai-dev-workflow-template install existing .
```

For a new project directory:

```bash
npx ai-dev-workflow-template install new ./my-new-app
```

Before npm publishing, from a cloned copy of this repo:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

The install command copies the workflow assets into the target repo without overwriting existing files, then initializes either the new-project or existing-project workflow.

## Cross-platform CLI

The recommended command layer is Node.js:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js init new
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

After local linking, you can use the short command:

```bash
npm link
aiwf help
aiwf doctor
aiwf story feature "Add team invitation flow"
```

See `docs/CROSS_PLATFORM_INSTALL.md` for Linux, macOS, Windows PowerShell, Windows CMD, Git Bash, and WSL usage.

See `docs/PUBLISHING.md` for npm publishing instructions.

## Core files

```text
AGENTS.md                                            # Codex and generic agent instructions
CLAUDE.md                                            # Claude Code-specific instructions
.codex/config.toml                                   # Codex safety profile
.claude/settings.json                                # Claude Code command allow/deny list
.claude/agents/*.md                                  # Claude Code native subagent adapters
package.json                                         # Node CLI package metadata

ai/00-rules/AI_RULES.md                              # Non-negotiable rules and stop conditions
ai/00-rules/WORKFLOW_MODES.md                        # Which workflow to use for each type of work
ai/00-rules/QUALITY_GATES.md                         # Required gates before advancing phases
ai/00-rules/DEFINITION_OF_READY.md                   # Readiness requirements before implementation
ai/00-rules/CHANGE_SIZE_POLICY.md                    # When to split or escalate work
ai/00-rules/GIT_WORKFLOW.md                          # Branch, commit, PR, merge, and rollback rules

ai/09-intake/INTENT_ROUTER.md                        # Natural-language intent to workflow routing
ai/09-intake/QUESTION_STRATEGY.md                    # Progressive questioning rules
ai/09-intake/BRAINSTORMING_PLAYBOOK.md               # BMAD-style guided idea shaping
ai/09-intake/INTAKE.template.md                      # Adaptive intake artifact
ai/09-intake/stack-profiles/*.md                     # Stack-specific workflow profiles
ai/skills/*.md                                       # Reusable workflow skills

ai/agents/ORCHESTRATOR.md                            # Orchestrator routing and decision rules
ai/agents/ROUTING_MATRIX.md                          # Which specialists to call and when
ai/agents/SQUAD_LEVELS.md                            # Token-aware squad sizes
ai/agents/HANDOFF.template.md                        # Agent-to-agent handoff contract
ai/agents/CONTEXT_PACK.template.md                   # Minimal context bundle for specialist work
ai/agents/AGENT_OUTPUTS.md                           # Standard specialist output formats

ai/templates/BRAINSTORMING.template.md               # Guided brainstorming artifact template
ai/templates/STORY.template.md                       # Generic story template
ai/templates/FEATURE.template.md                     # Feature story template
ai/templates/BUGFIX.template.md                      # Bugfix story template
ai/templates/REFACTOR.template.md                    # Refactor story template
ai/templates/MIGRATION.template.md                   # Migration story template
```

## Agent squad model

Available specialists:

```text
Orchestrator  # routes work, controls scope, budget, gates, and handoffs
Product       # problem, user, scope, non-goals, acceptance criteria
Architect     # architecture, data model, APIs, dependencies, trade-offs
Implementer   # one story, tests first, smallest useful change
QA            # acceptance criteria, test plan, edge cases, regressions
Security      # auth, permissions, data exposure, secrets, abuse paths
Reviewer      # senior engineering review, maintainability, simplicity
Release       # readiness, rollback, known issues, deployment risk
```

Default rule:

```text
Use the fewest agents necessary to safely complete the task.
```

During brainstorming, default to Orchestrator + Product. Add Architect only when technical feasibility or stack choice matters. Do not call Implementer during brainstorming.

## Workflow modes

Use the smallest mode that fits the job:

0. **Brainstorming / Pre-brief shaping** — vague idea to problem, user, MVP boundary, risks, and handoff.
1. **New Project** — idea to brief, discovery, PRD, architecture, stories, implementation.
2. **Existing Project Understanding** — map a repository before coding.
3. **New Feature in Existing Project** — feature brief, impact analysis, test plan, story, execution, review.
4. **Bugfix** — reproduction, failing test, minimal fix, regression test.
5. **Refactor** — behavior-preserving structural improvement with safety tests.
6. **Autonomous Phase** — bounded automation only with an explicit contract.

## Quick starts

### Vague idea

```text
I have an idea for an app, but I am not sure exactly what to build.
Use the Brainstorming Playbook first.
Do not write application code.
Ask one high-leverage question at a time and produce a Brainstorming Handoff before creating the Project Brief.
```

### New app with Next.js + React + Convex

```text
I want to create a web app with Next.js, React, and Convex.
Start with ai/09-intake/INTENT_ROUTER.md and ai/09-intake/stack-profiles/web-nextjs-react-convex.md.
If product/user/MVP are vague, run ai/09-intake/BRAINSTORMING_PLAYBOOK.md first.
Use the Orchestrator for the current execution environment.
Create or update ai/09-intake/INTAKE.md, ai/01-discovery/PROJECT_BRIEF.md, ai/02-product/PRD.md, ai/03-architecture/ARCHITECTURE.md, ai/05-execution/TEST_PLAN.md, and a first small story under ai/04-stories/.
Do not implement auth, billing, user data, production deploy, or Convex production data changes without explicit approval.
Do not write production app code until the first story satisfies Definition of Ready.
```

### Existing project

```text
Analyze this repository and create ai/08-memory/PROJECT_MAP.md before proposing changes.
Do not modify production code yet.
Use the routing matrix to select the smallest safe squad.
```

## Recommended operating loop

```text
1. Infer execution environment from current tool
2. Classify user intent and project maturity
3. Run brainstorming when the request is only an idea or rough concept
4. Select workflow mode
5. Select stack profile when available
6. Select squad level
7. Create or update the right artifact/template
8. Validate Definition of Ready
9. Implement one story only
10. Run verification commands
11. Run review readiness checks
12. Update memory and decision log when needed
13. Open PR or prepare release notes
```

## Core rule

Never ask an AI agent to “build the app.”

Ask it to execute **one story** with:

- clear acceptance criteria
- files in scope
- files/areas explicitly forbidden
- tests required
- commands to run
- non-goals
- stop conditions
- rollback plan
- review checklist
- specialist routing only when useful
- Definition of Ready satisfied before implementation
