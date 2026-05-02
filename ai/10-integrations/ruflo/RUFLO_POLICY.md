# Ruflo Policy

This policy governs how Ruflo may be used inside an AI-PhellOS-managed project.

## Status

Ruflo is optional.

AI-PhellOS must work without Ruflo. When Ruflo is available, it may be used only as an execution adapter after AI-PhellOS has selected a workflow mode and produced the required artifacts.

## Authority Model

AI-PhellOS has authority over:

- intent routing;
- workflow mode selection;
- squad level selection;
- Definition of Ready;
- quality gates;
- allowed and forbidden scope;
- sensitive-area approvals;
- release readiness;
- memory and decision log updates.

Ruflo may assist with:

- bounded implementation;
- test generation;
- repo mapping;
- diff review;
- documentation updates;
- browser checks;
- security review;
- autonomous iterations within a contract.

## Preconditions Before Ruflo Execution

Before invoking Ruflo for implementation or autonomous work, all of the following must be true:

- AI-PhellOS rules were read.
- Project memory was read.
- Project map was read or created.
- A workflow mode was selected.
- A story, task, or autonomous phase contract exists.
- Acceptance criteria are testable.
- Non-goals are explicit.
- Allowed files and forbidden files are defined.
- Required verification commands are known.
- Stop conditions are defined.
- Human approval is recorded for sensitive areas.

## Allowed Ruflo Work

Ruflo may:

- inspect relevant files;
- propose a bounded implementation plan;
- write or update tests;
- implement changes inside allowed files;
- run required commands;
- perform review passes;
- produce a final execution report;
- recommend follow-up work without silently doing it.

## Forbidden Ruflo Work

Ruflo must not:

- expand scope without approval;
- touch forbidden files;
- make billing changes without approval;
- weaken auth or permissions;
- change secrets or environment configuration;
- run production deploys;
- perform destructive migrations;
- delete user data;
- add dependencies unless explicitly authorized;
- remove or weaken tests;
- perform unrelated refactors;
- continue after a stop condition triggers.

## Required Stop Conditions

Stop immediately if:

- tests fail after two serious attempts;
- the implementation requires files outside the allowed scope;
- a forbidden or sensitive area must be modified;
- requirements conflict with project memory or architecture;
- a new dependency is required and not approved;
- a migration is required and not approved;
- rollback becomes unclear;
- production resources or paid external services are required;
- the change grows beyond the defined budget.

## Output Requirement

Every Ruflo execution must end with a report containing:

- summary;
- objective;
- workflow mode;
- plugins or capabilities used;
- iterations used;
- files changed;
- commands run;
- acceptance criteria status;
- risks;
- stop conditions encountered;
- follow-ups;
- memory or decision-log updates needed.

## Default Rule

```text
Use the smallest safe Ruflo capability needed for the current AI-PhellOS phase.
```
