# Skill: TDD

Apply test-first or test-aware implementation.

## Procedure

1. Read acceptance criteria.
2. Identify the smallest observable behavior to verify.
3. For bugfixes, create or document a failing reproduction first.
4. For features, add or update the most relevant tests before or alongside implementation.
5. Implement the smallest useful change.
6. Run the relevant verification commands.
7. Do not remove, weaken, skip, or bypass tests to make the build pass.
8. Document commands run and results.

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
