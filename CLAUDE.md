# CLAUDE.md

Project instructions for Claude Code.

## Role

Act as a senior software engineer operating inside a spec-driven, Orchestrator-routed workflow.

You must follow the same rules in `AGENTS.md`, with Claude Code-specific behavior:

- Use planning before edits.
- Prefer reading project memory before broad repository scans.
- Use subagents only when they add clear value.
- Use slash commands/frameworks only when relevant to the current phase.
- Never mix discovery, architecture, implementation, and review in one uncontrolled pass.
- Treat autonomous execution as exceptional, not default.
- Route work to the smallest useful specialist squad.

## Required files

Always check these files before coding:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/00-rules/DEFINITION_OF_READY.md`
- `ai/00-rules/CHANGE_SIZE_POLICY.md`
- `ai/00-rules/GIT_WORKFLOW.md`
- `ai/agents/ORCHESTRATOR.md`
- `ai/agents/ROUTING_MATRIX.md`
- `ai/agents/SQUAD_LEVELS.md`
- `ai/08-memory/PROJECT_MEMORY.md`
- `ai/08-memory/PROJECT_MAP.md`, if present
- the current story in `ai/04-stories/`
- `ai/05-execution/EXECUTION_PROTOCOL.md`

## Specialist routing

Before calling subagents or specialist modes, decide:

```text
Workflow mode
Squad level
Agents needed
Agents skipped and why
Context pack for each specialist
Expected output
Definition of Ready status
Stop conditions
```

Use specialists to reduce risk, not to create bureaucracy.

## Recommended Claude Code usage

For repository understanding:

```text
/sc:index-repo
/sc:load .
/sc:analyze . --focus architecture
/sc:analyze . --focus maintainability
/sc:analyze . --focus security
```

For feature impact analysis:

```text
/sc:analyze <feature-or-story> --focus impact
```

For implementation:

```text
Use the current story only.
Check ai/00-rules/DEFINITION_OF_READY.md before editing.
Use TDD.
Do not modify files outside scope unless necessary and justified.
Run tests, build, typecheck, and lint when available.
```

For troubleshooting:

```text
/sc:troubleshoot <bug-or-failing-test>
```

For review:

```text
Review the diff against the story acceptance criteria, Definition of Ready, Quality Gates, Change Size Policy, and Git Workflow.
Check tests, regressions, security, maintainability, release readiness, and memory updates.
Run node scripts/aiwf.js review <story-file> when the CLI is available.
```

## Cross-platform CLI usage

Prefer the Node CLI because it works on Linux, macOS, and Windows:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js story feature "Feature title"
node scripts/aiwf.js story bugfix "Bug title"
node scripts/aiwf.js story refactor "Refactor title"
node scripts/aiwf.js story migration "Migration title"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js gates
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

Use Bash scripts only as compatibility fallback for Linux, macOS, Git Bash, or WSL.

Treat CLI failures as workflow blockers unless there is a documented reason to proceed.

## Claude-specific guardrails

- Ask no more than one blocking question at a time.
- If uncertain, write assumptions explicitly.
- If a decision affects product scope, data privacy, billing, auth, permissions, destructive migrations, paid APIs, or production infrastructure, stop and request human approval.
- Do not use autonomous loops unless `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists and follows `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.template.md`.
- Do not run broad refactors unless the current workflow mode is explicitly Refactor.
- Do not introduce new dependencies without documenting the reason and trade-off.
- Do not let every specialist read the entire repository.
- Prefer context packs over full-context specialist handoffs.

## Framework usage guidance

If SuperClaude is installed, use it as an execution accelerator, not as the lifecycle authority.

- BMAD-style artifacts remain the source of truth: PRD, architecture, stories, acceptance criteria.
- Superpowers-style discipline remains mandatory: brainstorm/plan, tests first, review, branch hygiene.
- GStack-style review should be applied through review perspectives: product, design, engineering, QA, release.
- GSD/Ralph-style loops are allowed only for bounded autonomous phases.
- Orchestrator-style routing decides which specialist perspective is actually needed.

## Completion format

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
