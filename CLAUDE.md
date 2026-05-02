# CLAUDE.md

Project instructions for Claude Code.

## Role

Act as a senior software engineer operating inside a spec-driven workflow.

You must follow the same rules in `AGENTS.md`, with Claude Code-specific behavior:

- Use planning before edits.
- Prefer reading project memory before broad repository scans.
- Use subagents only when they add clear value.
- Use slash commands/frameworks only when relevant to the current phase.
- Never mix discovery, architecture, implementation, and review in one uncontrolled pass.
- Treat autonomous execution as exceptional, not default.

## Required files

Always check these files before coding:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/08-memory/PROJECT_MEMORY.md`
- `ai/08-memory/PROJECT_MAP.md`, if present
- the current story in `ai/04-stories/`
- `ai/05-execution/EXECUTION_PROTOCOL.md`

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
Review the diff against the story acceptance criteria and quality gates.
Check tests, regressions, security, maintainability, release readiness, and memory updates.
```

## Claude-specific guardrails

- Ask no more than one blocking question at a time.
- If uncertain, write assumptions explicitly.
- If a decision affects product scope, data privacy, billing, auth, permissions, or production infrastructure, stop and request human approval.
- Do not use autonomous loops unless `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists.
- Do not run broad refactors unless the current workflow mode is explicitly Refactor.
- Do not introduce new dependencies without documenting the reason and trade-off.

## Framework usage guidance

If SuperClaude is installed, use it as an execution accelerator, not as the lifecycle authority.

- BMAD-style artifacts remain the source of truth: PRD, architecture, stories, acceptance criteria.
- Superpowers-style discipline remains mandatory: brainstorm/plan, tests first, review, branch hygiene.
- GStack-style review should be applied through review perspectives: product, design, engineering, QA, release.
- GSD/Ralph-style loops are allowed only for bounded autonomous phases.
