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
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ai-phellos-upgrade-'));
}

function runCli(args, cwd) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: { ...process.env },
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

test('upgrade requires --dry-run or --apply flag', () => {
  const cwd = createLegacyProject();
  const result = runCli(['upgrade', cwd], cwd);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--dry-run\|--apply/);
});

test('upgrade detects legacy project without version manifest as unknown', () => {
  const cwd = createLegacyProject();
  const result = runCli(['upgrade', cwd, '--dry-run'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Detected version: legacy \/ unknown/);
});

test('upgrade --dry-run shows plan without modifying files', () => {
  const cwd = createLegacyProject();

  const beforeFiles = fs.readdirSync(cwd, { recursive: true }).sort();
  const result = runCli(['upgrade', cwd, '--dry-run'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /DRY RUN/);
  assert.match(result.stdout, /AI-PhellOS Upgrade Plan/);

  const afterFiles = fs.readdirSync(cwd, { recursive: true }).sort();
  assert.deepEqual(beforeFiles, afterFiles, 'Files should not change during dry-run');
});

test('upgrade --apply creates new framework files', () => {
  const cwd = createLegacyProject();
  const result = runCli(['upgrade', cwd, '--apply'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Upgrade complete/);

  assert.ok(fs.existsSync(path.join(cwd, 'ai', '.phellos-version.json')), 'Version manifest should be created');
  assert.ok(fs.existsSync(path.join(cwd, 'ai', '08-memory', 'FRAMEWORK_MIGRATION.md')), 'Migration report should be created');
});

test('upgrade --apply does not overwrite package.json', () => {
  const cwd = createLegacyProject();
  const originalPackage = readFile(path.join(cwd, 'package.json'));

  runCli(['upgrade', cwd, '--apply'], cwd);

  const afterPackage = readFile(path.join(cwd, 'package.json'));
  assert.equal(originalPackage, afterPackage, 'package.json should not be modified');
});

test('upgrade --apply does not overwrite ai/04-stories', () => {
  const cwd = createLegacyProject();
  const storyPath = path.join(cwd, 'ai', '04-stories', 'example-story.md');
  const originalStory = readFile(storyPath);

  runCli(['upgrade', cwd, '--apply'], cwd);

  const afterStory = readFile(storyPath);
  assert.equal(originalStory, afterStory, 'Story file should not be modified');
});

test('upgrade --apply does not overwrite ai/08-memory/PROJECT_MEMORY.md', () => {
  const cwd = createLegacyProject();
  const memoryPath = path.join(cwd, 'ai', '08-memory', 'PROJECT_MEMORY.md');
  const originalMemory = readFile(memoryPath);

  runCli(['upgrade', cwd, '--apply'], cwd);

  const afterMemory = readFile(memoryPath);
  assert.equal(originalMemory, afterMemory, 'PROJECT_MEMORY.md should not be modified');
});

test('upgrade --apply creates .incoming for modified mixed files', () => {
  const cwd = createLegacyProject();
  const agentsPath = path.join(cwd, 'AGENTS.md');

  writeFile(agentsPath, '# Custom AGENTS.md\n\nThis file has been customized by the project.');

  const result = runCli(['upgrade', cwd, '--apply'], cwd);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, 'AGENTS.md.incoming')), '.incoming file should be created');

  const originalContent = readFile(agentsPath);
  assert.match(originalContent, /Custom AGENTS\.md/, 'Original file should be preserved');
});

test('upgrade is idempotent', () => {
  const cwd = createLegacyProject();

  runCli(['upgrade', cwd, '--apply'], cwd);
  const firstFiles = fs.readdirSync(cwd, { recursive: true }).sort();
  const firstManifest = readFile(path.join(cwd, 'ai', '.phellos-version.json'));

  const result = runCli(['upgrade', cwd, '--apply'], cwd);

  assert.equal(result.status, 0, result.stderr);

  const secondFiles = fs.readdirSync(cwd, { recursive: true }).sort();
  const secondManifest = readFile(path.join(cwd, 'ai', '.phellos-version.json'));

  assert.deepEqual(firstFiles, secondFiles, 'No new files should be created on second upgrade');

  const firstManifestParsed = JSON.parse(firstManifest);
  const secondManifestParsed = JSON.parse(secondManifest);
  assert.equal(
    firstManifestParsed.migrationsApplied.length,
    secondManifestParsed.migrationsApplied.length,
    'No new migrations should be added on second upgrade'
  );
});

test('upgrade creates version manifest with migrations applied', () => {
  const cwd = createLegacyProject();

  runCli(['upgrade', cwd, '--apply'], cwd);

  const manifestPath = path.join(cwd, 'ai', '.phellos-version.json');
  assert.ok(fs.existsSync(manifestPath), 'Version manifest should exist');

  const manifest = JSON.parse(readFile(manifestPath));
  assert.equal(manifest.framework, 'AI-PhellOS');
  assert.ok(manifest.installedVersion, 'Should have installedVersion');
  assert.ok(Array.isArray(manifest.migrationsApplied), 'Should have migrationsApplied array');
  assert.ok(manifest.migrationsApplied.some((m) => m.id === '0.2.0-safe-upgrade'), 'Should include safe-upgrade migration');
  assert.ok(manifest.migrationsApplied.some((m) => m.id === '0.2.0-delivery-audit'), 'Should include delivery-audit migration');
});

test('upgrade creates migration report', () => {
  const cwd = createLegacyProject();

  runCli(['upgrade', cwd, '--apply'], cwd);

  const reportPath = path.join(cwd, 'ai', '08-memory', 'FRAMEWORK_MIGRATION.md');
  assert.ok(fs.existsSync(reportPath), 'Migration report should exist');

  const report = readFile(reportPath);
  assert.match(report, /Framework Migration Report/);
  assert.match(report, /Files Added/);
  assert.match(report, /Files Updated/);
  assert.match(report, /Migrations Applied/);
});

test('upgrade appends to existing migration report', () => {
  const cwd = createLegacyProject();
  const reportPath = path.join(cwd, 'ai', '08-memory', 'FRAMEWORK_MIGRATION.md');

  writeFile(reportPath, '# Framework Migration Report\n\nExisting content.\n\n---\n');

  runCli(['upgrade', cwd, '--apply'], cwd);

  const report = readFile(reportPath);
  assert.match(report, /Existing content/, 'Existing content should be preserved');
  assert.match(report, /Migration:/, 'New migration entry should be added');
});

test('upgrade fails gracefully for non-AI-PhellOS project', () => {
  const cwd = makeTempProject();
  writeFile(path.join(cwd, 'index.js'), 'console.log("hello");');

  const result = runCli(['upgrade', cwd, '--dry-run'], cwd);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /does not appear to be an AI-PhellOS project/);
});

test('upgrade does not touch docs/product directory', () => {
  const cwd = createLegacyProject();
  const prdPath = path.join(cwd, 'docs', 'product', 'prd.md');
  const originalPrd = readFile(prdPath);

  runCli(['upgrade', cwd, '--apply'], cwd);

  const afterPrd = readFile(prdPath);
  assert.equal(originalPrd, afterPrd, 'docs/product/prd.md should not be modified');
});

test('help shows upgrade command', () => {
  const result = runCli(['help'], repoRoot);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /aiwf upgrade <target-dir> --dry-run\|--apply/);
});
