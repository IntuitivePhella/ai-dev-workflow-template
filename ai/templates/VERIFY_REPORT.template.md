# Verify Report: <change title>

Use this report before completing a change package. It is a structured review aid, not proof that the implementation matches every requirement.

## Change package

- Path: `ai/04-changes/<change-id>`
- Reviewer: TBD
- Date: TBD

## Completeness

- [ ] Proposal exists and matches the intended change.
- [ ] Tasks are complete or explicitly deferred with a reason.
- [ ] Spec deltas are present when durable behavior changed.
- [ ] Design notes are present, or omission is justified as not applicable.

## Correctness

- [ ] Change package validation passes.
- [ ] Spec deltas validate when present.
- [ ] Required tests and quality gates have passed.
- [ ] Report limitations are understood.

## Coherence

- [ ] Proposal, tasks, specs, and implementation tell the same story.
- [ ] Accepted behavior has been synced to durable specs when required.
- [ ] Risks, rollback, and follow-ups are documented.

## Findings

### Critical

- TBD

### Warnings

- TBD

### Notes

- This report checks artifact completeness, structural correctness, and review coherence. It does not replace human review or prove code-to-requirement equivalence.

## Result

- [ ] Pass
- [ ] Pass with warnings
- [ ] Fail
