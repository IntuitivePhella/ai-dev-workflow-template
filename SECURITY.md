# Security Policy

AI-PhellOS is a workflow and governance layer for AI-assisted software development. Its security posture is based on preventing unsafe agent behavior before implementation starts.

## Supported Versions

AI-PhellOS is currently pre-1.0. Security fixes will be applied to the latest published version and the `main` branch.

| Version | Supported |
| --- | --- |
| 0.1.x | Yes |

## Reporting a Vulnerability

Please report security issues privately instead of opening a public issue when the report includes exploitable details.

A useful report includes:

- affected file or workflow;
- expected safe behavior;
- actual unsafe behavior;
- reproduction steps;
- impact;
- suggested mitigation, if known.

## Sensitive Areas

AI-PhellOS treats the following as sensitive and requiring explicit human approval before implementation:

- billing and payments;
- authentication;
- authorization and permissions;
- secrets and environment variables;
- production infrastructure;
- data deletion;
- user personal data;
- email, SMS, or WhatsApp sending;
- paid external APIs;
- legal or compliance behavior;
- destructive migrations.

## Agent Safety Expectations

Agents operating under AI-PhellOS must stop when:

- sensitive approval is missing;
- product behavior requires human judgment;
- the requested change conflicts with architecture or project memory;
- tests cannot pass after two serious attempts;
- scope grows beyond the current story or contract;
- rollback becomes unclear;
- production resources or external paid services are required without approval.

## CLI Sensitive Scan

The CLI includes a conservative sensitive path scan:

```bash
node scripts/aiwf.js sensitive HEAD~1 HEAD
```

This scan is a guardrail, not a complete security audit. It should be combined with human review, tests, and AI-PhellOS Quality Gates.

## Optional Adapter Security

Optional execution adapters such as Ruflo must never override AI-PhellOS authority over:

- intent routing;
- Definition of Ready;
- quality gates;
- scope control;
- sensitive-area approval;
- final review;
- release readiness;
- project memory updates.

If an adapter cannot operate within an approved story or autonomous phase contract, it must not be used for execution.
