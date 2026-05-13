# Skill: Work Intake Triage

Triage decides what workflow state the work belongs in. It does not implement the work.

This skill complements intent routing and does not replace the Orchestrator.

## Triage inputs

- User request, issue, bug report, stakeholder ask, or change proposal
- Current repo/project context when available
- Existing artifacts, constraints, and known risks
- Acceptance criteria, verification path, and approvals when already provided

## Procedure

1. Read the incoming request.
2. Identify whether it is a bug, feature, refactor, research task, documentation task, operational task, or unclear ask.
3. Check whether the request has enough context, acceptance criteria, risk boundaries, and verification path.
4. Classify into one state: `needs-discovery`, `needs-info`, `ready-for-story`, `ready-for-human`, `ready-for-agent`, `blocked`, or `out-of-scope`.
5. Recommend the next AI-PhellOS workflow step.
6. Ask at most one high-leverage clarification question when needed.
7. Avoid turning unclear work into fake-ready stories.

## Triage states

- `needs-discovery`: the work is real, but the problem, context, or system impact is still too unclear.
- `needs-info`: the request is directionally clear, but one missing fact blocks safe planning or execution.
- `ready-for-story`: the request is clear enough to convert into a bounded, reviewable story.
- `ready-for-human`: a human decision, approval, or credential boundary must be satisfied before agent execution.
- `ready-for-agent`: the request is already bounded enough for the next safe agent workflow step.
- `blocked`: an external dependency, missing artifact, or unresolved conflict prevents progress.
- `out-of-scope`: the request does not belong in the current repo, phase, or approved workstream.

## Triage output format

```markdown
# Intake Triage Result

## Request summary

## Classification

## Reason

## Missing information

## Risk level

## Suggested next workflow

## Suggested agents/skills

## Human checkpoint needed

## Do not proceed until
```

## Stop conditions

- The request cannot be classified without inventing missing context.
- The next step would require product, architecture, legal, or operational judgment not provided.
- The request is really multiple unrelated asks and should be split first.
- The triage result would pretend unclear work is agent-ready.

## Escalation conditions

- The request touches auth, billing, permissions, legal/compliance, production data, destructive migrations, secrets, or external credentials.
- The repo or workflow target appears wrong.
- The request conflicts with existing specs, decision logs, or approved scope.
- The work is operationally risky enough that `ready-for-human` is the only safe classification.

## Important rules

- Do not implement during triage.
- Do not convert unclear requests into fake-ready stories.
- Prefer one high-leverage clarification question when needed.
- If the request touches auth, billing, permissions, legal/compliance, production data, destructive migrations, secrets, or external credentials, classify as HITL or `ready-for-human` unless all safeguards are explicit.
