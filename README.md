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

## Quick start for a new project

```bash
git clone <this-template> my-project
cd my-project
bash scripts/new-project.sh
```

Then open the repo with Codex or Claude Code and ask:

```text
Read AGENTS.md, CLAUDE.md, and ai/00-rules/AI_RULES.md.
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
Read AGENTS.md, CLAUDE.md, and ai/00-rules/AI_RULES.md.
Analyze this repository and create ai/08-memory/PROJECT_MAP.md before proposing changes.
Do not modify production code yet.
```

## Core rule

Never ask an AI agent to “build the app.”

Ask it to execute **one story** with:

- clear acceptance criteria
- files in scope
- tests required
- non-goals
- stop conditions
- review checklist
