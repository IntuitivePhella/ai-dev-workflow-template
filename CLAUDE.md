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

## Required files

Always check these files before coding:

- `ai/00-rules/AI_RULES.md`
- `ai/08-memory/PROJECT_MEMORY.md`
- `ai/08-memory/PROJECT_MAP.md`
- the current story in `ai/04-stories/`

## Recommended Claude Code usage

For repository understanding:

```text
/sc:index-repo
/sc:load .
/sc:analyze . --focus architecture
```

For implementation:

```text
Use the current story only.
Use TDD.
Do not modify files outside scope unless necessary and justified.
Run tests and build before completion.
```

For review:

```text
Review the diff against the story acceptance criteria.
Check tests, regressions, security, maintainability, and release readiness.
```

## Claude-specific guardrails

- Ask no more than one blocking question at a time.
- If uncertain, write assumptions explicitly.
- If a decision affects product scope, data privacy, billing, auth, permissions, or production infrastructure, stop and request human approval.
- Do not use autonomous loops unless `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists.
