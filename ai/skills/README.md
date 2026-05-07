# AI Workflow Skills

Skills are reusable operating procedures that can be referenced by tool-agnostic agents in `ai/agents/` and by Claude Code subagents in `.claude/agents/`.

They should be short, procedural, and focused on one capability.

## Available skills

- `intent-classification.md` — convert user intent into workflow mode, project type, stack profile, and first artifact.
- `stack-adaptation.md` — adapt the framework to a concrete stack such as Next.js, React, Convex, Supabase, FastAPI, or mobile.
- `project-mapping.md` — map an existing repository before changing it.
- `impact-analysis.md` — identify affected modules, risks, tests, and rollout concerns.
- `acceptance-criteria.md` — convert goals into testable acceptance criteria.
- `story-splitting.md` — split oversized requests into small executable stories.
- `MINIMAL_SAFE_EXECUTION.md` — keep implementation, review, diff analysis, and scope validation explicit, simple, surgical, and verifiable.
- `tdd.md` — apply test-first or test-aware implementation.
- `test-planning.md` — define automated and manual verification coverage.
- `regression-analysis.md` — identify regression risks and affected flows.
- `security-review.md` — evaluate sensitive areas and human-approval triggers.
- `engineering-review.md` — review maintainability, simplicity, architecture consistency, and test quality.
- `release-readiness.md` — assess go/no-go, deployment risk, known issues, and release notes.
- `rollback-planning.md` — define reversible changes and recovery paths.
- `memory-update.md` — update durable project memory and decision logs.
- `publish-approved-work.md` — create a branch, commit, push, and open a PR only after completed work is verified and explicitly approved.

## Skill usage rules

1. Use skills through the Orchestrator when possible.
2. Do not load every skill for every task.
3. Prefer the smallest skill set needed for the current phase.
4. Skills do not replace `ai/00-rules/*` or `ai/05-execution/EXECUTION_PROTOCOL.md`.
5. When Claude Code subagents are used, each subagent should declare only the skills it needs in its frontmatter.
