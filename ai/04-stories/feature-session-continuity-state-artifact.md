# Story: Add mandatory session continuity state artifact

## Type

Feature

## Workflow mode

- [x] New feature in existing project

## Squad level

- [x] Level 1 - Pair

## Objective

Strengthen cross-session continuity by adding a mandatory, explicit session state artifact and integrating it into execution and quality gates.

## Scope

- Add `ai/08-memory/SESSION_STATE.md`.
- Reference session-state continuity from execution, quality, and memory artifacts.

## Out of scope

- CLI enforcement automation.
- Changes to specialist agent behavior outside continuity documentation.

## Acceptance criteria

- [x] A session continuity artifact exists at `ai/08-memory/SESSION_STATE.md`.
- [x] Execution protocol instructs agents to read and update the session artifact.
- [x] Quality gates include checks for reading/updating session continuity state.
- [x] Project memory references the continuity artifact as source of truth for current phase/next step.

## Tests required

- [x] Text search verification for `SESSION_STATE` references.

## Commands to run

```bash
rg -n "SESSION_STATE" ai/05-execution/EXECUTION_PROTOCOL.md ai/00-rules/QUALITY_GATES.md ai/08-memory/PROJECT_MEMORY.md
```

## Rollback plan

- Revert the story commit that introduced the session continuity artifact.

## Risks

- Agents may still skip session-state updates until CLI enforcement exists.
- Placeholder session state should be updated with concrete session details during active work.

## Definition of done

- [x] Session-state artifact exists.
- [x] Execution and quality documentation reference session continuity.
- [x] Verification command documented.

## Historical verification

- `rg -n "SESSION_STATE" ai/05-execution/EXECUTION_PROTOCOL.md ai/00-rules/QUALITY_GATES.md ai/08-memory/PROJECT_MEMORY.md`
