# Squad Prompt Examples

Use these prompts with Codex, Claude Code, or any agent that reads the repo instructions.

## Classify task and choose squad

```text
Read AGENTS.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/agents/ORCHESTRATOR.md, ai/agents/CLASSIFICATION_RULES.md, ai/agents/ROUTING_MATRIX.md, and ai/agents/SQUAD_LEVELS.md.

Classify this task, choose the smallest safe squad, and create an Orchestration Plan.
Do not implement yet.

Task:
<describe task>
```

## New feature in existing project

```text
Use the Orchestrator.
Classify this as a new feature in an existing project unless evidence suggests otherwise.
Select the smallest safe squad.
Create context packs for selected specialists.
Produce FEATURE_BRIEF, IMPACT_ANALYSIS, TEST_PLAN, and a story.
Do not implement yet.
```

## Bugfix

```text
Use the Bugfix Squad.
First define reproduction steps and expected behavior.
Create or identify a failing test when feasible.
Then implement the minimal fix and run the relevant tests.
End with QA Review and Engineering Review if the change is non-trivial.
```

## Security-sensitive change

```text
Use the Orchestrator and Security Review Squad.
Identify sensitive areas touched.
Do not implement until approval requirements are clear.
Produce Security Review and required changes.
```

## Parallel review perspectives

```text
Run specialist reviews in parallel conceptually, but keep context packs small:

- QA: acceptance criteria, test gaps, regression risk.
- Reviewer: maintainability, simplicity, architecture consistency.
- Security: only if sensitive triggers exist.

Consolidate into one Orchestration Decision.
```

## Autonomous phase

```text
Use Autonomous Phase mode only if ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md exists.
Validate allowed files, forbidden files, commands, completion promise, max iterations, and stop conditions.
If any are missing, stop and request the missing contract details.
```
