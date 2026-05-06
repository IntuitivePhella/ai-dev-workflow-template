# Decision Log

Record durable architecture, product, data model, API, dependency, and infrastructure decisions here.

Do not use this file for temporary implementation notes. If no decisions have been made yet, keep the log empty below this line.

| Date | Decision | Context | Alternatives | Trade-off |
|---|---|---|---|---|
| 2026-05-02 | Keep AIWF distribution as a Node-first CLI package with Bash scripts as compatibility fallback. | The workflow must run on Linux, macOS, and Windows, including npx/install flows. | Bash-only distribution; separate OS-specific wrappers. | Requires maintaining Node CLI plus compatibility scripts, but improves cross-platform reliability and install ergonomics. |
| 2026-05-06 | Add `ai/11-specs/` for durable behavioral specs and optional `ai/04-changes/` change packages for larger proposed behavior changes. | OpenSpec-inspired improvements need a behavioral source of truth without replacing AI-PhellOS stories, gates, and squad routing. | Store all behavior only in PRDs/stories; require change packages for every change. | Adds a small artifact model, but keeps simple stories as the default and reserves change packages for broad or behavior-contracting work. |
| 2026-05-06 | Keep project configuration optional and repository-local at `ai/config.yaml`. | Projects may need custom spec/change paths and command guidance, but AI-PhellOS must remain markdown-first and usable without setup. | Mandatory config; user/global config directories; full schema engine. | Adds a small config reader and template while preserving defaults and avoiding dependency or global-state complexity. |
