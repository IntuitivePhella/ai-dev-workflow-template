# Contributing to AI-PhellOS

Thank you for helping improve AI-PhellOS.

AI-PhellOS is an operating system for disciplined, intent-adaptive AI software development. Contributions should preserve the core promise: help AI coding agents work one safe, testable, reviewable story at a time.

## Core Contribution Rules

Before opening a pull request, make sure the change follows these principles:

1. Keep the workflow tool-agnostic unless the change belongs in a tool-specific adapter.
2. Keep Claude Code-specific behavior in `CLAUDE.md` or `.claude/`.
3. Keep Codex and generic-agent behavior in `AGENTS.md`, `.codex/`, or `ai/`.
4. Do not make optional adapters such as Ruflo mandatory.
5. Do not weaken quality gates, readiness checks, sensitive-area approval, or stop conditions.
6. Prefer small, focused pull requests.
7. Add or update tests when changing CLI behavior.
8. Update documentation when changing workflow behavior.

## Development Setup

Clone the repository and run the CLI directly with Node:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
npm test
```

The CLI is intentionally dependency-light and uses Node.js built-ins where possible.

## Pull Request Checklist

Before requesting review:

- [ ] The change has one clear objective.
- [ ] User-facing docs are updated when behavior changes.
- [ ] CLI changes include tests under `tests/`.
- [ ] `npm test` passes.
- [ ] `node scripts/aiwf.js doctor` passes or known warnings are documented.
- [ ] Sensitive-area behavior is not weakened.
- [ ] Optional integrations remain optional.

## Repository Structure

```text
AGENTS.md                  Tool-agnostic and Codex-friendly operating instructions
CLAUDE.md                  Claude Code-specific operating instructions
ai/00-rules/               Global rules, quality gates, readiness, git/change policies
ai/agents/                 Specialist role definitions and routing rules
ai/09-intake/              Intent routing, question strategy, brainstorming, stack profiles
ai/templates/              Reusable artifact and story templates
ai/10-integrations/ruflo/  Optional Ruflo adapter policy, prompts, templates, and reports
scripts/aiwf.js            Cross-platform Node CLI
tests/                     CLI regression tests
```

## Commit Style

Use clear conventional-style prefixes when useful:

```text
docs: clarify routing rule
feat: add CLI command
fix: correct story validation
chore: update package metadata
test: add CLI regression coverage
```

## Design Standard

A good AI-PhellOS contribution makes it easier for an AI agent to answer these questions before acting:

```text
What is the user asking for?
How mature is the request?
Which workflow mode applies?
What is the smallest safe squad?
What artifacts are required?
What is in scope?
What is forbidden?
How will this be tested?
When must the agent stop?
```

If a change makes those answers less clear, it probably does not belong in the core framework.
