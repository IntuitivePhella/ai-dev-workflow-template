# Cross-Platform Installation

The recommended CLI is the Node.js implementation:

```text
scripts/aiwf.js
```

It is designed to run on:

- Linux
- macOS
- Windows PowerShell
- Windows CMD
- Windows Git Bash
- WSL

## Requirement

Install Node.js 18 or newer.

Check:

```bash
node --version
```

## Run without installing globally

From the repository root:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js init new
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js review ai/04-stories/<story-file>.md
node scripts/aiwf.js upgrade . --dry-run
node scripts/aiwf.js upgrade . --apply
node scripts/aiwf.js audit ai/04-stories/<story-file>.md
```

## Run through npm scripts

```bash
npm run aiwf -- help
npm run aiwf -- doctor
npm run aiwf -- story feature "Add team invitation flow"
```

## Install locally as a command

From the repository root:

```bash
npm link
```

Then use:

```bash
aiwf help
aiwf doctor
aiwf story feature "Add team invitation flow"
```

To remove the linked command:

```bash
npm unlink -g ai-dev-workflow-template
```

## Windows examples

PowerShell:

```powershell
node scripts/aiwf.js doctor
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate "ai/04-stories/20260502-feature-add-team-invitation-flow.md"
```

CMD:

```cmd
node scripts\aiwf.js doctor
node scripts\aiwf.js story feature "Add team invitation flow"
node scripts\aiwf.js validate "ai\04-stories\20260502-feature-add-team-invitation-flow.md"
```

## Bash compatibility

The older Bash scripts remain available for Linux, macOS, Git Bash, and WSL:

```bash
bash scripts/aiwf.sh doctor
bash scripts/create-story.sh feature "Add team invitation flow"
```

For Windows PowerShell/CMD, prefer the Node CLI.

## Recommended command map

| Task | Cross-platform command |
|---|---|
| Show help | `node scripts/aiwf.js help` |
| Initialize new project | `node scripts/aiwf.js init new` |
| Initialize existing project | `node scripts/aiwf.js init existing` |
| Preview upgrade | `node scripts/aiwf.js upgrade . --dry-run` |
| Apply upgrade | `node scripts/aiwf.js upgrade . --apply` |
| Delivery audit | `node scripts/aiwf.js audit <story-or-change-path>` |
| Create feature story | `node scripts/aiwf.js story feature "Title"` |
| Create bugfix story | `node scripts/aiwf.js story bugfix "Title"` |
| Validate story | `node scripts/aiwf.js validate <story-file>` |
| Check gates | `node scripts/aiwf.js gates` |
| Check sensitive paths | `node scripts/aiwf.js sensitive HEAD~1 HEAD` |
| Check review readiness | `node scripts/aiwf.js review <story-file>` |
| Diagnose setup | `node scripts/aiwf.js doctor` |
