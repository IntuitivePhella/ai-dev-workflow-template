# Skill: Project Mapping

Map an existing repository before making changes.

## Procedure

1. Identify package manager, framework, runtime, language, and test tools.
2. Identify entry points, routes, services, data layer, integrations, and configuration.
3. Identify commands for install, dev, test, build, typecheck, lint, and migrations.
4. Identify sensitive areas: auth, permissions, billing, user data, secrets, infra, migrations.
5. Identify conventions: naming, folder structure, testing style, API patterns, UI patterns.
6. Identify domain terms visible in code, routes, tests, API names, DB/schema names, docs, and memory artifacts.
7. Record candidate terms for `ai/08-memory/DOMAIN_GLOSSARY.md` only when they clarify domain behavior.
8. Write or update `ai/08-memory/PROJECT_MAP.md`.
9. Write durable rules, commands, and risks into `ai/08-memory/PROJECT_MEMORY.md`.

## Zoom-out context

Include:

- where this area sits in the system;
- callers/dependents;
- related workflows;
- neighboring modules;
- known seams.

## Rules

- Do not change production code during project mapping.
- Prefer targeted file reads over full-repo dumping.
- Mark unknowns explicitly.
- Stop before implementation unless a separate ready story exists.
