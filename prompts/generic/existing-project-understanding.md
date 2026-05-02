# Existing Project Understanding Prompt

Use this prompt before changing an existing repository.

```text
Read AGENTS.md or CLAUDE.md, then read:

- ai/00-rules/AI_RULES.md
- ai/00-rules/WORKFLOW_MODES.md
- ai/00-rules/QUALITY_GATES.md
- ai/00-rules/DEFINITION_OF_READY.md
- ai/00-rules/CHANGE_SIZE_POLICY.md
- ai/agents/ORCHESTRATOR.md
- ai/agents/ROUTING_MATRIX.md
- ai/agents/SQUAD_LEVELS.md
- ai/08-memory/PROJECT_MEMORY.md
- ai/08-memory/PROJECT_MAP.md, if present

Run the Existing Project Understanding workflow.

Your task:

1. Inspect the repository structure.
2. Identify stack, frameworks, commands, entry points, test strategy, build strategy, deployment assumptions, risks, and conventions.
3. Create or update ai/08-memory/PROJECT_MAP.md.
4. Create or update ai/08-memory/PROJECT_MEMORY.md only with durable facts.
5. Do not modify production code.
6. Do not propose implementation until the project map exists.

Return:

- workflow mode
- squad level
- files inspected
- project map summary
- risks discovered
- recommended next workflow mode
```
