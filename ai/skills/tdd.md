# Skill: TDD

Apply test-first or test-aware implementation.

## When to use

Use this skill for features, bugfixes, refactors, and any behavior-changing story.

For bugfixes, start with reproduction or the strongest documented evidence available. For confirmed root causes, add regression tests.

## Procedure

1. Read acceptance criteria.
2. Identify one vertical slice: the smallest observable behavior that proves the path.
3. If behavior is uncertain, use a tracer bullet: a small end-to-end behavior that proves the route from input to output.
4. Run a Red-Green-Refactor cycle:
   - RED: write one failing test for public or observable behavior.
   - GREEN: implement the smallest useful change.
   - REFACTOR: clean up only after GREEN.
5. Avoid mocks for internals unless a boundary requires it.
6. Repeat one vertical slice at a time.
7. Run the relevant verification commands.
8. Report commands and results honestly.

## Rules

- Tests should verify public/observable behavior, not private implementation details.
- Good tests should survive internal refactors.
- Do not write a large batch of tests and then implement everything afterward.
- Do not refactor while RED.
- Refactor only after GREEN.
- Never weaken tests to reach GREEN.
- Never skip failing tests without explicit reason.
- Do not confuse implementation coverage with behavior confidence.

## When test-first is not feasible

Document why and use the strongest available verification path:

- typecheck;
- build;
- lint;
- manual reproduction;
- component smoke test;
- API smoke test;
- screenshot/manual QA notes.

## Stop conditions

Stop when tests cannot pass after two serious attempts, the test harness is missing and cannot be safely added, or implementation requires changing product/architecture scope.

If test-first is not feasible, document why and define the closest verification loop before implementation continues.

## Output format

```markdown
# TDD Report

## Behavior under test

## RED proof

## GREEN proof

## Refactor notes

## Commands run

## Remaining verification gaps
```
