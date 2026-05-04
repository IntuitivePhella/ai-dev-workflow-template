# Story: Add mandatory session continuity state artifact

## Type

Feature

## Objective

Strengthen cross-session continuity by adding a mandatory, explicit session state artifact and integrating it into execution and quality gates.

## Acceptance criteria

- [x] A session continuity artifact exists at `ai/08-memory/SESSION_STATE.md`.
- [x] Execution protocol instructs agents to read and update the session artifact.
- [x] Quality gates include checks for reading/updating session continuity state.
- [x] Project memory references the continuity artifact as source of truth for current phase/next step.

## Non-goals

- CLI enforcement automation.
- Changes to specialist agent behavior outside continuity documentation.

## Verification commands

- `rg -n "SESSION_STATE" ai/05-execution/EXECUTION_PROTOCOL.md ai/00-rules/QUALITY_GATES.md ai/08-memory/PROJECT_MEMORY.md`
