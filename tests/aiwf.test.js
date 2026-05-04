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
