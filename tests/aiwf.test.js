const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repoRoot = path.resolve(__dirname, '..');
const cliPath = path.join(repoRoot, 'scripts', 'aiwf.js');

function makeTempProject() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ai-phellos-'));
}

function runCli(args, cwd) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: 'utf8',
  });
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

test('help prints available commands', () => {
  const cwd = makeTempProject();
  const result = runCli(['help'], cwd);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /AI Workflow CLI/);
  assert.match(result.stdout, /aiwf install <new\|existing>/);
  assert.match(result.stdout, /aiwf start \[request\]/);
  assert.match(result.stdout, /aiwf map \[repo-focus\]/);
  assert.match(result.stdout, /aiwf brainstorm <idea>/);
  assert.match(result.stdout, /aiwf plan <feature-or-change>/);
  assert.match(result.stdout, /aiwf change <title>/);
  assert.match(result.stdout, /aiwf status <change-path>/);
  assert.match(result.stdout, /aiwf instructions <artifact> <change-path>/);
  assert.match(result.stdout, /aiwf verify <change-path>/);
  assert.match(result.stdout, /aiwf sync <change-path>/);
  assert.match(result.stdout, /aiwf archive <change-path>/);
  assert.match(result.stdout, /aiwf validate-spec <spec-or-delta-file>/);
  assert.match(result.stdout, /aiwf validate-change <change-package-dir>/);
  assert.match(result.stdout, /aiwf doctor/);
  assert.match(result.stdout, /npx ai-phellos install existing \./);
});

test('start prints an intent routing prompt', () => {
  const cwd = makeTempProject();
  const result = runCli(['start', 'I want to create a Next.js app'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /AI-PhellOS Start Prompt/);
  assert.match(result.stdout, /Intent Routing Result/);
  assert.match(result.stdout, /I want to create a Next\.js app/);
  assert.match(result.stdout, /Do not write production code/);
});

test('map prints an existing project understanding prompt', () => {
  const cwd = makeTempProject();
  const result = runCli(['map', 'auth and billing'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /AI-PhellOS Repository Mapping Prompt/);
  assert.match(result.stdout, /Existing Project Understanding/);
  assert.match(result.stdout, /auth and billing/);
  assert.match(result.stdout, /PROJECT_MAP\.md/);
});

test('brainstorm prints a pre-brief shaping prompt', () => {
  const cwd = makeTempProject();
  const result = runCli(['brainstorm', 'an app for schools'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /AI-PhellOS Brainstorming Prompt/);
  assert.match(result.stdout, /Brainstorming \/ Pre-brief shaping/);
  assert.match(result.stdout, /an app for schools/);
  assert.match(result.stdout, /Ask at most one high-leverage question/);
});

test('plan prints a planning prompt for a requested change', () => {
  const cwd = makeTempProject();
  const result = runCli(['plan', 'Add team invitation flow'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /AI-PhellOS Planning Prompt/);
  assert.match(result.stdout, /Requested change:/);
  assert.match(result.stdout, /Add team invitation flow/);
  assert.match(result.stdout, /Definition of Ready/);
});

test('plan includes configured default commands when config is present', () => {
  const cwd = makeTempProject();
  writeFile(path.join(cwd, 'ai', 'config.yaml'), `commands:
  test: pnpm test
  gates: pnpm ai:gates
  doctor: pnpm ai:doctor
`);

  const result = runCli(['plan', 'Add configured command guidance'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Default commands from ai\/config\.yaml or AI-PhellOS defaults/);
  assert.match(result.stdout, /test: pnpm test/);
  assert.match(result.stdout, /gates: pnpm ai:gates/);
  assert.match(result.stdout, /doctor: pnpm ai:doctor/);
});

test('install existing copies workflow assets without overwriting app package.json', () => {
  const cwd = makeTempProject();
  const appPackage = {
    name: 'existing-app',
    private: true,
  };

  writeFile(path.join(cwd, 'package.json'), JSON.stringify(appPackage, null, 2));

  const result = runCli(['install', 'existing', '.'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, 'AGENTS.md')));
  assert.ok(fs.existsSync(path.join(cwd, 'CLAUDE.md')));
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '08-memory', 'PROJECT_MAP.md')));
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '08-memory', 'PROJECT_MEMORY.md')));
  assert.equal(readFile(path.join(cwd, 'package.json')), JSON.stringify(appPackage, null, 2));
});

