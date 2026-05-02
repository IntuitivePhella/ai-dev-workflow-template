# Codex Prompt Examples

## Existing project understanding

```text
Read AGENTS.md and ai/00-rules/AI_RULES.md.
Analyze the repository without editing production code.
Create or update ai/08-memory/PROJECT_MAP.md and ai/08-memory/PROJECT_MEMORY.md.
```

## New feature

```text
Read AGENTS.md, AI_RULES.md, PROJECT_MAP.md, and PROJECT_MEMORY.md.
Turn this request into ai/04-stories/story-<name>.md using ai/templates/STORY.template.md.
Do not implement yet.
```

## Execute story

```text
Execute only ai/04-stories/story-<name>.md.
Use TDD.
Do not change files outside scope unless necessary and justified.
Run tests and build.
End with Summary, Files changed, Tests run, Risks, Follow-ups.
```
