# Skill: Diagnose

Run a disciplined diagnosis loop for bugs, flaky tests, performance regressions, and confusing failures.

Diagnosis is not guessing. It is not shotgun debugging. The goal is to establish evidence, change one variable at a time, and fix the smallest confirmed cause.

Use this skill before implementation for non-trivial bugfixes, flaky tests, regressions, and unexplained failures.

## When to use

- A bug is reported but the root cause is unknown.
- A test is flaky or fails only in some environments.
- Performance regressed and the bottleneck is not proven.
- Logs, errors, symptoms, or user reports conflict.
- A regression has appeared after a recent change.

## When not to use

- The change is a simple feature with no failure to explain.
- The defect and fix are already proven by a small failing test.
- The task is documentation-only and has no behavior failure.
- Human approval is missing for sensitive or risky diagnostic work.

## Procedure

1. Define the observed failure.
2. Establish a reproducible feedback loop.
3. Confirm the loop reproduces the actual bug.
4. Minimize the reproduction where safe.
5. Generate falsifiable hypotheses.
6. Instrument one variable at a time.
7. Apply the smallest fix.
8. Add or update regression coverage.
9. Remove temporary instrumentation.
10. Record root cause, verification, and prevention.

## Good diagnosis signals

- The reproduction is specific and repeatable.
- Each hypothesis can be proven false.
- Instrumentation targets one variable.
- The fix explains the evidence.
- Regression coverage fails before the fix and passes after it.
- Temporary logs, probes, and debug code are removed before completion.

## Bad diagnosis signals

- Multiple unrelated variables change at once.
- Tests are skipped, weakened, deleted, or bypassed.
- The fix is selected before the failure is understood.
- The explanation does not match the observed failure.
- The only verification is "it seems better".
- Temporary instrumentation remains in durable code.

## Stop conditions

Stop or escalate when:

- reproduction cannot be established and the strongest available evidence is not enough to proceed safely;
- the next step requires product, architecture, or sensitive-area judgment;
- the bug touches auth, billing, permissions, data loss, secrets, destructive migrations, or production data without human approval;
- two serious fix attempts fail;
- the diagnosis requires changing multiple unrelated variables.

## Important rules

- Never change multiple unrelated variables while diagnosing.
- Never remove, weaken, skip, or bypass tests to make the bug disappear.
- If reproduction cannot be established, document the strongest available evidence and stop or escalate.
- If the bug touches auth, billing, permissions, data loss, secrets, destructive migrations, or production data, require human approval before risky changes.

## Output format

```markdown
# Diagnosis Report

## Failure

## Reproduction

## Hypotheses

## Evidence

## Root cause

## Fix

## Regression test

## Commands run

## Remaining risks
```
