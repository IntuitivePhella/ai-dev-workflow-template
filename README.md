# AI Development Workflow Template

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [中文](README.zh-CN.md)

A repo-template and installable CLI for disciplined AI-assisted software development with **Codex** or **Claude Code**.

The workflow is:

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
2. Classify the user's intent, maturity, and desired stack
3. Run guided brainstorming when the idea is vague
4. Create or update specs
5. Decompose into small stories
6. Validate readiness before implementation
7. Route work to the smallest useful specialist squad
8. Execute with tests first
9. Review with product, engineering, QA, security, and release lenses
10. Release with rollback and memory updates
```

This template is intentionally tool-neutral and cross-platform. It works with:

- Codex through `AGENTS.md`, `.codex/config.toml`, markdown agents, context packs, and skills
- Claude Code through `CLAUDE.md`, `.claude/settings.json`, and native subagent adapters in `.claude/agents/`
- Any other coding agent that can read markdown instructions
- A Node.js CLI that runs on Linux, macOS, and Windows
- Bash guardrail scripts for Linux, macOS, Git Bash, and WSL compatibility

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
→ Stack Profile
→ Brainstorming if product is vague
→ Required artifacts
→ Smallest safe squad
→ First safe story
→ TDD implementation
→ Review and memory update
```

A user can say:

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

A user can also say:

```text
Use Claude Code to create a web app with Next.js, React, and Convex.
```

The Orchestrator should route that request through:

```text
1. ai/09-intake/INTENT_ROUTER.md
2. ai/09-intake/QUESTION_STRATEGY.md
3. ai/09-intake/BRAINSTORMING_PLAYBOOK.md if product/user/MVP are vague
4. ai/09-intake/INTAKE.template.md
5. ai/09-intake/stack-profiles/web-nextjs-react-convex.md
6. ai/skills/intent-classification.md
7. ai/skills/stack-adaptation.md
8. ai/agents/ROUTING_MATRIX.md
```

Expected routing result:

```text
Tool target: Claude Code
Project state: New project
Project maturity: Rough concept unless product/user/MVP are already clear
Project type: Web app / SaaS candidate
Stack profile: Next.js + React + Convex
Workflow mode: Brainstorming first if vague, otherwise New Project
Squad level: Level 2 by default, Level 3 if auth, billing, permissions, user data, migrations, or deployment are involved
First safe action: brainstorm if needed, then create intake, project brief, PRD, architecture, test plan, and first story split before production app code
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

## Workflow references

This template was designed after comparing and extracting the strongest operating patterns from these AI development workflows/frameworks:

- **BMAD-METHOD** — lifecycle backbone for product brainstorming, product discovery, PRD, architecture, epics, stories, and agentic implementation.
- **Superpowers** — engineering discipline layer: brainstorming before coding, worktrees, planning, TDD, subagent-driven execution, review, and branch finalization.
- **SuperClaude Framework** — Claude Code execution accelerator: repository analysis, implementation, testing, troubleshooting, documentation, context save/load, and specialized technical agents.
- **GStack** — multi-role review layer: CEO/product, engineering manager, designer, QA, release, and documentation perspectives.
- **GSD / Get Shit Done** — phase decomposition, context-window control, and bounded execution phases.
- **RalphLoop / Ralph-style execution loops** — optional bounded automation pattern for one small, well-specified phase at a time with explicit stop conditions.

This repo does **not** vendor or reimplement those projects. It turns their strongest workflow ideas into a portable, markdown-first operating system for AI-assisted development.

## What this workflow optimizes for

- Existing project understanding before changes
- BMAD-style idea shaping and brainstorming before project brief
- New project creation from brainstorm to brief to architecture to stories
- Adaptive intake from natural-language user intent
- Stack-specific workflow adaptation through stack profiles
- Small story-based execution
- Definition of Ready before implementation
- TDD-first or test-aware implementation
- Explicit quality gates
- Specialist squads activated only when useful
- Claude Code native subagent adapters
- Codex-friendly markdown agents and context packs
- Review from product, engineering, QA, security, and release perspectives
- Bounded autonomous execution only when the phase is safe and well specified
- Durable project memory between AI sessions
- Lower token waste through context packs and routing rules
- Scriptable checks that reduce dependence on prompt obedience

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

ai/05-execution/EXECUTION_PROTOCOL.md                # Story execution protocol
ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.template.md # Bounded automation contract
ai/06-reviews/REVIEW_CHECKLIST.md                    # Product/engineering/QA/security/release review
ai/08-memory/PROJECT_MEMORY.md                       # Durable conventions, commands, risks, and decisions
ai/08-memory/PROJECT_MAP.md                          # Existing project map

scripts/aiwf.js                                      # Cross-platform Node CLI: Linux, macOS, Windows
scripts/aiwf.sh                                      # Bash compatibility wrapper
scripts/create-story.sh                              # Bash compatibility: create typed story files
scripts/validate-story.sh                            # Bash compatibility: validate readiness signals
scripts/check-gates.sh                               # Bash compatibility: check workflow gate artifacts
scripts/check-sensitive-areas.sh                     # Bash compatibility: flag sensitive changed paths
scripts/review-ready.sh                              # Bash compatibility: run readiness/gate checks before review

.github/pull_request_template.md                     # PR quality gate template
.github/workflows/ai-workflow-checks.yml             # GitHub Actions workflow guardrails

docs/OPERATING_MANUAL.md                             # End-to-end usage manual
docs/CROSS_PLATFORM_INSTALL.md                       # Linux/macOS/Windows CLI guide
docs/PUBLISHING.md                                   # npm publishing guide

prompts/generic/existing-project-understanding.md    # Copy/paste prompt for repo mapping
prompts/generic/new-feature.md                       # Copy/paste prompt for feature work
prompts/generic/bugfix.md                            # Copy/paste prompt for bugfix work
prompts/generic/refactor.md                          # Copy/paste prompt for refactor work
```