test('init new creates discovery, product, and architecture artifacts', () => {
  const cwd = makeTempProject();
  const result = runCli(['init', 'new'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '01-discovery', 'PROJECT_BRIEF.md')));
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '02-product', 'PRD.md')));
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '03-architecture', 'ARCHITECTURE.md')));
});

test('story creates a dated slugged story from template', () => {
  const cwd = makeTempProject();
  const result = runCli(['story', 'feature', 'Add Team Invitation Flow'], cwd);

  assert.equal(result.status, 0, result.stderr);
  const storyDir = path.join(cwd, 'ai', '04-stories');
  const stories = fs.readdirSync(storyDir);

  assert.equal(stories.length, 1);
  assert.match(stories[0], /^\d{8}-feature-add-team-invitation-flow\.md$/);
  assert.match(readFile(path.join(storyDir, stories[0])), /Add Team Invitation Flow/);
});

test('change creates a dated slugged change package scaffold', () => {
  const cwd = makeTempProject();
  const result = runCli(['change', 'Add Dark Mode'], cwd);

  assert.equal(result.status, 0, result.stderr);
  const changeDir = path.join(cwd, 'ai', '04-changes');
  const changes = fs.readdirSync(changeDir);

  assert.equal(changes.length, 1);
  assert.match(changes[0], /^\d{8}-add-dark-mode$/);

  const packageDir = path.join(changeDir, changes[0]);
  assert.ok(fs.existsSync(path.join(packageDir, 'proposal.md')));
  assert.ok(fs.existsSync(path.join(packageDir, 'tasks.md')));
  assert.ok(fs.existsSync(path.join(packageDir, 'design.md')));
  assert.ok(fs.statSync(path.join(packageDir, 'specs')).isDirectory());
  assert.ok(fs.existsSync(path.join(packageDir, 'specs', 'add-dark-mode.delta.md')));
  assert.match(readFile(path.join(packageDir, 'proposal.md')), /Change Proposal: Add Dark Mode/);
  assert.match(readFile(path.join(packageDir, 'tasks.md')), /Change Tasks: Add Dark Mode/);
  assert.match(readFile(path.join(packageDir, 'design.md')), /Design Notes: Add Dark Mode/);
  assert.match(readFile(path.join(packageDir, 'specs', 'add-dark-mode.delta.md')), /Spec Delta: Add Dark Mode/);
  assert.match(result.stdout, /Created change package:/);
});

test('change refuses to overwrite an existing change package', () => {
  const cwd = makeTempProject();
  const first = runCli(['change', 'Add Dark Mode'], cwd);
  const second = runCli(['change', 'Add Dark Mode'], cwd);

  assert.equal(first.status, 0, first.stderr);
  assert.equal(second.status, 1);
  assert.match(second.stderr, /Change package already exists/);

  const changeDir = path.join(cwd, 'ai', '04-changes');
  const changes = fs.readdirSync(changeDir);
  assert.equal(changes.length, 1);
});

test('change uses default package path when config is absent', () => {
  const cwd = makeTempProject();
  const result = runCli(['change', 'Default Config Path'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '04-changes')));
  assert.match(result.stdout, /Created change package: ai\/04-changes\//);
});

test('change uses configured package path when config is present', () => {
  const cwd = makeTempProject();
  writeFile(path.join(cwd, 'ai', 'config.yaml'), `paths:
  changesPath: ai/proposals
  specsPath: ai/capabilities
commands:
  test: npm.cmd test
artifacts:
  change:
    rules:
      - Keep proposal scope small.
`);

  const result = runCli(['change', 'Configured Path'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, 'ai', 'proposals')));
  assert.equal(fs.existsSync(path.join(cwd, 'ai', '04-changes')), false);
  assert.match(result.stdout, /Created change package: ai\/proposals\//);
});

