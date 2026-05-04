# Continuous Improvement Rule

AI-PhellOS should improve through real usage.

When a project exercise reveals a reusable process improvement, the agent should:

1. Name the observed gap.
2. Explain why it matters.
3. Identify the framework files affected.
4. Propose a small patch or story to improve the framework.
5. Avoid mixing framework improvement with product implementation unless explicitly approved.
6. Prefer rules, templates, validators, or examples over one-off advice.
7. Add tests when the behavior is enforceable by CLI validation.

Examples of reusable improvements:

- New sensitive-domain routing rule.
- Better Definition of Ready check.
- New template for privacy, safety, release, migration, or incident review.
- New stack profile.
- New story validation rule.
- Better prompt generator behavior.
