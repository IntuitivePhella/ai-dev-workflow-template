# Delivery Audit: <title>

## Verdict

Choose one:

- [ ] **Approve** — Ready to merge/release as-is
- [ ] **Approve with concerns** — Can proceed, note issues for follow-up
- [ ] **Request changes** — Must address specific issues before approval
- [ ] **Block** — Fundamental problems require rework

**Summary**: (one sentence explaining the verdict)

---

## Evidence Reviewed

List all artifacts examined:

- [ ] Story/change request: `<path>`
- [ ] Implementation: `<files or directories>`
- [ ] Tests: `<test files>`
- [ ] Git diff: `<commit range or PR>`
- [ ] Documentation: `<docs updated>`
- [ ] Project memory: `ai/08-memory/PROJECT_MEMORY.md`
- [ ] Decision log: `ai/03-architecture/DECISION_LOG.md`

---

## What Was Promised

Summarize the original request and acceptance criteria:

### Objective

(From the story: what outcome was expected?)

### Acceptance Criteria

| # | Criterion | Met? | Evidence |
|---|-----------|------|----------|
| 1 | TBD | Yes/No/Partial | TBD |
| 2 | TBD | Yes/No/Partial | TBD |

---

## What Was Delivered

Summarize what was actually implemented:

### Changes Made

- TBD

### Files Modified

- TBD

### Tests Added/Updated

- TBD

---

## Acceptance Criteria Gaps

List criteria that were not fully met:

| Criterion | Gap | Severity | Recommendation |
|-----------|-----|----------|----------------|
| TBD | TBD | Blocker/Important/Minor | TBD |

---

## Test Critique

### Coverage Assessment

- [ ] Tests cover all acceptance criteria
- [ ] Tests cover error/edge cases
- [ ] Tests are meaningful (not just coverage padding)
- [ ] Tests run and pass

### Findings

| Finding | Severity | Location | Recommendation |
|---------|----------|----------|----------------|
| TBD | Blocker/Important/Suggestion | TBD | TBD |

---

## Architecture Critique

### Pattern Compliance

- [ ] Follows existing codebase patterns
- [ ] No undocumented architecture decisions
- [ ] No unnecessary abstractions introduced
- [ ] No coupling increased without justification

### Findings

| Finding | Severity | Location | Recommendation |
|---------|----------|----------|----------------|
| TBD | Blocker/Important/Suggestion | TBD | TBD |

---

## Security/Privacy Critique

### Security Checklist

- [ ] No secrets committed
- [ ] Input validated at system boundaries
- [ ] Auth/authz checks present where needed
- [ ] No sensitive data exposed in logs/errors
- [ ] No SQL injection, XSS, or OWASP top 10 vulnerabilities

### Findings

| Finding | Severity | Location | Recommendation |
|---------|----------|----------|----------------|
| TBD | Blocker/Important/Suggestion | TBD | TBD |

---

## Scope Creep

### Out-of-Scope Changes

List any changes that were not part of the original request:

| Change | Justification | Acceptable? |
|--------|---------------|-------------|
| TBD | TBD | Yes/No |

### Missing In-Scope Items

List any requested items that were not delivered:

| Item | Reason | Impact |
|------|--------|--------|
| TBD | TBD | TBD |

---

## Regression Risks

### Areas at Risk

| Area | Risk | Mitigation |
|------|------|------------|
| TBD | TBD | TBD |

### Rollback Path

- [ ] Rollback plan documented
- [ ] Rollback tested or clearly reversible
- [ ] No destructive migrations without backup

---

## Required Fixes

Issues that MUST be addressed before approval:

1. TBD

---

## Suggested Improvements

Issues that SHOULD be addressed but can be follow-ups:

1. TBD

---

## Follow-Up Stories

New work items discovered during audit:

| Title | Priority | Rationale |
|-------|----------|-----------|
| TBD | High/Medium/Low | TBD |

---

## Auditor Notes

(Any additional observations, context, or recommendations)

---

**Auditor**: (name or agent identifier)
**Date**: (audit date)
**Story/Change**: (path to audited artifact)
