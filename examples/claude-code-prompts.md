# Claude Code Prompt Examples

## Index existing repo

```text
Read CLAUDE.md and ai/00-rules/AI_RULES.md.
/sc:index-repo
/sc:load .
Create ai/08-memory/PROJECT_MAP.md.
Do not edit production code.
```

## Analyze feature impact

```text
Read the feature brief and project memory.
/sc:analyze . --focus impact
Create ai/05-execution/IMPACT_ANALYSIS.md.
Do not implement yet.
```

## Implement story

```text
Read CLAUDE.md, AI_RULES.md, PROJECT_MEMORY.md, and the current story.
Use TDD.
Implement only the current story.
Run tests/build.
Update review notes.
```
