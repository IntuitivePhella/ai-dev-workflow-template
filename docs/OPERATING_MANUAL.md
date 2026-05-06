# AI Workflow Operating Manual

This manual explains how to use the workflow with Codex, Claude Code, or any Markdown-aware coding agent.

## Mental model

The workflow is not a prompt pack. It is a lightweight operating system for AI-assisted development.

Every task should move through this loop:

```text
Understand → Specify → Validate readiness → Execute one story → Verify → Review → Update memory
```

## Golden rule

Never ask an agent to build an entire app in one pass.

Ask it to execute one ready story.

## First-time setup for a new project

```bash
bash scripts/aiwf.sh init new
```

Then ask the agent to fill:

1. `ai/01-discovery/PROJECT_BRIEF.md`
2. `ai/01-discovery/DISCOVERY.md`
3. `ai/02-product/PRD.md`
4. `ai/03-architecture/ARCHITECTURE.md`
5. stories under `ai/04-stories/`

No production code should be written until the brief, PRD, architecture, and first story are ready.

## First-time setup for an existing project

```bash
bash scripts/aiwf.sh init existing
```

Then ask the agent to map the repository before coding:

```text
Use prompts/generic/existing-project-understanding.md.
Create or update ai/08-memory/PROJECT_MAP.md.
Do not modify production code.
```

## Creating work items

Use typed stories:

```bash
bash scripts/aiwf.sh story feature "Add team invitation flow"
bash scripts/aiwf.sh story bugfix "Fix webhook retry duplication"
bash scripts/aiwf.sh story refactor "Extract billing adapter"
bash scripts/aiwf.sh story migration "Add organization membership index"
```

Then fill the generated story and validate it:

```bash
bash scripts/aiwf.sh validate ai/04-stories/<story-file>.md
```

## Readiness before implementation

A story is not ready until it has:

- objective;
- workflow mode;
- squad level;
- scope;
- non-goals;
- files likely in scope;
- forbidden files/areas;
- testable acceptance criteria;
- tests or verification commands;
- rollback plan;
- risks;
- approval for sensitive areas when needed.

Use `ai/00-rules/DEFINITION_OF_READY.md` as the source of truth.

## During implementation

The agent should:

1. Read rules and memory.
2. Confirm boundaries.
3. Use the smallest safe squad.
4. Write or update tests first where feasible.
5. Make the smallest useful change.
6. Avoid opportunistic refactors.
7. Run tests/build/typecheck/lint where available.
8. Stop if the task expands beyond one story.

## Before review

Run:

```bash
bash scripts/aiwf.sh review ai/04-stories/<story-file>.md
```

This runs story readiness, gate checks, and sensitive path scanning.

## Pull requests

Use the PR template in `.github/pull_request_template.md`.

A PR should include:

- summary;
- story/artifact path;
- workflow mode;
- squad level;
- files changed;
- acceptance criteria;
- tests run;
- quality gates;
- sensitive area review;
- rollback plan;
- risks and follow-ups.

## Autonomous phases

Autonomous phases are exceptional.

Use them only when:

- `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists;
- allowed and forbidden files are explicit;
- max iterations are explicit;
- max change budget is explicit;
- commands are explicit;
- stop conditions are explicit;
- rollback is explicit.

Start from:

```text
ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.template.md
```

## Recommended Codex prompt

```text
Read AGENTS.md and the required workflow files.
Use the smallest workflow mode and squad level.
Do not implement until the story satisfies Definition of Ready.
Use scripts/aiwf.sh when available.
Execute one story only.
Report files changed, tests run, gates, risks, and follow-ups.
```

## Recommended Claude Code prompt

```text
Read CLAUDE.md and the required workflow files.
Use the Orchestrator routing model.
Do not call every subagent by default.
Do not implement until the story satisfies Definition of Ready.
Use scripts/aiwf.sh when available.
Execute one story only.
Run tests/build/typecheck/lint where available.
```

## What to do when blocked

The agent should stop and produce a gap report when:

- product behavior is ambiguous;
- sensitive approval is missing;
- tests cannot pass after two serious attempts;
- architecture conflicts with memory;
- a new dependency/framework/database choice is needed;
- rollback is unclear;
- the change is too large.

## Maintenance

Use `ai/config.yaml` only when a project needs to override AI-PhellOS defaults. Start from `ai/config.template.yaml`; the config is optional and may define `paths.specsPath`, `paths.changesPath`, default commands, and per-artifact rules. When it is absent, CLI commands continue to use `ai/11-specs`, `ai/04-changes`, and story-specific command guidance.

Update `PROJECT_MEMORY.md` when:

- commands change;
- conventions change;
- recurring risks are discovered;
- a new dependency becomes standard;
- a testing or deployment pattern is established.

Update `DECISION_LOG.md` when:

- architecture changes;
- product scope changes;
- data model changes;
- API contracts change;
- dependency or infrastructure decisions are made.
