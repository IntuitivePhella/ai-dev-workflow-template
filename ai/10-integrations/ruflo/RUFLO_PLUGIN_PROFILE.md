# Ruflo Plugin Profile

This profile describes recommended Ruflo capabilities for AI-PhellOS projects.

Exact installation commands may change as Ruflo evolves. Treat this file as a capability profile rather than a hard dependency manifest.

## Baseline Profile

Use this for most AI-PhellOS projects that want Claude Code acceleration with Ruflo.

Recommended capabilities:

- core orchestration;
- swarm coordination;
- workflow templates;
- persistent agent memory;
- retrieval-augmented project memory;
- test generation;
- browser or end-to-end verification;
- diff and change-risk review;
- documentation generation;
- security review;
- AI-output safety review;
- architecture decision record support;
- cost or token tracking.

## Suggested Ruflo Plugins

```text
ruflo-core
ruflo-swarm
ruflo-workflows
ruflo-agentdb
ruflo-rag-memory
ruflo-testgen
ruflo-browser
ruflo-jujutsu
ruflo-docs
ruflo-security-audit
ruflo-aidefence
ruflo-adr
ruflo-cost-tracker
```

## Optional Advanced Plugins

Use only after the baseline profile is stable:

```text
ruflo-autopilot
ruflo-goals
ruflo-federation
ruflo-migrations
ruflo-observability
```

## Capability Selection by Task

| Task Type | Recommended Capabilities |
| --- | --- |
| Existing repo understanding | swarm, memory, docs |
| New feature | workflows, testgen, browser, jujutsu |
| Bugfix | testgen, jujutsu, memory |
| Refactor | jujutsu, testgen, docs |
| Security-sensitive review | security-audit, aidefence |
| Autonomous phase | autopilot, workflows, testgen, jujutsu, cost tracking |
| Architecture decision | adr, memory, docs |

## Default Policy

Do not enable autonomous plugins by default.

Autonomous execution requires an approved AI-PhellOS autonomous phase contract.

## Codex Compatibility Note

Ruflo is primarily useful as a Claude Code execution adapter. AI-PhellOS must continue to work in Codex without Ruflo.

For Codex, use this profile as a conceptual map only unless Ruflo CLI or MCP integration is explicitly available in the environment.
