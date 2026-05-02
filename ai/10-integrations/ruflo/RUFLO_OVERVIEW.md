# Ruflo Integration Overview

Ruflo is an optional execution adapter for AI-PhellOS.

AI-PhellOS remains the source of truth for intent routing, workflow mode selection, readiness, quality gates, scope control, review, release, and durable memory.

Ruflo may be used when available to accelerate bounded execution in Claude Code through swarms, workers, memory, test generation, review, documentation, and controlled autonomous phases.

## Core Positioning

```text
AI-PhellOS decides what should be done, why it should be done, and under which constraints.
Ruflo helps execute an already-approved bounded phase.
```

Ruflo is not required to use AI-PhellOS.

AI-PhellOS must remain portable across Codex, Claude Code, and generic coding agents. Ruflo support must therefore be treated as an optional integration layer, not as a framework dependency.

## Recommended Architecture

```text
User request
  -> AI-PhellOS Intent Router
  -> Workflow Mode
  -> Squad Level
  -> Required Artifacts
  -> Quality Gates
  -> Story or Autonomous Phase Contract
  -> Ruflo Execution Adapter, if available and appropriate
  -> Verification
  -> Review
  -> Release notes
  -> Memory / Decision Log update
```

## When Ruflo Is Useful

Use Ruflo when the work is already bounded and benefits from multi-agent or automated execution:

- mapping an existing repository;
- executing a ready story with tests;
- reproducing and fixing a bug;
- generating or strengthening tests;
- running browser checks;
- reviewing diffs for risk;
- updating docs after a completed change;
- performing security-oriented review;
- executing a limited autonomous phase.

## When Ruflo Should Not Be Used

Do not use Ruflo for open-ended product direction, unconstrained app generation, sensitive changes without approval, or work that has not passed AI-PhellOS readiness gates.

Ruflo must never be used as a replacement for:

- product clarification;
- architecture decisions;
- human approval for sensitive areas;
- Definition of Ready;
- Quality Gates;
- final review.

## Golden Rule

```text
Never ask Ruflo to build the app.
Ask Ruflo to execute one approved story or one approved autonomous phase.
```