## Agent squad model

The workflow uses an Orchestrator-routed squad model.

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

## Claude Code subagents

Claude Code-specific subagents are adapters, not a separate source of truth.

```text
.claude/agents/orchestrator.md
.claude/agents/product.md
.claude/agents/architect.md
.claude/agents/implementer.md
.claude/agents/qa.md
.claude/agents/security.md
.claude/agents/reviewer.md
.claude/agents/release.md
```

Each subagent points back to the tool-agnostic source under `ai/agents/` and declares only the skills it needs.

## Workflow modes

Use the smallest mode that fits the job:

0. **Brainstorming / Pre-brief shaping** — vague idea to problem, user, MVP boundary, risks, and handoff.
1. **New Project** — idea to brief, discovery, PRD, architecture, stories, implementation.
2. **Existing Project Understanding** — map a repository before coding.
3. **New Feature in Existing Project** — feature brief, impact analysis, test plan, story, execution, review.
4. **Bugfix** — reproduction, failing test, minimal fix, regression test.
5. **Refactor** — behavior-preserving structural improvement with safety tests.
6. **Autonomous Phase** — bounded automation only with an explicit contract.

## Guardrail commands

Create a typed story:

```bash
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js story bugfix "Fix webhook retry duplication"
node scripts/aiwf.js story refactor "Extract billing adapter"
node scripts/aiwf.js story migration "Add organization membership index"
```

Validate story readiness:

```bash
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
```

Check workflow gates:

```bash
node scripts/aiwf.js gates
```

Check review readiness:

```bash
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

Flag sensitive changed paths:

```bash
node scripts/aiwf.js sensitive HEAD~1 HEAD
```

These checks are intentionally conservative. A warning does not always mean “stop,” but a failure should be treated as a blocker unless the reason to proceed is documented.

## Quick start for a vague idea

```text
I have an idea for an app, but I am not sure exactly what to build.
Use the Brainstorming Playbook first.
Do not write application code.
Ask one high-leverage question at a time and produce a Brainstorming Handoff before creating the Project Brief.
```

## Quick start for a new project

```bash
git clone <this-template> my-project
cd my-project
node scripts/aiwf.js init new
```

Then open the repo with Codex or Claude Code and ask:

```text
Read AGENTS.md, CLAUDE.md, ai/09-intake/INTENT_ROUTER.md, ai/09-intake/QUESTION_STRATEGY.md, ai/09-intake/BRAINSTORMING_PLAYBOOK.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/00-rules/DEFINITION_OF_READY.md, ai/00-rules/CHANGE_SIZE_POLICY.md, ai/00-rules/GIT_WORKFLOW.md, and ai/agents/ORCHESTRATOR.md.
Classify my intent and project maturity, run brainstorming if needed, select the stack profile if available, and start the new-project workflow.
Do not write application code yet.
Use the routing matrix to select the smallest safe squad.
```

## Quick start for Claude Code + Next.js + React + Convex

```text
Use Claude Code to create a web app with Next.js, React, and Convex.
Start with ai/09-intake/INTENT_ROUTER.md and ai/09-intake/stack-profiles/web-nextjs-react-convex.md.
If product/user/MVP are vague, run ai/09-intake/BRAINSTORMING_PLAYBOOK.md first.
Use .claude/agents/orchestrator.md first.
Create or update ai/09-intake/INTAKE.md, ai/01-discovery/PROJECT_BRIEF.md, ai/02-product/PRD.md, ai/03-architecture/ARCHITECTURE.md, ai/05-execution/TEST_PLAN.md, and a first small story under ai/04-stories/.
Do not implement auth, billing, user data, production deploy, or Convex production data changes without explicit approval.
Do not write production app code until the first story satisfies Definition of Ready.
```

## Quick start for an existing project

Using npm after publishing:

```bash
npx ai-dev-workflow-template install existing .
```

Using a cloned copy:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
```

Then ask your agent:

```text
Read AGENTS.md, CLAUDE.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/00-rules/DEFINITION_OF_READY.md, ai/00-rules/CHANGE_SIZE_POLICY.md, ai/00-rules/GIT_WORKFLOW.md, and ai/agents/ORCHESTRATOR.md.
Analyze this repository and create ai/08-memory/PROJECT_MAP.md before proposing changes.
Do not modify production code yet.
Use the routing matrix to select the smallest safe squad.
```

You can also copy the ready-to-use prompt from:

```text
prompts/generic/existing-project-understanding.md
```

## Recommended operating loop

```text
1. Classify user intent and project maturity
2. Run brainstorming when the request is only an idea or rough concept
3. Select workflow mode
4. Select stack profile when available
5. Select squad level
6. Create or update the right artifact/template
7. Validate Definition of Ready
8. Implement one story only
9. Run verification commands
10. Run review readiness checks
11. Update memory and decision log when needed
12. Open PR or prepare release notes
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
