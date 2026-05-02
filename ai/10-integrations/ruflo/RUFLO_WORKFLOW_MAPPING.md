# Ruflo Workflow Mapping

This document maps AI-PhellOS workflow modes to safe Ruflo usage patterns.

Ruflo must be used only when the selected AI-PhellOS mode and required artifacts make the work bounded, testable, and reviewable.

## Mode 0 — Brainstorming / Pre-Brief Shaping

Ruflo usage: limited or none.

Use AI-PhellOS brainstorming first. Ruflo should not drive vague product ideation or open-ended app generation.

Allowed support:

- summarize existing notes;
- organize discovered constraints;
- prepare a structured handoff after the AI-PhellOS brainstorming artifact exists.

Do not write production code.

## Mode 1 — New Project

Ruflo usage: medium, after core artifacts exist.

AI-PhellOS must create or approve:

- project brief;
- discovery;
- PRD;
- architecture;
- initial epics or stories;
- first ready story.

Ruflo may then assist with:

- scaffold review;
- test plan expansion;
- story-by-story implementation;
- documentation generation;
- security review;
- release-readiness checks.

Do not ask Ruflo to build the whole app.

## Mode 2 — Existing Project Understanding

Ruflo usage: high for analysis, zero for implementation.

Ruflo may assist with:

- repository structure mapping;
- dependency inventory;
- command discovery;
- test surface discovery;
- architecture observations;
- risk register;
- project memory update proposal.

Required output:

- `ai/08-memory/PROJECT_MAP.md` update or draft;
- `ai/08-memory/PROJECT_MEMORY.md` update or draft;
- no application code changes.

## Mode 3 — New Feature in Existing Project

Ruflo usage: high after readiness.

AI-PhellOS must provide:

- feature brief;
- impact analysis;
- test plan;
- story;
- allowed and forbidden files;
- acceptance criteria.

Ruflo may assist with:

- TDD implementation;
- test generation;
- browser checks;
- docs update;
- security review;
- diff risk review;
- final execution report.

## Mode 4 — Bugfix

Ruflo usage: high if the bug is bounded.

Preferred Ruflo flow:

1. reproduce the bug;
2. create or document a failing test;
3. implement a minimal fix;
4. add or update regression tests;
5. run required commands;
6. produce a final report.

Stop if the bug requires sensitive areas, large redesign, dependency changes, or unclear expected behavior.

## Mode 5 — Refactor

Ruflo usage: moderate and tightly scoped.

AI-PhellOS must define:

- preserved behavior;
- safety tests;
- allowed files;
- forbidden files;
- max change budget.

Ruflo may perform mechanical refactors only.

Do not allow opportunistic rewrites, dependency swaps, product behavior changes, or architectural changes unless approved.

## Mode 6 — Autonomous Phase

Ruflo usage: high, but only inside an approved autonomous phase contract.

Required before execution:

- `AUTONOMOUS_PHASE_CONTRACT.md` or Ruflo-specific equivalent;
- max iterations;
- allowed and forbidden files;
- required commands;
- stop conditions;
- rollback plan;
- final report format.

Ruflo must execute one phase only and stop when the contract is complete or any stop condition triggers.

## Summary

| AI-PhellOS Mode | Ruflo Role | Autonomy Level |
| --- | --- | --- |
| Mode 0 — Brainstorming | organize after AI-PhellOS shaping | Low |
| Mode 1 — New Project | execute ready stories after artifacts | Medium |
| Mode 2 — Existing Project Understanding | analyze and map only | High analysis / no coding |
| Mode 3 — New Feature | TDD execution and review | High within story |
| Mode 4 — Bugfix | reproduce, test, fix, regress | High if bounded |
| Mode 5 — Refactor | mechanical change with safety tests | Medium-low |
| Mode 6 — Autonomous Phase | bounded autonomous execution | High within contract |
