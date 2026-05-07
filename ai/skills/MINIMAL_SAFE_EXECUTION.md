# Minimal Safe Execution Skill

## Purpose

Use this skill to reduce common AI coding failures during execution:

- hidden assumptions;
- unnecessary complexity;
- broad or unrelated edits;
- unverifiable completion;
- speculative abstractions.

This skill adds execution discipline. It does not create a new workflow authority.

## When to Use

Use this skill when an agent is about to:

- edit code;
- fix a bug;
- refactor;
- review a diff;
- implement a story;
- validate a change package;
- convert ambiguous intent into executable work.

## Principle 1 - Think Before Coding

The agent must surface:

- assumptions;
- ambiguities;
- the simplest viable approach;
- risks;
- decision points that require human approval.

The agent must not silently choose between multiple valid interpretations unless the assumption is explicitly stated and safe.

If an ambiguity affects product behavior, architecture, sensitive areas, acceptance criteria, or rollback, the agent must stop and ask for clarification or record a safe assumption before proceeding.

## Principle 2 - Simplicity First

The agent must implement the smallest solution that satisfies the current story or spec.

The agent must not add:

- speculative features;
- generic abstractions for a single use case;
- unnecessary configuration layers;
- unnecessary dependencies;
- broad framework rewrites;
- future-proofing not required by acceptance criteria.

Prefer existing project patterns over new abstractions. Add an abstraction only when it removes current complexity, supports multiple real use cases, or is explicitly required by the story or spec.

## Principle 3 - Surgical Changes

The agent must touch only files and lines required by the current task.

The agent must not:

- reformat unrelated code;
- rename unrelated symbols;
- rewrite unrelated comments;
- perform opportunistic refactors;
- delete pre-existing dead code unless explicitly requested;
- change public behavior outside the story or spec.

Every changed line should trace back to one of:

- user request;
- story;
- spec;
- acceptance criterion;
- failing test;
- explicit bug reproduction.

If the agent finds unrelated problems, it should report them as follow-ups instead of folding them into the current diff.

## Principle 4 - Goal-Driven Execution

The agent must convert work into verifiable goals.

For bugfixes:

- reproduce or describe the bug clearly;
- add or identify a failing test when practical;
- make the smallest fix;
- verify the fix.

For features:

- map acceptance criteria to verification steps;
- implement one safe slice at a time;
- avoid expanding scope.

For refactors:

- define preserved behavior before editing;
- verify behavior after editing;
- avoid behavior changes unless explicitly requested.

The agent should not mark work complete until the goal is either verified or the remaining verification gap is explicitly reported.

## Required Discipline Check

When this skill is used, the agent's final response should include:

```text
Minimal Safe Execution check:
- Assumptions surfaced: yes/no
- Simplest viable approach used: yes/no
- Surgical diff: yes/no
- Verifiable goal met: yes/no
- Out-of-scope changes avoided: yes/no
```

## Reviewer Checklist

A reviewer using this skill should ask:

- Did the agent assume anything silently?
- Is the solution more complex than necessary?
- Does the diff touch files unrelated to the task?
- Can every changed line be justified?
- Is there a clear verification command or test result?
- Were acceptance criteria preserved?
- Were existing contracts/specs respected?

## Interaction with AI-PhellOS

This skill:

- does not replace `AGENTS.md`;
- does not replace `CLAUDE.md`;
- does not override stories, specs, gates, or change packages;
- complements the existing workflow;
- should be used as execution discipline inside the current AI-PhellOS lifecycle.

Use the existing Orchestrator, workflow modes, squad levels, quality gates, and execution protocol as the source of authority. Apply this skill inside those boundaries to keep implementation, review, and validation small, explicit, and verifiable.
