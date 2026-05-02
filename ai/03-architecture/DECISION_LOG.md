# Decision Log

| Date | Decision | Context | Alternatives | Trade-off |
|---|---|---|---|---|
| 2026-05-02 | Keep AIWF distribution as a Node-first CLI package with Bash scripts as compatibility fallback. | The workflow must run on Linux, macOS, and Windows, including npx/install flows. | Bash-only distribution; separate OS-specific wrappers. | Requires maintaining Node CLI plus compatibility scripts, but improves cross-platform reliability and install ergonomics. |
