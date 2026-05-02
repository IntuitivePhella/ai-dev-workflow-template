# Skill: Intent Classification

Convert a natural-language request into a safe workflow configuration.

## Procedure

1. Identify the user's desired outcome.
2. Identify the target tool: Claude Code, Codex, or Generic.
3. Identify project state: new project, existing project, or unknown.
4. Identify project type: web app, SaaS, API, mobile, desktop, CLI, library, automation, AI agent, or other.
5. Identify explicit stack choices.
6. Select the workflow mode from `ai/00-rules/WORKFLOW_MODES.md`.
7. Select squad level from `ai/agents/SQUAD_LEVELS.md`.
8. Select stack profile from `ai/09-intake/stack-profiles/` when available.
9. Identify sensitive areas and approval needs.
10. Produce an Intent Routing Result using `ai/09-intake/INTENT_ROUTER.md`.

## Heuristic

Prefer forward progress with explicit assumptions when safe.

Ask at most one blocking question only when proceeding would create product, architecture, security, billing, data, or deployment risk.

## Output

Use the Intent Routing Result format from `ai/09-intake/INTENT_ROUTER.md`.
