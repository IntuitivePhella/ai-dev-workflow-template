# Ruflo Prompts

These prompts are adapter prompts for using Ruflo inside an AI-PhellOS project.

They assume AI-PhellOS has already selected the workflow mode and produced the required artifacts.

## Existing Project Understanding

```text
Read AI-PhellOS entry files, rules, project memory, and workflow modes.
Use Ruflo only for repository understanding.
Do not write application code.
Map repository structure, stack, commands, entry points, tests, risks, and conventions.
Draft updates for ai/08-memory/PROJECT_MAP.md and ai/08-memory/PROJECT_MEMORY.md.
Stop after producing the understanding report.
```

## Ready Story Execution

```text
Read the AI-PhellOS story and relevant rules.
Use Ruflo as a bounded execution adapter.
Respect allowed files, forbidden files, non-goals, acceptance criteria, and required commands.
Implement only this story.
Write or update tests before or alongside code.
Do not add dependencies unless explicitly approved.
Stop on any AI-PhellOS or Ruflo stop condition.
Return a final Ruflo execution report.
```

## Bugfix

```text
Read the bug report, AI-PhellOS rules, project memory, and relevant files.
Use Ruflo to reproduce the bug, create or document a failing test, implement the smallest fix, and add regression coverage.
Do not perform opportunistic refactors.
Stop if expected behavior is unclear or the fix requires sensitive areas.
Return a final Ruflo execution report.
```

## Refactor

```text
Read the refactor story, preserved behavior, safety tests, allowed files, and forbidden files.
Use Ruflo only for behavior-preserving mechanical changes.
Do not change product behavior.
Do not add dependencies.
Do not modify files outside the contract.
Run required verification and return a final Ruflo execution report.
```

## Autonomous Phase

```text
Read the autonomous phase contract completely before acting.
Use Ruflo autonomous execution only within the contract.
Follow max iterations, max change budget, allowed files, forbidden files, required commands, stop conditions, and rollback plan.
Make one bounded change per iteration.
Stop immediately when complete or when any stop condition triggers.
Return the required final report even if the phase stops early.
```

## Review Pass

```text
Read the implemented diff, story, acceptance criteria, test plan, AI-PhellOS quality gates, and project memory.
Use Ruflo for review only.
Check correctness, scope discipline, tests, maintainability, security-sensitive changes, release risk, and documentation impact.
Do not modify code unless explicitly asked.
Return findings grouped by severity and include a clear merge recommendation.
```

## Documentation Update

```text
Read the completed story, diff summary, changed commands, changed conventions, and public API changes.
Use Ruflo to update documentation only.
Do not change application behavior.
Update relevant docs and propose PROJECT_MEMORY.md or DECISION_LOG.md updates if needed.
Return a documentation report.
```
