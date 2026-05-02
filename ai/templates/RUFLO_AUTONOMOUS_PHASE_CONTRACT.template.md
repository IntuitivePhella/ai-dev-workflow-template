# Ruflo Autonomous Phase Contract: <title>

Use this contract only when a phase is safe, bounded, and ready for Ruflo-assisted autonomous execution.

Ruflo is an execution adapter. AI-PhellOS remains responsible for routing, gates, review, release, and memory.

## Objective

What exactly should Ruflo complete in this autonomous phase?

## AI-PhellOS Context

- Workflow mode: Mode 6 — Autonomous Phase
- Related story / task:
- Squad level:
- Project memory read: yes / no
- Project map read or created: yes / no
- Human approval needed: yes / no
- Human approval recorded: yes / no / not applicable

## Ruflo Capabilities Allowed

- [ ] swarm coordination
- [ ] autonomous loop
- [ ] test generation
- [ ] browser checks
- [ ] diff review
- [ ] documentation update
- [ ] security review
- [ ] memory support
- [ ] other: TBD

## Preconditions

- [ ] AI-PhellOS rules read
- [ ] Ruflo policy read
- [ ] Project memory read
- [ ] Project map read or created
- [ ] Story or task is ready
- [ ] Acceptance criteria are testable
- [ ] Non-goals are explicit
- [ ] Required commands are known
- [ ] Human approval recorded if sensitive areas are touched

## Allowed Files and Directories

- TBD

## Forbidden Files and Directories

- TBD

## Forbidden Work

- [ ] No billing changes
- [ ] No auth or permission weakening
- [ ] No destructive migrations
- [ ] No production deploy
- [ ] No secrets or env changes
- [ ] No paid external API calls
- [ ] No user data deletion
- [ ] No unrelated refactors
- [ ] No dependency additions unless explicitly approved

## Required Commands

```bash
# tests
TBD

# build/typecheck/lint
TBD
```

## Max Iterations

Maximum autonomous loops allowed: TBD

An iteration means:

```text
inspect result -> make one bounded change -> run verification -> decide continue or stop
```

## Max Change Budget

- Max files changed: TBD
- Max approximate lines changed: TBD
- Max dependencies added: 0 unless explicitly approved

## Acceptance Criteria

- [ ] TBD

## Completion Criteria

- [ ] Objective complete
- [ ] Acceptance criteria satisfied
- [ ] Required commands pass
- [ ] No forbidden files touched
- [ ] No forbidden work performed
- [ ] Risks documented
- [ ] Ruflo execution report completed
- [ ] Memory / decision log updates proposed if needed

## Stop Immediately If

- tests fail after two serious attempts;
- scope expands beyond this phase;
- a forbidden area needs modification;
- a sensitive area needs approval;
- requirements conflict with project memory or architecture;
- a new dependency, migration, or architecture change is needed;
- rollback becomes unclear;
- production resources or external services are required;
- max iteration or change budget is reached.

## Rollback Plan

How can this autonomous phase be safely reverted?

## Final Report Required

Use:

```text
ai/10-integrations/ruflo/RUFLO_REPORT.template.md
```
