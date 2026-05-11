const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repoRoot = path.resolve(__dirname, '..');
const cliPath = path.join(repoRoot, 'scripts', 'aiwf.js');
const fixturesPath = path.join(__dirname, 'fixtures', 'legacy-project');

function makeTempProject() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ai-phellos-audit-'));
}

function runCli(args, cwd) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: cwd || repoRoot,
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

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function createLegacyProject() {
  const cwd = makeTempProject();
  copyDir(fixturesPath, cwd);
  return cwd;
}

test('audit requires a story or change path', () => {
  const result = runCli(['audit'], repoRoot);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Usage: aiwf audit <story-or-change-path>/);
});

test('audit fails for non-existent path', () => {
  const result = runCli(['audit', 'non-existent-file.md'], repoRoot);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Path not found/);
});

test('audit prints cold delivery audit prompt for story file', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');

  const result = runCli(['audit', storyPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Cold Delivery Audit Prompt/);
  assert.match(result.stdout, /ai\/06-reviews\/DELIVERY_AUDIT\.md/);
  assert.match(result.stdout, /ai\/templates\/DELIVERY_AUDIT\.template\.md/);
  assert.match(result.stdout, /Do NOT defend the implementation/);
  assert.match(result.stdout, /Demand evidence/);
});

test('audit includes story content in prompt', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');

  const result = runCli(['audit', storyPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Example Feature/);
  assert.match(result.stdout, /Story is preserved after upgrade/);
});

test('audit works with change package directory', () => {
  const cwd = makeTempProject();
  const changeDir = path.join(cwd, 'ai', '04-changes', '20260511-test-change');

  writeFile(path.join(changeDir, 'proposal.md'), '# Proposal\n\nTest change proposal.');
  writeFile(path.join(changeDir, 'tasks.md'), '# Tasks\n\n- [ ] Task 1');

  const result = runCli(['audit', changeDir], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Cold Delivery Audit Prompt/);
  assert.match(result.stdout, /Type.*change package/i);
  assert.match(result.stdout, /proposal\.md/);
  assert.match(result.stdout, /Test change proposal/);
});

test('audit does not modify any files', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');

  const beforeFiles = fs.readdirSync(cwd, { recursive: true }).sort();
  runCli(['audit', storyPath], cwd);
  const afterFiles = fs.readdirSync(cwd, { recursive: true }).sort();

  assert.deepEqual(beforeFiles, afterFiles, 'No files should be created or modified');
});

test('audit prompt includes security review guidance', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');

  const result = runCli(['audit', storyPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /ai\/agents\/SECURITY\.md/);
});

test('audit prompt includes qa review guidance', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');

  const result = runCli(['audit', storyPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /ai\/agents\/QA\.md/);
});

test('audit prompt specifies verdict options', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');

  const result = runCli(['audit', storyPath], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Approve.*Approve with concerns.*Request changes.*Block/i);
});

test('help shows audit command', () => {
  const result = runCli(['help'], repoRoot);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /aiwf audit <story-or-change-path>/);
});
