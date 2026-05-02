# Publishing Guide

This project can be published as an npm package that exposes the `aiwf` command.

## Package name

Current package name:

```text
ai-dev-workflow-template
```

After publishing, users can run:

```bash
npx ai-dev-workflow-template install existing .
npx ai-dev-workflow-template install new ./my-new-app
```

If you want a shorter command, rename the package before publishing, for example:

```json
{
  "name": "aiwf"
}
```

or use a scoped package:

```json
{
  "name": "@intuitive/aiwf"
}
```

Then users can run:

```bash
npx @intuitive/aiwf install existing .
```

## Pre-publish checklist

Run:

```bash
node scripts/aiwf.js doctor
npm run pack:dry-run
```

Confirm the package includes:

- `scripts/aiwf.js`
- `AGENTS.md`
- `CLAUDE.md`
- `ai/`
- `docs/`
- `prompts/`
- `.claude/`
- `.codex/`
- `.github/pull_request_template.md`

## Login to npm

```bash
npm login
```

## Publish

For an unscoped public package:

```bash
npm publish
```

For a scoped public package:

```bash
npm publish --access public
```

## Test after publish

In an empty temp directory:

```bash
mkdir aiwf-test
cd aiwf-test
npx ai-dev-workflow-template install existing .
node scripts/aiwf.js doctor
```

Or, for a scoped package:

```bash
npx @intuitive/aiwf install existing .
node scripts/aiwf.js doctor
```

## Versioning

Use semantic versioning:

```bash
npm version patch
npm version minor
npm version major
```

Suggested meanings:

- patch: documentation, small validation fixes, non-breaking template improvements;
- minor: new templates, new commands, new workflow modes, backward-compatible behavior;
- major: breaking CLI behavior or artifact layout changes.

## Release notes

Before publishing a new version, update `CHANGELOG.md` if present or create a GitHub release with:

- highlights;
- migration notes;
- new commands;
- breaking changes;
- recommended upgrade path.
