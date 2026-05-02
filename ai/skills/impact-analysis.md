# Skill: Impact Analysis

Identify what a change affects before implementation.

## Procedure

1. Read the story, feature brief, or bug report.
2. Identify likely files, modules, routes, APIs, database/schema areas, tests, and configs affected.
3. Identify files or areas that must remain untouched.
4. Identify sensitive areas and human approval requirements.
5. Identify automated and manual verification paths.
6. Identify release and rollback implications.
7. Write or update `ai/05-execution/IMPACT_ANALYSIS.md` when the change is non-trivial.

## Output

Include:

- affected modules;
- allowed files;
- forbidden files;
- sensitive areas;
- tests required;
- risks;
- rollback considerations;
- recommendation: proceed, revise, split, or block.
