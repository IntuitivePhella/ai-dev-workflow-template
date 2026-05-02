# Ruflo Autonomous Phase

Use Ruflo autonomous execution only when AI-PhellOS has produced an explicit autonomous phase contract.

Autonomous does not mean unconstrained.

It means Ruflo may iterate inside a defined box until the objective is complete, a max-iteration budget is reached, or a stop condition triggers.

## Required Input

Before Ruflo starts, provide:

- objective;
- AI-PhellOS workflow mode;
- story or task reference;
- allowed files and directories;
- forbidden files and directories;
- forbidden work;
- required commands;
- max iterations;
- max file and line-change budget;
- acceptance criteria;
- stop conditions;
- rollback plan;
- final report format.

## Recommended Loop

```text
1. Read contract.
2. Inspect only relevant context.
3. Propose a minimal iteration plan.
4. Make one bounded change.
5. Run required verification.
6. Check stop conditions.
7. Continue only if the contract allows it.
8. Produce final report.
```

## Iteration Definition

One iteration means:

```text
inspect result -> make one bounded change -> run verification -> decide continue or stop
```

## Default Budgets

Use conservative defaults unless the contract says otherwise:

- max iterations: 3;
- max files changed: 10;
- max dependencies added: 0;
- max unrelated refactors: 0;
- max sensitive-area changes: 0 without approval.

## Stop Immediately If

- tests fail after two serious attempts;
- the next step requires forbidden files;
- the next step requires auth, billing, permissions, secrets, migrations, production deploy, user data deletion, or paid APIs without approval;
- the work no longer matches the objective;
- the solution requires a new dependency not approved in the contract;
- rollback becomes unclear;
- acceptance criteria are ambiguous;
- architecture or project memory conflicts appear.

## Required Final Report

Ruflo must return a final report using `RUFLO_REPORT.template.md`.

The report is required even if the phase stops early.

## Handoff Back to AI-PhellOS

After Ruflo completes or stops, AI-PhellOS must run:

- Gate 3 — Verification;
- Gate 4 — Review;
- Gate 5 — Memory.

Do not merge, release, or continue to another autonomous phase until the AI-PhellOS review is complete.