test('status reports missing artifacts for an empty change package', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-empty-change');
  fs.mkdirSync(changeDir, { recursive: true });

  const result = runCli(['status', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Change package: ai\/04-changes\/20260506-empty-change/);
  assert.match(result.stdout, /\[missing\] proposal/);
  assert.match(result.stdout, /\[missing\] specs/);
  assert.match(result.stdout, /\[missing\] design/);
  assert.match(result.stdout, /\[missing\] tasks/);
  assert.match(result.stdout, /Next: aiwf instructions proposal/);
});

test('status reports complete and missing artifacts for a partial change package', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-partial-change');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Partial\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Partial\n');

  const result = runCli(['status', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /\[complete\] proposal\s+ai\/04-changes\/20260506-partial-change\/proposal\.md/);
  assert.match(result.stdout, /\[missing\] specs\s+ai\/04-changes\/20260506-partial-change\/specs/);
  assert.match(result.stdout, /\[missing\] design\s+ai\/04-changes\/20260506-partial-change\/design\.md/);
  assert.match(result.stdout, /\[complete\] tasks\s+ai\/04-changes\/20260506-partial-change\/tasks\.md/);
  assert.match(result.stdout, /Next: aiwf instructions specs/);
});

test('status can emit stable JSON for a change package', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-json-change');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: JSON\n');
  writeFile(path.join(changeDir, 'specs', 'json.delta.md'), '# Spec Delta: JSON\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: JSON\n');

  const result = runCli(['status', changeDir, '--json'], cwd);

  assert.equal(result.status, 0, result.stderr);
  const status = JSON.parse(result.stdout);
  assert.deepEqual(Object.keys(status), ['changePath', 'complete', 'missing', 'next', 'artifacts']);
  assert.equal(status.changePath, 'ai/04-changes/20260506-json-change');
  assert.equal(status.complete, false);
  assert.deepEqual(status.missing, ['design']);
  assert.equal(status.next, 'design');
  assert.equal(status.artifacts.proposal.status, 'complete');
  assert.equal(status.artifacts.specs.status, 'complete');
  assert.deepEqual(status.artifacts.specs.files, ['ai/04-changes/20260506-json-change/specs/json.delta.md']);
  assert.equal(status.artifacts.design.status, 'missing');
  assert.equal(status.artifacts.tasks.status, 'complete');
});

test('instructions prints artifact guidance for a change package', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-guided-change');
  fs.mkdirSync(changeDir, { recursive: true });

  const result = runCli(['instructions', 'proposal', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Change Package Instructions: proposal/);
  assert.match(result.stdout, /Expected file: ai\/04-changes\/20260506-guided-change\/proposal\.md/);
  assert.match(result.stdout, /Template: ai\/templates\/CHANGE_PROPOSAL\.template\.md/);
  assert.match(result.stdout, /Run status next: aiwf status/);
});

