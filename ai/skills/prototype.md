# Skill: Prototype

Use controlled, disposable prototypes to answer a specific design, product, UX, integration, performance, or technical question before committing to production architecture.

Prototype is disposable code used to answer a specific question.

Prototype is not production.

Prototype must not silently become production.

Prototype findings may lead to deletion, archival, absorption through a real story/change, or further approved exploration.

## When to use

- A design or UX question is blocking a real story.
- An integration path is uncertain and needs a bounded feasibility check.
- A performance concern needs a focused probe before architecture hardens.
- A technical direction is unclear enough that a disposable experiment is safer than premature production code.

## When not to use

- A story is already ready for normal implementation.
- The work is a production change that should go straight through the usual story, TDD, review, and release flow.
- The prototype would be used to bypass architecture review, tests, or sensitive-area approval.
- The question can be answered by reading docs, code, specs, or existing memory without writing code.

## Prototype types

- State/business-logic prototype
- UI/interaction prototype
- Integration feasibility prototype
- Performance/scale probe

## Procedure

1. State the question the prototype must answer.
2. Define the prototype type.
3. Define allowed files.
4. Define forbidden files.
5. Define how to run it.
6. Avoid production polish.
7. Avoid persistence by default unless persistence is the question.
8. Capture findings in `PROTOTYPE_NOTES` using `ai/templates/PROTOTYPE_NOTES.template.md`.
9. Decide: delete, absorb, archive, or convert into a real story/change.

## Prototype notes format

- Question
- Prototype type
- Allowed scope
- Forbidden scope
- How to run
- Findings
- Decision
- Follow-up stories

## Stop conditions

- The question is answered well enough to choose the next workflow step.
- Scope drifts beyond the original question.
- The prototype starts accumulating production polish or unrelated behavior.
- Sensitive areas appear without explicit human approval.
- The prototype would need persistent data, credentials, or external cost that was not approved.

## Exit criteria

- The prototype question is explicit.
- Allowed and forbidden scope are explicit.
- A reproducible run path exists.
- Findings are recorded in `PROTOTYPE_NOTES`.
- A deliberate exit decision is recorded: Delete, absorb, archive, or continue with explicit approval.
- Any absorption path is routed into a real story/change and does not bypass architecture review.

## Important rules

- Prototype is not production.
- Prototype must not silently become production.
- Prototype must not bypass architecture review if absorbed.
- Prototype must not modify production data.
- Prototype must not introduce secrets into the repository.
- Prototype must not be used to avoid proper tests for production work.
- If prototype touches auth, billing, permissions, production data, destructive migrations, external paid APIs, or secrets, require human approval.
