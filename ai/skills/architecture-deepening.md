# Skill: Architecture Deepening

Find opportunities to make the codebase easier to change by creating deeper modules, clearer seams, simpler interfaces, better locality, and better testability.

This is not opportunistic refactoring during unrelated feature work. The goal is not more abstraction; the goal is better leverage, locality, clarity, and change safety.

## When to use

- A refactor or architecture improvement is explicitly requested.
- A change exposes shallow modules, leaky abstractions, high coupling, or scattered domain rules.
- Test setup is hard because boundaries are unclear.
- Repeated workflows or domain rules are duplicated across modules.
- A future story needs safer structure before behavior changes.

## When not to use

- The current task is unrelated feature implementation.
- There is no demonstrated friction.
- The proposed change is a broad rewrite.
- Public behavior would change without a separate feature/story.
- Tests or characterization coverage cannot establish behavior preservation.

## Procedure

1. Read project map, architecture docs, decision log, domain glossary, relevant stories/specs, and relevant code.
2. Identify shallow modules, leaky abstractions, duplicated workflows, unclear seams, high coupling, scattered domain rules, and hard-to-test areas.
3. Prefer changes that preserve behavior while improving locality, interface simplicity, testability, and conceptual integrity.
4. Propose candidates, not broad rewrites.
5. Split each candidate into safe stories.
6. Require tests or characterization coverage before structural changes.
7. Record durable architectural decisions when trade-offs are meaningful.

## Deepening candidate format

```markdown
# Architecture Deepening Candidate

## Candidate

## Files/modules

## Current friction

## Proposed seam

## Interface impact

## Testability gain

## Locality gain

## Behavior preservation proof

## Risk

## Suggested first story
```

## Good candidates

- Preserve public behavior.
- Reduce coupling around a proven pain point.
- Move scattered domain rules into a clearer home.
- Simplify an interface that many callers depend on.
- Improve testability with characterization coverage.
- Fit into one safe, reviewable story.

## Bad candidates

- Rename or reorganize code for taste only.
- Add abstraction without demonstrated friction.
- Combine refactor with unrelated feature behavior.
- Require broad rewrites or dependency swaps.
- Change public behavior without a separate approved story.
- Lack a behavior preservation proof.

## Stop conditions

Stop or escalate when:

- behavior preservation cannot be proven;
- the candidate exceeds one safe story;
- product behavior changes become necessary;
- auth, billing, permissions, production data, destructive migrations, or secrets are involved without human approval;
- a durable trade-off decision is needed but not logged.

## Important rules

- No architecture deepening during unrelated feature implementation.
- No broad rewrite.
- No changing public behavior unless routed as a separate feature/story.
- Do not introduce abstractions without demonstrated friction.
- If touching auth, billing, permissions, production data, destructive migrations, or secrets, require human approval.
