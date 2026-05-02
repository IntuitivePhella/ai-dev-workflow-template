# AI Development Workflow Template

A repo-template for disciplined AI-assisted software development with **Codex** or **Claude Code**.

The workflow is:

```text
BMAD-first, Superpowers-enforced, SuperClaude-assisted, GStack-reviewed, GSD/RalphLoop-bounded.
```

Translated into tool-agnostic practice:

```text
1. Understand the project or idea
2. Create or update specs
3. Decompose into small stories
4. Execute with tests first
5. Review with product, engineering, QA, and release lenses
6. Release with rollback and memory updates
```

This template is intentionally tool-neutral. It works with:

- Codex through `AGENTS.md` and `.codex/config.toml`
- Claude Code through `CLAUDE.md` and `.claude/settings.json`
- Any other coding agent that can read markdown instructions

## Workflow references

This template was designed after comparing and extracting the strongest operating patterns from these AI development workflows/frameworks:

- **BMAD-METHOD** — used as the main lifecycle backbone for product discovery, PRD, architecture, epics, stories, and agentic implementation.
  - Reference: https://github.com/bmad-code-org/BMAD-METHOD

- **Superpowers** — used as the engineering discipline layer: brainstorming before coding, worktrees, planning, TDD, subagent-driven execution, review, and branch finalization.
  - Reference: https://github.com/obra/superpowers

- **SuperClaude Framework** — used as the Claude Code execution accelerator: repository analysis, implementation, testing, troubleshooting, documentation, context save/load, and specialized technical agents.
  - Reference: https://github.com/SuperClaude-Org/SuperClaude_Framework

- **GStack** — used as the multi-role review layer: CEO/product, engineering manager, designer, QA, release, and documentation perspectives.
  - Reference: https://github.com/garrytan/gstack

- **GSD / Get Shit Done** — used as inspiration for phase decomposition, context-window control, and bounded execution phases.
  - Reference: https://github.com/gsd-build/get-shit-done

- **RalphLoop / Ralph-style execution loops** — used only as an optional bounded automation pattern for running one small, well-specified phase at a time with explicit stop conditions.
  - Reference: https://claude.com/plugins/ralph-loop
  - Related implementation: https://github.com/frankbria/ralph-claude-code

This repo does **not** vendor or reimplement those projects. It turns their strongest workflow ideas into a portable, markdown-first operating system for AI-assisted development.

## What this workflow optimizes for

- Existing project understanding before changes
- New project creation from brief to architecture to stories
- Small story-based execution
- TDD-first or test-aware implementation
- Explicit quality gates
- Review from product, engineering, QA, security, and release perspectives
- Bounded autonomous execution only when the phase is safe and well specified
- Durable project memory between AI sessions

## Core files

```text
AGENTS.md                                  # Codex and generic agent instructions
CLAUDE.md                                  # Claude Code-specific instructions
ai/00-rules/AI_RULES.md                    # Non-negotiable rules and stop conditions
ai/00-rules/WORKFLOW_MODES.md              # Which workflow to use for each type of work
ai/00-rules/QUALITY_GATES.md               # Required gates before advancing phases
ai/05-execution/EXECUTION_PROTOCOL.md      # Story execution protocol
ai/06-reviews/REVIEW_CHECKLIST.md          # Product/engineering/QA/security/release review
ai/08-memory/PROJECT_MEMORY.md             # Durable conventions, commands, risks, and decisions
ai/08-memory/PROJECT_MAP.md                # Existing project map
```

## Workflow modes

Use the smallest mode that fits the job:

1. **New Project** — idea to brief, discovery, PRD, architecture, stories, implementation.
2. **Existing Project Understanding** — map a repository before coding.
3. **New Feature in Existing Project** — feature brief, impact analysis, test plan, story, execution, review.
4. **Bugfix** — reproduction, failing test, minimal fix, regression test.
5. **Refactor** — behavior-preserving structural improvement with safety tests.
6. **Autonomous Phase** — bounded automation only with an explicit contract.

## Quick start for a new project

```bash
git clone <this-template> my-project
cd my-project
bash scripts/new-project.sh
```

Then open the repo with Codex or Claude Code and ask:

```text
Read AGENTS.md, CLAUDE.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, and ai/00-rules/QUALITY_GATES.md.
Start the new-project workflow using ai/templates/PROJECT_BRIEF.template.md.
Do not write application code yet.
```

## Quick start for an existing project

Copy the `ai/`, `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.codex/`, and `scripts/` folders into your existing repo.

Then run:

```bash
bash scripts/existing-project.sh
```

Ask your agent:

```text
Read AGENTS.md, CLAUDE.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, and ai/00-rules/QUALITY_GATES.md.
Analyze this repository and create ai/08-memory/PROJECT_MAP.md before proposing changes.
Do not modify production code yet.
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
