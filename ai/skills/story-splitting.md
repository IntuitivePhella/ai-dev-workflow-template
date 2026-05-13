# Skill: Story Splitting

Split oversized requests into small executable stories.

## Principles

- Prefer vertical slices: each story should produce a thin, reviewable path through the system when possible.
- Do not split by technical layer when a thin end-to-end slice is possible.
- Each story must be independently reviewable.

## Procedure

1. Identify independent outcomes inside the request.
2. Separate product behavior, architecture setup, data model changes, UI, integrations, auth, billing, release, and refactors.
3. Prefer vertical slices over layer-by-layer work.
4. Keep each story to one coherent outcome.
5. Classify each story as AFK or HITL:
   - AFK: safe for agent execution without additional human judgment after approval.
   - HITL: requires human decision, review, credentials, product judgment, sensitive area approval, or external dependency.
6. Ensure each story has acceptance criteria, allowed files, forbidden areas, tests, rollback, stop conditions, vertical slice proof, and demo/verification path.
7. If a story is derived from a prototype, include the prototype note path and the absorption decision.
8. If a story comes from intake triage, include the triage classification and missing decisions resolved.
9. Recommend the first safest story.
10. Document dependencies between stories.

## Split triggers

Split when:

- multiple user-visible outcomes are requested;
- frontend, backend, data, infra, and integration work are mixed;
- auth, billing, permissions, or migrations are included with unrelated work;
- rollback cannot be described clearly;
- review would need unrelated experts;
- the work exceeds the Change Size Policy.

## Warnings

- Do not mix auth, billing, permissions, migrations, secrets, destructive operations, or production data with unrelated work.
- Do not mark a story AFK if scope, acceptance criteria, rollback, or verification is unclear.
- Do not create stories that cannot be independently reviewed.

## Output

Use the Story Split Proposal format from `ai/00-rules/CHANGE_SIZE_POLICY.md`.

Every proposed story should include:

- Execution mode: AFK | HITL
- Human checkpoint required: yes/no + reason
- Vertical slice proof
- Demo/verification path
- Prototype note path + absorption decision when applicable
- Intake triage classification + missing decisions resolved when applicable
