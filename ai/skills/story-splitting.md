# Skill: Story Splitting

Split oversized requests into small executable stories.

## Procedure

1. Identify independent outcomes inside the request.
2. Separate product behavior, architecture setup, data model changes, UI, integrations, auth, billing, release, and refactors.
3. Keep each story to one coherent outcome.
4. Ensure each story has acceptance criteria, allowed files, forbidden areas, tests, rollback, and stop conditions.
5. Recommend the first safest story.
6. Document dependencies between stories.

## Split triggers

Split when:

- multiple user-visible outcomes are requested;
- frontend, backend, data, infra, and integration work are mixed;
- auth, billing, permissions, or migrations are included with unrelated work;
- rollback cannot be described clearly;
- review would need unrelated experts;
- the work exceeds the Change Size Policy.

## Output

Use the Story Split Proposal format from `ai/00-rules/CHANGE_SIZE_POLICY.md`.
