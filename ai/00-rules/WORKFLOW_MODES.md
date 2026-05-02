# Workflow Modes

Use the smallest workflow mode that fits the job.

## Mode 1 — New Project

Use when starting from an idea or empty repository.

Sequence:

1. Project brief
2. Discovery
3. PRD
4. Architecture
5. Epics/stories
6. Story-by-story implementation
7. Review
8. Release
9. Memory update

Required artifacts:

- `ai/01-discovery/PROJECT_BRIEF.md`
- `ai/01-discovery/DISCOVERY.md`
- `ai/02-product/PRD.md`
- `ai/03-architecture/ARCHITECTURE.md`
- stories under `ai/04-stories/`

## Mode 2 — Existing Project Understanding

Use before changing a repository the agent does not know well.

Sequence:

1. Read rules and memory
2. Map repository structure
3. Identify stack, commands, entry points, tests, risks
4. Update project memory
5. Stop before coding

Required artifacts:

- `ai/08-memory/PROJECT_MAP.md`
- `ai/08-memory/PROJECT_MEMORY.md`

## Mode 3 — New Feature in Existing Project

Use for meaningful product or technical features.

Sequence:

1. Feature brief
2. Impact analysis
3. Test plan
4. Story
5. TDD execution
6. Review
7. Release notes if needed
8. Memory update

Required artifacts:

- `ai/02-product/FEATURE_BRIEF.md` or a feature brief in the story
- `ai/05-execution/IMPACT_ANALYSIS.md`
- `ai/05-execution/TEST_PLAN.md`
- story under `ai/04-stories/`

## Mode 4 — Bugfix

Use when behavior is wrong and expected behavior is known.

Sequence:

1. Reproduction steps
2. Failing test
3. Minimal fix
4. Regression test
5. Review
6. Memory update if the bug reveals a project rule

Required artifacts:

- bug report or issue
- failing test or documented reproduction
- story only if the bug is non-trivial

## Mode 5 — Refactor

Use only when improving structure without changing behavior.

Sequence:

1. State current behavior
2. Identify safety tests
3. Define allowed files
4. Refactor mechanically
5. Run tests
6. Review diff for behavior changes

Rules:

- No product behavior change.
- No opportunistic rewrite.
- No dependency swap unless approved.

## Mode 6 — Autonomous Phase

Use only for bounded automation.

Sequence:

1. Create `AUTONOMOUS_PHASE_CONTRACT.md`
2. Confirm allowed and forbidden files
3. Confirm test/build commands
4. Run one phase only
5. Stop on any stop condition
6. Produce final report

Required artifact:

- `ai/05-execution/AUTONOMOUS_PHASE_CONTRACT.md`

Never use autonomous mode for billing, auth, permissions, destructive migrations, secrets, production deploy, user data, legal/compliance, or paid external APIs without human approval.
