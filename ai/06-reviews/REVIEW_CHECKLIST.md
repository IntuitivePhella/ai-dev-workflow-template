# Review Checklist

## Product

- [ ] Solves the stated problem
- [ ] Does not introduce hidden scope
- [ ] Acceptance criteria satisfied

## Engineering

- [ ] Small, coherent changes
- [ ] Follows existing conventions
- [ ] No opportunistic refactor
- [ ] Architecture decision logged if changed

## Tests

- [ ] Relevant tests added/updated
- [ ] Tests fail for the right reason before implementation when possible
- [ ] Test suite passes
- [ ] Build passes
- [ ] `aiwf verify <change-package>` run for change packages before completion, or reason documented when not applicable

## Security

- [ ] No secrets committed
- [ ] No auth/permission weakening
- [ ] No sensitive data exposure
- [ ] Input validation considered

## Release

- [ ] Rollback path clear
- [ ] Known issues documented
- [ ] Follow-ups captured
- [ ] If more work remains, follow-ups include a copy-ready next-chat prompt
- [ ] Transient coordination artifacts are excluded from publishable paths or explicitly approved as durable content
