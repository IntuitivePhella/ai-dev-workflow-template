# Squad Levels

Squad levels control token/time cost.

Default to the smallest level that safely handles the task.

## Level 0 — Solo

```text
Orchestrator only
```

Use for:

- simple questions;
- small documentation changes;
- minor non-risky edits;
- repo navigation;
- creating or updating a single lightweight artifact.

## Level 1 — Pair

```text
Orchestrator + 1 specialist
```

Use for:

- small bugfixes;
- focused QA review;
- focused architecture review;
- focused product clarification;
- low-risk changes.

## Level 2 — Mini Squad

```text
Orchestrator + 2-3 specialists
```

Use for:

- medium features;
- non-trivial bugfixes;
- refactors;
- integration work;
- test strategy;
- changes with moderate regression risk.

## Level 3 — Full Squad

```text
Orchestrator + Product + Architect + Implementer + QA + Reviewer + Security/Release as needed
```

Use for:

- new projects;
- critical features;
- multi-module changes;
- auth, billing, permissions, user data, or infrastructure work;
- major releases.

Also use Level 3 for sensitive product domains, including:

- healthcare or elder care;
- surveillance, cameras, video, audio, biometrics, or monitoring of people;
- physical safety alerts or emergency-like workflows;
- vulnerable populations;
- legal/compliance-heavy workflows;
- products where mistakes may affect safety, privacy, dignity, or access to care.

## Budget rules

- Do not use Full Squad by default.
- Do not let every agent read the full repository.
- Each specialist receives only a compact context pack.
- Each specialist output should be concise and decision-oriented.
- Escalate one level only when risk or ambiguity justifies it.

## Recommended token budget by output

- Focused specialist review: 400-800 words.
- Architecture/product review: 800-1200 words.
- Implementation summary: 300-700 words.
- QA/security/release review: 400-1000 words.
- Orchestrator consolidation: 300-800 words.