test('validate-spec passes for a valid behavioral spec', () => {
  const cwd = makeTempProject();
  const specPath = path.join(cwd, 'ai', '11-specs', 'change-packages.md');

  writeFile(specPath, `# Spec: Change Packages

## Purpose

Describe durable behavior for change packages.

## Requirements

### Requirement: Change packages group broad changes

The system must keep broad behavior changes in a coherent package.

#### Scenario: Valid package

- Given a broad behavior change
- When an agent prepares implementation work
- Then the agent can validate the change package before execution
`);

  const result = runCli(['validate-spec', specPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Spec validation passed/);
});

test('validate-spec fails when a behavioral spec is missing a scenario', () => {
  const cwd = makeTempProject();
  const specPath = path.join(cwd, 'ai', '11-specs', 'change-packages.md');

  writeFile(specPath, `# Spec: Change Packages

## Purpose

Describe durable behavior for change packages.

## Requirements

### Requirement: Change packages group broad changes

The system must keep broad behavior changes in a coherent package.
`);

  const result = runCli(['validate-spec', specPath], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /Spec is NOT valid/);
  assert.match(result.stdout, /missing scenario/);
});

test('validate-spec fails for an empty delta spec', () => {
  const cwd = makeTempProject();
  const deltaPath = path.join(cwd, 'ai', '04-changes', '20260506-add-validation', 'specs', 'change-packages.delta.md');

  writeFile(deltaPath, `# Spec Delta: Add validation

## Target spec

\`ai/11-specs/change-packages.md\`

## Summary

Add validation behavior.
`);

  const result = runCli(['validate-spec', deltaPath], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /Spec delta is NOT valid/);
  assert.match(result.stdout, /missing at least one delta section/);
});

test('validate-change passes for a valid change package with delta specs', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-add-validation');

  writeFile(path.join(changeDir, 'proposal.md'), `# Change Proposal: Add validation

## Problem

Specs need structural validation.
`);

  writeFile(path.join(changeDir, 'tasks.md'), `# Change Tasks: Add validation

## Tasks

- [x] Add validator tests.
`);

  writeFile(path.join(changeDir, 'specs', 'change-packages.delta.md'), `# Spec Delta: Add validation

## Target spec

\`ai/11-specs/change-packages.md\`

## Summary

Add validation behavior.

## ADDED

### Requirement: Change packages can be validated

The system must validate proposal, tasks, and delta specs.

#### Scenario: Valid change package

- Given a change package with proposal, tasks, and a delta spec
- When an agent runs change validation
- Then the package passes structural validation
`);

  const result = runCli(['validate-change', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Change package validation passed/);
});

test('sync applies added requirements into an existing behavioral spec', () => {
  const cwd = makeTempProject();
  const specPath = path.join(cwd, 'ai', '11-specs', 'change-packages.md');
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-add-sync');

  writeFile(specPath, `# Spec: Change Packages

## Purpose

Describe durable behavior for change packages.

## Requirements

### Requirement: Change packages can be validated

The system must validate change package structure.

#### Scenario: Valid package

- Given a change package with required artifacts
- When an agent validates the package
- Then the package passes structural validation
`);

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Add sync\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Add sync\n\n- [x] Add sync tests.\n');
  writeFile(path.join(changeDir, 'specs', 'change-packages.delta.md'), `# Spec Delta: Add sync

## Target spec

\`ai/11-specs/change-packages.md\`

## Summary

Add sync behavior.

## ADDED

### Requirement: Change packages can sync specs

The system must apply accepted added behavior to the target spec.

#### Scenario: Sync added behavior

- Given a validated change package with an added requirement
- When an agent runs spec sync
- Then the target behavioral spec includes the added requirement
`);

  const result = runCli(['sync', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Synced delta:/);
  const spec = readFile(specPath);
  assert.match(spec, /Requirement: Change packages can be validated/);
  assert.match(spec, /Requirement: Change packages can sync specs/);
  assert.match(spec, /Scenario: Sync added behavior/);
});

test('sync creates a new capability spec for an added-only delta', () => {
  const cwd = makeTempProject();
  const specPath = path.join(cwd, 'ai', '11-specs', 'new-capability.md');
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-add-new-capability');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Add new capability\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Add new capability\n\n- [x] Add new spec tests.\n');
  writeFile(path.join(changeDir, 'specs', 'new-capability.delta.md'), `# Spec Delta: Add new capability

## Target spec

\`ai/11-specs/new-capability.md\`

## Summary

Document new capability behavior.

## ADDED

### Requirement: New capability can be described

The system must create a durable spec for new added-only behavior.

#### Scenario: New capability spec

- Given an added-only delta for a missing target spec
- When an agent runs spec sync
- Then the behavioral spec is created under ai/11-specs
`);

  const result = runCli(['sync', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Created spec:/);
  assert.ok(fs.existsSync(specPath));
  const spec = readFile(specPath);
  assert.match(spec, /^# Spec: New Capability/m);
  assert.match(spec, /Requirement: New capability can be described/);
});

test('sync accepts configured specs path for target specs', () => {
  const cwd = makeTempProject();
  writeFile(path.join(cwd, 'ai', 'config.yaml'), `paths:
  specsPath: ai/capabilities
  changesPath: ai/proposals
`);
  const specPath = path.join(cwd, 'ai', 'capabilities', 'configured-capability.md');
  const changeDir = path.join(cwd, 'ai', 'proposals', '20260506-configured-sync');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Configured sync\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Configured sync\n\n- [x] Add configured sync tests.\n');
  writeFile(path.join(changeDir, 'specs', 'configured-capability.delta.md'), `# Spec Delta: Configured sync

## Target spec

\`ai/capabilities/configured-capability.md\`

## Summary

Document configured capability behavior.

## ADDED

### Requirement: Configured specs can sync

The system must sync added behavior into the configured specs path.

#### Scenario: Sync configured path

- Given a configured specs path
- When an agent runs spec sync
- Then the behavioral spec is created under that configured path
`);

  const result = runCli(['sync', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Created spec: ai\/capabilities\/configured-capability\.md/);
  assert.ok(fs.existsSync(specPath));
  assert.match(readFile(specPath), /Requirement: Configured specs can sync/);
});

test('sync fails clearly for unsupported delta operations', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-modify-capability');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Modify capability\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Modify capability\n\n- [x] Add unsupported operation test.\n');
  writeFile(path.join(changeDir, 'specs', 'capability.delta.md'), `# Spec Delta: Modify capability

## Target spec

\`ai/11-specs/capability.md\`

## Summary

Modify existing behavior.

## MODIFIED

### Requirement: Capability changes

The system must change existing behavior.

#### Scenario: Modified behavior

- Given existing behavior
- When an agent runs spec sync
- Then sync rejects unsupported operations
`);

  const result = runCli(['sync', changeDir], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unsupported delta operation: MODIFIED/);
});

test('archive refuses incomplete tasks by default', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-incomplete-change');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Incomplete change\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Incomplete change\n\n- [ ] Finish implementation.\n');
  writeFile(path.join(changeDir, 'specs', 'capability.delta.md'), `# Spec Delta: Incomplete change

## Target spec

\`ai/11-specs/capability.md\`

## Summary

Add behavior.

## ADDED

### Requirement: Capability can be archived

The system must preserve complete change packages.

#### Scenario: Archive complete package

- Given a complete change package
- When an agent archives the package
- Then the package is preserved under archive history
`);

  const result = runCli(['archive', changeDir], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cannot archive change package with incomplete tasks/);
  assert.ok(fs.existsSync(changeDir));
});

