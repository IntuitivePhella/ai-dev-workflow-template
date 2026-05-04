# CLAUDE.md

Project instructions for Claude Code.

## Role

Act as a senior software engineer operating inside a spec-driven, Orchestrator-routed workflow.

You must follow the same rules in `AGENTS.md`, with Claude Code-specific behavior:

- Use planning before edits.
- Prefer reading project memory before broad repository scans.
- Start with adaptive intent intake when the user describes what they want to create, change, fix, understand, refactor, or automate.
- Run brainstorming before brief/PRD/architecture when the user only has an idea or rough concept.
- Infer that the execution environment is Claude Code; the user does not need to say it.
- Use `.claude/agents/*` subagents only when the Orchestrator selects them.
- Use slash commands/frameworks only when relevant to the current phase.
- Never mix discovery, architecture, implementation, and review in one uncontrolled pass.
- Treat autonomous execution as exceptional, not default.
- Route work to the smallest useful specialist squad.

## Adaptive intake and brainstorming for Claude Code

When the request is not already a ready story, first classify intent and project maturity with:

- `ai/09-intake/INTENT_ROUTER.md`
- `ai/09-intake/QUESTION_STRATEGY.md`
- `ai/09-intake/BRAINSTORMING_PLAYBOOK.md` when project maturity is Idea only or Rough concept
- `ai/09-intake/INTAKE.template.md`
- relevant stack profile under `ai/09-intake/stack-profiles/`
- relevant skill files under `ai/skills/`

For a vague request like:

```text
I have an idea for an app for schools, but I am not sure what exactly to build.
```

Do this before any production coding:

1. Select Project maturity: Idea only.
2. Select Pre-brief phase: Brainstorming.
3. Use `.claude/agents/orchestrator.md` first.
4. Use Product as the primary specialist.
5. Ask one high-leverage question at a time.
6. Create a brainstorming artifact from `ai/templates/BRAINSTORMING.template.md`.
7. Produce a Brainstorming Handoff.
8. Only then create intake, project brief, discovery, PRD, architecture, test plan, and first story split.

For a product request like:

```text
I want to create a web app with Next.js, React, and Convex.
```

Do this before coding:

1. Infer Execution environment: Claude Code.
2. Select Project state: New project.
3. Select Project maturity: Rough concept unless product/user/MVP are already clear.
4. Select Project type: Web app / SaaS candidate.
5. Select Stack profile: `ai/09-intake/stack-profiles/web-nextjs-react-convex.md`.
6. Use Brainstorming first if product intent is vague; otherwise use New Project.
7. Select Squad level: Level 2, or Level 3 if auth, billing, user data, permissions, migrations, or deployment are involved.
8. Use subagents only as routed by Orchestrator.
9. Create intake, project brief, PRD, architecture, test plan, and first story split before production app code.

## Required files

Always check these files before coding:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/00-rules/DEFINITION_OF_READY.md`
- `ai/00-rules/CHANGE_SIZE_POLICY.md`
- `ai/00-rules/GIT_WORKFLOW.md`
- `ai/00-rules/CONTINUOUS_IMPROVEMENT.md`
- `ai/agents/ORCHESTRATOR.md`
- `ai/agents/ROUTING_MATRIX.md`
- `ai/agents/SQUAD_LEVELS.md`
- `ai/09-intake/INTENT_ROUTER.md` when the request is not already a ready story
- `ai/09-intake/BRAINSTORMING_PLAYBOOK.md` when the request is an idea or rough concept
- `ai/09-intake/QUESTION_STRATEGY.md` when asking intake/brainstorming questions
- `ai/08-memory/PROJECT_MEMORY.md`
- `ai/08-memory/PROJECT_MAP.md`, if present
- the current story in `ai/04-stories/`
- `ai/05-execution/EXECUTION_PROTOCOL.md`

## Specialist routing

Before calling subagents or specialist modes, decide:

```text
Workflow mode
Project maturity
Squad level
Agents needed
Agents skipped and why
Context pack for each specialist
Expected output
Definition of Ready status
Stop conditions
```

Use specialists to reduce risk, not to create bureaucracy.

## Claude Code subagents

Claude Code native subagents live in `.claude/agents/`.

Use them as adapters over the tool-agnostic agents in `ai/agents/`:

```text
.claude/agents/orchestrator.md -> ai/agents/ORCHESTRATOR.md
.claude/agents/product.md      -> ai/agents/PRODUCT.md
.claude/agents/architect.md    -> ai/agents/ARCHITECT.md
.claude/agents/implementer.md  -> ai/agents/IMPLEMENTER.md
.claude/agents/qa.md           -> ai/agents/QA.md
.claude/agents/security.md     -> ai/agents/SECURITY.md
.claude/agents/reviewer.md     -> ai/agents/REVIEWER.md
.claude/agents/release.md      -> ai/agents/RELEASE.md
```

Rules:

- Do not call every subagent by default.
- Use the Orchestrator first.
- During brainstorming, do not call Implementer.
- Pass compact context packs.
- Let each subagent use only the skills declared in its frontmatter.
- Consolidate outputs before implementation or completion.

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

- Ask no more than one blocking or high-leverage brainstorming question at a time.
- If uncertain, write assumptions explicitly.
- If a decision affects product scope, data privacy, billing, auth, permissions, destructive migrations, paid APIs, or production infrastructure, stop and request human approval.
- Do not use autonomous loops unless `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md` exists and follows `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.template.md`.
- Do not run broad refactors unless the current workflow mode is explicitly Refactor.
- Do not introduce new dependencies without documenting the reason and trade-off.
- Do not let every specialist read the entire repository.
- Prefer context packs over full-context specialist handoffs.

## Framework usage guidance

If SuperClaude is installed, use it as an execution accelerator, not as the lifecycle authority.

- BMAD-style artifacts remain the source of truth: brainstorming, project brief, discovery, PRD, architecture, stories, acceptance criteria.
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
