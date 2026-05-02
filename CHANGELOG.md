# Changelog

All notable changes to AI-PhellOS will be documented in this file.

This project follows semantic versioning while it matures toward a stable public release.

## [0.1.0] - 2026-05-02

### Added

- Markdown-first AI development operating system for Codex, Claude Code, and generic coding agents.
- Tool-agnostic entrypoint via `AGENTS.md`.
- Claude Code-specific entrypoint via `CLAUDE.md`.
- Intent Router for classifying user intent, project state, maturity, workflow mode, squad level, and first safe action.
- Workflow modes for new projects, existing project understanding, feature work, bugfixes, refactors, and bounded autonomous phases.
- Quality Gates and Definition of Ready to prevent unsafe implementation.
- Specialist squad model with Orchestrator, Product, Architect, Implementer, QA, Security, Reviewer, and Release roles.
- Cross-platform Node CLI exposed as `aiwf`.
- CLI commands for install, init, story creation, story validation, gate checks, sensitive path scans, review readiness, and doctor checks.
- Optional Ruflo execution-adapter documentation and templates for bounded Claude Code phases.
- Story templates for features, bugfixes, refactors, migrations, generic stories, brainstorming, and Ruflo execution contracts.

### Changed

- Renamed product branding to AI-PhellOS across the public README.
- Clarified that users should describe the work they want done, not the coding tool they want used.
- Clarified that Claude Code and Codex execution environments should be inferred from the current tool.

### Security

- Added explicit sensitive-area approval rules for billing, authentication, authorization, secrets, production infrastructure, user data, paid APIs, legal/compliance behavior, and destructive migrations.
- Added CLI-sensitive path scanning for changed files.
