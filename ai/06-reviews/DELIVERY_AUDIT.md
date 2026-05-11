# Delivery Audit

A Delivery Audit is a cold, independent, and critical analysis of work that has already been completed. Unlike code review (which happens during development), a delivery audit happens after the fact to verify that promises were kept and quality standards were met.

## When to Use

- After completing a significant feature or story
- Before merging a large pull request
- When reviewing work done by autonomous agents
- As part of release readiness assessment
- When investigating quality issues in delivered work

## Audit Mindset

The auditor must:

1. **Not defend the implementation** — Approach with skepticism, not advocacy.
2. **Demand evidence** — Claims without proof are findings.
3. **Question completeness** — What was left out? What was glossed over?
4. **Check the edges** — Error handling, edge cases, security boundaries.
5. **Verify, don't trust** — Run the tests. Check the behavior. Read the code.

## Audit Process

### 1. Gather Evidence

Read these artifacts before forming conclusions:

- The original story or change request
- Acceptance criteria and definition of done
- The implementation (code, tests, documentation)
- Git history and commit messages
- Any related PRD, architecture, or design documents
- Project memory and decision log
- Test results and coverage reports

### 2. Compare Promise vs Delivery

For each acceptance criterion:

- Was it addressed?
- Was it addressed correctly?
- Was it addressed completely?
- Is there evidence (test, documentation, demo)?

### 3. Evaluate Quality Dimensions

| Dimension | Questions to Ask |
|-----------|------------------|
| **Correctness** | Does it work? Does it handle edge cases? |
| **Tests** | Are tests meaningful? Do they cover acceptance criteria? |
| **Security** | Any auth/authz weaknesses? Data exposure? Input validation? |
| **Architecture** | Does it fit existing patterns? Any drift or violations? |
| **Scope** | Was anything added that wasn't requested? Removed? |
| **Documentation** | Is the change documented? Memory updated? |
| **Regressions** | Could this break existing functionality? |

### 4. Classify Findings

| Category | Definition | Action |
|----------|------------|--------|
| **Blocker** | Must fix before merge/release | Request changes |
| **Important** | Should fix, but can be follow-up | Note in review |
| **Suggestion** | Nice to have, optional | Mention for consideration |

### 5. Render Verdict

| Verdict | Meaning |
|---------|---------|
| **Approve** | Ready to merge/release as-is |
| **Approve with concerns** | Can proceed, but note issues for follow-up |
| **Request changes** | Must address specific issues before approval |
| **Block** | Fundamental problems require rework |

## Audit Output

Use the template at `ai/templates/DELIVERY_AUDIT.template.md` to document findings.

The audit report should be:

- **Factual** — State what you observed, not what you assume.
- **Specific** — Reference files, lines, tests, criteria by name.
- **Actionable** — For each finding, state what should be done.
- **Prioritized** — Distinguish blockers from suggestions.

## Running an Audit

### Via CLI

```bash
aiwf audit <story-or-change-path>
```

This generates a prompt for an AI agent to conduct the audit. The agent will:

1. Read the story/change and acceptance criteria
2. Review the implementation and tests
3. Check git diff for scope creep
4. Produce an audit report

### Manual Audit

1. Read the story file completely
2. Run all tests and verify they pass
3. Review the code changes
4. Check each acceptance criterion
5. Fill out the audit template
6. Assign a verdict

## Common Audit Findings

### Acceptance Criteria

- Criterion marked done but no evidence
- Criterion interpreted too narrowly
- Criterion addressed but edge cases missing

### Tests

- Tests pass but don't actually test the feature
- Happy path only, no error cases
- Mocked too aggressively, hiding real behavior

### Scope

- Opportunistic refactors mixed with feature work
- Dependencies updated without justification
- Files modified outside declared scope

### Security

- Input not validated at system boundary
- Auth checks missing or bypassable
- Sensitive data logged or exposed

### Architecture

- Pattern violated without documented decision
- Abstraction introduced prematurely
- Coupling increased unnecessarily

## Integration with Review Workflow

The Delivery Audit complements but does not replace:

- **Code Review** — Happens during development, focuses on implementation quality
- **QA Testing** — Verifies functional correctness through execution
- **Security Review** — Deep dive into security-sensitive changes

A delivery audit is broader and more skeptical than code review. It asks "Did we deliver what we promised?" rather than "Is this code well-written?"

## Audit Frequency

- **Always** for autonomous agent work
- **Always** for security-sensitive changes
- **Recommended** for features touching multiple systems
- **Optional** for small, well-tested changes with human oversight