test('archive preserves a completed change package under archive history', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-complete-change');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Complete change\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Complete change\n\n- [x] Finish implementation.\n');
  writeFile(path.join(changeDir, 'notes', 'review.md'), '# Review\n');
  writeFile(path.join(changeDir, 'specs', 'capability.delta.md'), `# Spec Delta: Complete change

## Target spec

\`ai/11-specs/capability.md\`

## Summary

Add behavior.

## ADDED

### Requirement: Capability can be archived

The system must preserve complete change packages.

#### Scenario: Archive complete package

- Given a complete change package
- When an agent archives the package
- Then the package is preserved under archive history
`);

  const result = runCli(['archive', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  const archiveRoot = path.join(cwd, 'ai', '04-changes', 'archive');
  const archives = fs.readdirSync(archiveRoot);
  assert.equal(archives.length, 1);
  assert.match(archives[0], /^\d{4}-\d{2}-\d{2}-20260506-complete-change$/);

  const archivedDir = path.join(archiveRoot, archives[0]);
  assert.ok(fs.existsSync(path.join(archivedDir, 'proposal.md')));
  assert.ok(fs.existsSync(path.join(archivedDir, 'tasks.md')));
  assert.ok(fs.existsSync(path.join(archivedDir, 'specs', 'capability.delta.md')));
  assert.ok(fs.existsSync(path.join(archivedDir, 'notes', 'review.md')));
  assert.equal(fs.existsSync(changeDir), false);
  assert.match(result.stdout, /Archived change package:/);
});

