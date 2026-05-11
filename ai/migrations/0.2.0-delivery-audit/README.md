# Migration: 0.2.0-delivery-audit

## Overview

This migration introduces the Delivery Audit workflow — a cold, independent, and critical analysis of work that has already been completed. Unlike code review (which happens during development), a delivery audit happens after the fact to verify that promises were kept and quality standards were met.

## What This Migration Adds

### Files

1. **`ai/06-reviews/DELIVERY_AUDIT.md`**
   - Workflow documentation for conducting delivery audits
   - Audit mindset and process
   - Common findings and patterns
   - Integration with existing review workflow

2. **`ai/templates/DELIVERY_AUDIT.template.md`**
   - Structured template for audit reports
   - Verdict options (Approve, Approve with concerns, Request changes, Block)
   - Sections for evidence, gaps, critiques, and recommendations

### CLI Changes

The `scripts/aiwf.js` CLI gains:

- `aiwf audit <story-or-change-path>` — Generate cold delivery audit prompt

## When to Use Delivery Audit

- After completing a significant feature or story
- Before merging a large pull request
- When reviewing work done by autonomous agents
- As part of release readiness assessment
- When investigating quality issues in delivered work

## Audit Verdicts

| Verdict | Meaning |
|---------|---------|
| **Approve** | Ready to merge/release as-is |
| **Approve with concerns** | Can proceed, note issues for follow-up |
| **Request changes** | Must address specific issues before approval |
| **Block** | Fundamental problems require rework |

## Audit Command Usage

```bash
# Generate audit prompt for a story
aiwf audit ai/04-stories/my-feature.md

# Generate audit prompt for a change package
aiwf audit ai/04-changes/2026-05-11-my-change/
```

The command outputs a prompt for an AI agent to conduct the audit. The agent will:

1. Read the story/change and acceptance criteria
2. Review the implementation and tests
3. Check git diff for scope creep
4. Produce an audit report using the template

## Key Audit Questions

1. Did we deliver what was promised?
2. Is there evidence for each acceptance criterion?
3. Do tests actually verify the feature?
4. Were there unauthorized scope changes?
5. Are there security or architecture concerns?
6. What follow-up work is needed?

## Audit vs Code Review

| Aspect | Code Review | Delivery Audit |
|--------|-------------|----------------|
| Timing | During development | After completion |
| Focus | Implementation quality | Promise vs delivery |
| Scope | Code changes | Full feature/story |
| Mindset | Collaborative | Skeptical |
| Output | Approval/comments | Structured report |
