# Deferred Roadmap

This file documents improvements intentionally left for later.

The goal is to keep the workflow robust without making the first version heavy, brittle, or dependent on external runtimes.

## Deferred item 1 — Multi-IDE agent sync

### What it is

Generate or copy agent definitions into IDE/tool-specific locations, such as:

```text
.codex/agents/
.claude/commands/agents/
.cursor/rules/agents/
.gemini/rules/agents/
```

Potential scripts:

```text
scripts/sync-agents.sh
scripts/sync-agents.ps1
scripts/check-agent-sync.sh
```

### Why it is deferred

- It duplicates agent definitions across multiple folders.
- It creates maintenance overhead when an agent changes.
- Tool-specific formats may evolve.
- The current markdown-first structure already works with Codex and Claude Code.
- Sync should be added only after the core agent/squad definitions stabilize.

### When to implement

Implement when the repo is actively used across multiple IDEs/CLIs and manual agent loading becomes friction.

## Deferred item 2 — Parallel execution with worktrees

### What it is

A protocol for running multiple agents in isolated branches/worktrees, inspired by Claude Squad-style workflows.

Potential files:

```text
ai/parallel/PARALLEL_EXECUTION.md
ai/parallel/WORKTREE_PROTOCOL.md
ai/parallel/MERGE_PROTOCOL.md
```

### Why it is deferred

- Parallel execution increases complexity and merge risk.
- It requires stronger file ownership rules.
- It can create conflicting changes if introduced too early.
- Most teams should first validate single-story execution discipline.
- Worktree automation may be platform-specific.

### When to implement

Implement after the workflow is stable for sequential story execution and there is a clear need for parallel feature, QA, or refactor work.

## Deferred item 3 — Runtime dependency on external squad frameworks

### What it is

Integrating directly with frameworks such as Agent Squad, AIOX, Claude Squad, or other multi-agent runtimes.

### Why it is deferred

- The repo should remain portable and markdown-first.
- External runtimes introduce dependency, setup, versioning, and compatibility concerns.
- The current goal is to extract useful patterns, not depend on specific frameworks.
- Codex and Claude Code can already use the workflow without additional runtime setup.

### When to implement

Implement only if a specific runtime becomes necessary for repeated production usage and its benefits outweigh setup and maintenance cost.

## Deferred item 4 — Automated Orchestrator classifier

### What it is

A script or tool that reads the task and automatically selects workflow mode, risk level, squad, and context packs.

Potential files:

```text
scripts/classify-task.ts
scripts/classify-task.py
```

### Why it is deferred

- Classification can currently be handled by the Orchestrator instructions.
- A premature classifier could encode bad heuristics.
- Real-world usage should inform the classification logic first.
- Manual classification keeps the workflow transparent during early adoption.

### When to implement

Implement after collecting enough orchestration logs to identify stable patterns.

## Deferred item 5 — Agent/squad test harness

### What it is

A validation harness that checks agent definitions, squad YAML files, required fields, and broken references.

Potential files:

```text
scripts/validate-workflow.py
scripts/validate-squads.py
.github/workflows/validate-workflow.yml
```

### Why it is deferred

- The schema is still evolving.
- A test harness is useful only after the file structure stabilizes.
- The current repo is small enough for manual review.

### When to implement

Implement once the workflow starts being reused across multiple projects.

## Deferred item 6 — Persistent orchestration database

### What it is

Storing orchestration decisions, agent outputs, and memory in a structured database or vector store.

### Why it is deferred

- Markdown files are easier to inspect, review, version, and edit.
- A database adds setup and migration burden.
- The current goal is Git-native durability.
- Search can be added later without changing the workflow contract.

### When to implement

Implement if orchestration logs and memory files become too large to manage with Git and text search.

## Deferred item 7 — Large library of domain-specific squads

### What it is

Adding many specialized squads such as Brand, Copy, Data, Cybersecurity, Growth, Advisory Board, C-Level, Traffic, Design, etc.

### Why it is deferred

- The current repo is focused on software understanding, improvement, features, bugfixes, refactors, and new project creation.
- Too many squads increase choice overload and token overhead.
- Domain-specific squads should be added only when real project needs justify them.

### When to implement

Implement as optional packs, not as default core workflow.

## Current priority

The current priority is to keep the workflow:

```text
Spec-driven.
Test-enforced.
Specialist-routed.
Review-gated.
Automation-bounded.
Markdown-first.
Runtime-optional.
```

These deferred items should be revisited after several real project runs and orchestration logs provide evidence of recurring needs.
