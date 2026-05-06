# Skill: Publish Approved Work

Use this skill when a story, bugfix, refactor, migration, or autonomous phase has been fully executed and the user asks to publish, commit, push, open a PR, or create a branch for the completed work.

Do not use this skill to publish incomplete work, bypass review, force-push, merge, deploy, or make remote changes without explicit human approval.

## Preconditions

Before proposing publication, confirm:

1. A story, bug report, refactor brief, migration brief, or autonomous phase contract exists.
2. Acceptance criteria are checked one by one.
3. Relevant tests, build, typecheck, lint, and workflow gates passed or unavailable commands are explicitly documented.
4. Review against `ai/00-rules/QUALITY_GATES.md` and `ai/06-reviews/REVIEW_CHECKLIST.md` is complete.
5. Memory, decision log, release notes, and `ai/08-memory/SESSION_STATE.md` are updated when required.
6. Sensitive areas have explicit human approval when applicable.
7. The working tree contains only changes that belong to the approved story or phase.
8. Story artifacts included in the publication are durable project content, not transient local coordination notes.
9. When publishing AI-PhellOS framework changes, one-off execution plans, local context packs, transient handoffs, and intermediate review packets are excluded unless explicitly approved as durable framework assets.

## Stop Conditions

Stop and report instead of publishing when:

- the user has not explicitly approved branch creation, commit, push, and PR creation;
- tests or gates are failing without documented approval;
- the diff includes unrelated changes, forbidden files, secrets, credentials, production data, or local environment files;
- the diff includes transient story, session, or coordination artifacts that the user has not explicitly approved as durable project content;
- the AI-PhellOS framework diff includes local improvement-planning artifacts outside `ai/_local/` without explicit approval to publish them;
- sensitive areas are touched without explicit approval;
- branch naming, commit message, target remote, target base branch, or PR scope is unclear;
- the current branch contains unreviewed work from another story;
- the publication would require force-push, merge, deployment, or destructive operations.

## Preflight Procedure

1. Read `ai/00-rules/GIT_WORKFLOW.md`.
2. Read the active story or phase artifact.
3. Read `ai/08-memory/SESSION_STATE.md`, if present.
4. Run or inspect:
   - `git status --short --branch`
   - `git diff --stat`
   - `git diff --name-only`
   - relevant tests and gates from the story
5. Identify:
   - current branch;
   - base branch, usually `main`;
   - remote, usually `origin`;
   - proposed branch name;
   - proposed commit message;
   - exact files to stage;
   - PR title and body.
6. Classify story, session, and coordination artifacts as either durable project content or local process residue before staging them.
7. For AI-PhellOS self-improvement work, confirm any files under planning, handoff, or session paths are either required framework assets or excluded from staging.

## Approval Request

Before any Git write or remote write, ask for explicit approval with this information:

```text
Publication approval request:
- Base branch:
- New/current branch:
- Files to stage:
- Story/session/coordination artifacts included or excluded and why:
- Local planning artifacts removed/ignored:
- Commit message:
- Commands to run:
- PR title:
- PR target:
- Risks:
```

Do not proceed until the user approves the publication action. Approval to review the diff is not approval to commit, push, or open a PR.

## Publication Procedure

After approval:

1. Create or switch to the story branch using `ai/<story-id>-<short-slug>` when a new branch is needed.
2. Stage only approved files.
3. Commit with a concise conventional message that matches the story.
4. Push the branch to the approved remote.
5. Open a pull request against the approved base branch.
6. Fill the PR body with the sections required by `ai/00-rules/GIT_WORKFLOW.md`:
   - Summary
   - Story / artifact
   - Workflow mode
   - Squad level
   - Files changed
   - Acceptance criteria
   - Tests run
   - Quality gates
   - Security / sensitive areas
   - Rollback plan
   - Risks and follow-ups
7. Update `ai/08-memory/SESSION_STATE.md` with branch, commit, PR URL, tests, risks, and next step.

## Output

After publication, report:

```text
Publication result:
- Branch:
- Commit:
- PR:
- Files staged:
- Tests/gates:
- Risks:
- Next step:
```

If publication was blocked, report the blocking reason and the smallest safe next action.
