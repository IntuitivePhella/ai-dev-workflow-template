# Skill: Impact Analysis

Identify what a change affects before implementation.

## Procedure

1. Read the story, feature brief, or bug report.
2. Identify likely files, modules, routes, APIs, database/schema areas, tests, and configs affected.
3. Identify files or areas that must remain untouched.
4. Identify sensitive areas and human approval requirements.
5. Identify automated and manual verification paths.
6. Identify release and rollback implications.
7. Identify domain language impact: new, renamed, ambiguous, or glossary-backed terms.
8. Identify whether uncertainty is high enough that a prototype is safer than immediate architecture/story work.
9. Identify architecture-deepening opportunities if the change exposes shallow modules, bad seams, high coupling, or scattered domain rules.
10. Identify whether diagnose is needed for bugfix/regression work.
11. Identify durable decision impact: whether `DECISION_LOG.md` is enough or an ADR is warranted.
12. Identify intake readiness when request quality is unclear and work-intake-triage should run first.
13. Classify whether the story should be AFK or HITL.
14. Write or update `ai/05-execution/IMPACT_ANALYSIS.md` when the change is non-trivial.

## Output

Include:

- affected modules;
- allowed files;
- forbidden files;
- sensitive areas;
- tests required;
- domain language impact;
- prototype recommended: yes/no;
- diagnose needed: yes/no;
- architecture-deepening opportunities;
- durable decision impact: none | DECISION_LOG | ADR;
- intake readiness: ready | triage first;
- execution mode: AFK or HITL;
- risks;
- rollback considerations;
- recommendation: proceed, revise, split, or block.