test('verify reports incomplete tasks as critical', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-incomplete-verify');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Incomplete verify\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Incomplete verify\n\n- [x] Add tests.\n- [ ] Finish implementation.\n');
  writeFile(path.join(changeDir, 'specs', 'capability.delta.md'), `# Spec Delta: Incomplete verify

## Target spec

\`ai/11-specs/capability.md\`

## Summary

Add verification behavior.

## ADDED

### Requirement: Capability can be verified

The system must report verification status.

#### Scenario: Verify incomplete package

- Given an incomplete change package
- When an agent runs verification
- Then the report includes a critical finding
`);

  const result = runCli(['verify', changeDir], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /# Verify Report/);
  assert.match(result.stdout, /## Completeness/);
  assert.match(result.stdout, /CRITICAL: tasks.md has incomplete tasks/);
  assert.match(result.stdout, /## Correctness/);
  assert.match(result.stdout, /## Coherence/);
});

test('verify passes complete tasks and reports missing optional design as warning', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260506-complete-verify');

  writeFile(path.join(changeDir, 'proposal.md'), '# Change Proposal: Complete verify\n');
  writeFile(path.join(changeDir, 'tasks.md'), '# Change Tasks: Complete verify\n\n- [x] Add tests.\n- [x] Finish implementation.\n');
  writeFile(path.join(changeDir, 'specs', 'capability.delta.md'), `# Spec Delta: Complete verify

## Target spec

\`ai/11-specs/capability.md\`

## Summary

Add verification behavior.

## ADDED

### Requirement: Capability can be verified

The system must report verification status.

#### Scenario: Verify complete package

- Given a complete change package
- When an agent runs verification
- Then the report passes with documented limitations
`);

  const result = runCli(['verify', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /OK: tasks.md has no incomplete checklist items/);
  assert.match(result.stdout, /WARNING: design.md is missing; treat as skipped only if no design decisions were needed/);
  assert.match(result.stdout, /OK: change package structure is valid/);
  assert.match(result.stdout, /Verification report passed with warnings/);
});

test('verify report template exists', () => {
  const templatePath = path.join(repoRoot, 'ai', 'templates', 'VERIFY_REPORT.template.md');

  assert.ok(fs.existsSync(templatePath));
  const template = readFile(templatePath);
  assert.match(template, /## Completeness/);
  assert.match(template, /## Correctness/);
  assert.match(template, /## Coherence/);
});

test('project config template documents optional paths commands and artifact rules', () => {
  const templatePath = path.join(repoRoot, 'ai', 'config.template.yaml');

  assert.ok(fs.existsSync(templatePath));
  const template = readFile(templatePath);
  assert.match(template, /specsPath:/);
  assert.match(template, /changesPath:/);
  assert.match(template, /commands:/);
  assert.match(template, /artifacts:/);
  assert.match(template, /rules:/);
});

test('validate fails when a story is missing required readiness fields', () => {
  const cwd = makeTempProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'bad-story.md');
  writeFile(storyPath, '# Bad Story\n\nThis is not ready.\n');

  const result = runCli(['validate', storyPath], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /Story is NOT ready/);
  assert.match(result.stdout, /missing workflow mode/);
  assert.match(result.stdout, /missing acceptance criteria/);
});

test('validate passes when a story contains required readiness fields', () => {
  const cwd = makeTempProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'ready-story.md');

  writeFile(storyPath, `# Ready Story

## Workflow mode
Feature in existing project.

## Scope
Allowed files: src/example.js

## Out of scope
Forbidden files: package.json

## Acceptance criteria
- The behavior is implemented.

## Tests required
- node --test

## Commands to run
- npm test

## Rollback
Revert this story commit.

## Risks
Low.

## Definition of done
- Acceptance criteria met.
`);

  const result = runCli(['validate', storyPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Story readiness check passed/);
});

test('gates warns when session state is missing or still placeholder-only', () => {
  const cwd = makeTempProject();

  const requiredFiles = [
    'ai/00-rules/AI_RULES.md',
    'ai/00-rules/WORKFLOW_MODES.md',
    'ai/00-rules/QUALITY_GATES.md',
    'ai/00-rules/DEFINITION_OF_READY.md',
    'ai/00-rules/CHANGE_SIZE_POLICY.md',
    'ai/00-rules/GIT_WORKFLOW.md',
    'ai/agents/ORCHESTRATOR.md',
    'ai/agents/ROUTING_MATRIX.md',
    'ai/agents/SQUAD_LEVELS.md',
    'ai/08-memory/PROJECT_MEMORY.md',
    'ai/05-execution/EXECUTION_PROTOCOL.md',
    'ai/06-reviews/REVIEW_CHECKLIST.md',
  ];

  for (const file of requiredFiles) {
    writeFile(path.join(cwd, file), `# ${path.basename(file)}\n`);
  }

  let result = runCli(['gates'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /optional file missing: ai\/08-memory\/SESSION_STATE\.md/);

  writeFile(path.join(cwd, 'ai', '08-memory', 'SESSION_STATE.md'), `# Session State

## Current project phase

- Brainstorming / Discovery / PRD / Architecture / Story execution / Review / Release

## Current active story

- Path:
- Status:
- Acceptance criteria status:

## Last completed step

-

## Exact next step

-

## Blockers

-

## Tests status

-

## Risks / watchouts

-
`);

  result = runCli(['gates'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /SESSION_STATE\.md appears to contain placeholder or incomplete continuity fields/);
});

test('gates warns when session state references missing local coordination artifacts', () => {
  const cwd = makeTempProject();

  const requiredFiles = [
    'ai/00-rules/AI_RULES.md',
    'ai/00-rules/WORKFLOW_MODES.md',
    'ai/00-rules/QUALITY_GATES.md',
    'ai/00-rules/DEFINITION_OF_READY.md',
    'ai/00-rules/CHANGE_SIZE_POLICY.md',
    'ai/00-rules/GIT_WORKFLOW.md',
    'ai/agents/ORCHESTRATOR.md',
    'ai/agents/ROUTING_MATRIX.md',
    'ai/agents/SQUAD_LEVELS.md',
    'ai/08-memory/PROJECT_MEMORY.md',
    'ai/05-execution/EXECUTION_PROTOCOL.md',
    'ai/06-reviews/REVIEW_CHECKLIST.md',
  ];

  for (const file of requiredFiles) {
    writeFile(path.join(cwd, file), `# ${path.basename(file)}\n`);
  }

  writeFile(path.join(cwd, 'ai', '08-memory', 'SESSION_STATE.md'), `# Session State

## Current project phase

- Validation

## Current active story

- Path: ai/_local/missing/story.md
- Status: blocked
- Acceptance criteria status: unknown

## Last completed step

- Checked continuity.

## Exact next step

- Restore ai/_local/missing/story.md before continuing.

## Blockers

- Missing local artifact.

## Tests status

- Passing.

## Risks / watchouts

- Avoid stale local references.
`);

  const result = runCli(['gates'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /references missing local coordination artifact/);
  assert.match(result.stdout, /ai\/_local\/missing\/story\.md/);
});

test('sensitive reports sensitive changed paths in a git repository', () => {
  const cwd = makeTempProject();

  spawnSync('git', ['init'], { cwd, encoding: 'utf8' });
  spawnSync('git', ['config', 'user.email', 'test@example.com'], { cwd, encoding: 'utf8' });
  spawnSync('git', ['config', 'user.name', 'AI-PhellOS Test'], { cwd, encoding: 'utf8' });

  writeFile(path.join(cwd, 'README.md'), '# Test\n');
  spawnSync('git', ['add', '.'], { cwd, encoding: 'utf8' });
  spawnSync('git', ['commit', '-m', 'initial'], { cwd, encoding: 'utf8' });

  writeFile(path.join(cwd, 'src', 'auth', 'login.js'), 'module.exports = {};\n');
  spawnSync('git', ['add', '.'], { cwd, encoding: 'utf8' });
  spawnSync('git', ['commit', '-m', 'touch auth'], { cwd, encoding: 'utf8' });

  const result = runCli(['sensitive', 'HEAD~1', 'HEAD'], cwd);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /SENSITIVE PATH MATCH/);
  assert.match(result.stdout, /src\/auth\/login\.js/);
});
