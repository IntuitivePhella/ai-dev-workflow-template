#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const args = process.argv.slice(2);
const command = args[0] || 'help';

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyIfMissing(source, target) {
  if (exists(source) && !exists(target)) {
    write(target, read(source));
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function todayStamp() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

function listMarkdownFiles(dirPath) {
  if (!exists(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(dirPath, name));
}

function usage() {
  console.log(`AI Workflow CLI

Usage:
  aiwf init new
  aiwf init existing
  aiwf story <feature|bugfix|refactor|migration|generic> "Title"
  aiwf validate <story-file>
  aiwf gates
  aiwf sensitive [base-ref] [head-ref]
  aiwf review <story-file>
  aiwf doctor

Node fallback:
  node scripts/aiwf.js <command>

Examples:
  aiwf story feature "Add team invitation flow"
  aiwf validate ai/04-stories/20260502-feature-add-team-invitation-flow.md
  aiwf review ai/04-stories/20260502-feature-add-team-invitation-flow.md`);
}

function initProject(mode) {
  if (mode === 'new') {
    ['ai/01-discovery', 'ai/02-product', 'ai/03-architecture', 'ai/04-stories', 'ai/05-execution', 'ai/06-reviews', 'ai/07-release', 'ai/08-memory'].forEach((dir) => ensureDir(rel(dir)));
    copyIfMissing(rel('ai/templates/PROJECT_BRIEF.template.md'), rel('ai/01-discovery/PROJECT_BRIEF.md'));
    copyIfMissing(rel('ai/templates/PRD.template.md'), rel('ai/02-product/PRD.md'));
    copyIfMissing(rel('ai/templates/ARCHITECTURE.template.md'), rel('ai/03-architecture/ARCHITECTURE.md'));
    console.log('New project workflow initialized.');
    console.log('Next: ask your agent to fill ai/01-discovery/PROJECT_BRIEF.md without writing code.');
    return;
  }

  if (mode === 'existing') {
    ['ai/05-execution', 'ai/08-memory', 'ai/04-stories', 'ai/06-reviews'].forEach((dir) => ensureDir(rel(dir)));
    if (!exists(rel('ai/08-memory/PROJECT_MAP.md'))) write(rel('ai/08-memory/PROJECT_MAP.md'), '');
    if (!exists(rel('ai/08-memory/PROJECT_MEMORY.md'))) write(rel('ai/08-memory/PROJECT_MEMORY.md'), '');
    console.log('Existing project workflow initialized.');
    console.log('Next: ask your agent to analyze the repo and fill ai/08-memory/PROJECT_MAP.md before coding.');
    return;
  }

  throw new Error('Usage: aiwf init <new|existing>');
}

function createStory(type, title) {
  if (!type || !title) throw new Error('Usage: aiwf story <feature|bugfix|refactor|migration|generic> "Title"');

  const templates = {
    feature: 'ai/templates/FEATURE.template.md',
    bugfix: 'ai/templates/BUGFIX.template.md',
    refactor: 'ai/templates/REFACTOR.template.md',
    migration: 'ai/templates/MIGRATION.template.md',
    generic: 'ai/templates/STORY.template.md',
  };

  const template = templates[type];
  if (!template) throw new Error(`Unknown story type: ${type}. Allowed: ${Object.keys(templates).join(', ')}`);

  const templatePath = rel(template);
  if (!exists(templatePath)) throw new Error(`Template not found: ${template}`);

  ensureDir(rel('ai/04-stories'));
  const output = rel('ai/04-stories', `${todayStamp()}-${type}-${slugify(title)}.md`);
  if (exists(output)) throw new Error(`Story already exists: ${path.relative(ROOT, output)}`);

  const content = read(templatePath).replace(/<title>/g, title);
  write(output, content);
  console.log(`Created story: ${path.relative(ROOT, output)}`);
  console.log(`Next: fill required fields, then run: aiwf validate ${path.relative(ROOT, output)}`);
}

function hasHeading(content, heading) {
  return new RegExp(`^##\\s+${heading}`, 'im').test(content);
}

function hasAny(content, patterns) {
  return patterns.some((pattern) => new RegExp(pattern, 'im').test(content));
}

function validateStory(storyPath) {
  if (!storyPath) throw new Error('Usage: aiwf validate <path-to-story-or-template>');
  const absolute = path.resolve(ROOT, storyPath);
  if (!exists(absolute)) throw new Error(`File not found: ${storyPath}`);

  const content = read(absolute);
  let failures = 0;
  let warnings = 0;

  function fail(message) {
    console.log(`FAIL: ${message}`);
    failures += 1;
  }

  function warn(message) {
    console.log(`WARN: ${message}`);
    warnings += 1;
  }

  console.log(`Validating story readiness: ${storyPath}`);

  if (!hasAny(content, ['^##\\s+Workflow mode', 'Workflow mode'])) fail('missing workflow mode');
  if (!hasAny(content, ['^##\\s+Acceptance criteria', 'Acceptance criteria'])) fail('missing acceptance criteria');
  if (!hasAny(content, ['^##\\s+Tests required', '^##\\s+Safety tests', 'verification'])) fail('missing tests required or verification');
  if (!hasAny(content, ['^##\\s+Commands to run', 'Required commands'])) fail('missing commands to run');
  if (!hasAny(content, ['^##\\s+Rollback', 'rollback plan'])) fail('missing rollback plan');
  if (!hasAny(content, ['^##\\s+Risks', 'Risk'])) fail('missing risks');
  if (!hasAny(content, ['^##\\s+Scope', 'Allowed files', 'Files likely in scope'])) fail('missing scope or allowed files');
  if (!hasAny(content, ['Out of scope', 'Forbidden files', 'Files or areas explicitly forbidden'])) fail('missing forbidden or out-of-scope areas');
  if (!hasAny(content, ['Definition of done'])) fail('missing definition of done');

  if (/TBD/i.test(content)) warn('unresolved TBD placeholders found');

  if (/billing|auth|authorization|permission|secret|production|migration|user data|personal data|payment|paid external|destructive/i.test(content)) {
    if (!/approval recorded:\s*yes|human approval.*yes|approval.*yes/i.test(content)) {
      warn('sensitive terms detected; make sure human approval is explicit when required');
    }
  }

  if (failures > 0) {
    console.log(`\nStory is NOT ready: ${failures} failure(s), ${warnings} warning(s).`);
    process.exitCode = 1;
    return false;
  }

  console.log(`\nStory readiness check passed with ${warnings} warning(s).`);
  return true;
}

function checkGates() {
  let failures = 0;
  let warnings = 0;

  function checkFile(file, required = true) {
    const filePath = rel(file);
    if (!exists(filePath)) {
      if (required) {
        console.log(`FAIL: missing ${file}`);
        failures += 1;
      } else {
        console.log(`WARN: optional file missing: ${file}`);
        warnings += 1;
      }
      return;
    }

    if (fs.statSync(filePath).size === 0) {
      console.log(`WARN: file exists but is empty: ${file}`);
      warnings += 1;
    }
  }

  console.log('Checking AI workflow gates...');

  [
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
  ].forEach((file) => checkFile(file, true));

  checkFile('ai/08-memory/PROJECT_MAP.md', false);

  const storyDir = rel('ai/04-stories');
  if (exists(storyDir)) {
    const stories = listMarkdownFiles(storyDir);
    if (stories.length === 0) {
      console.log('WARN: no stories found in ai/04-stories');
      warnings += 1;
    }
  }

  ['ai/01-discovery', 'ai/02-product', 'ai/03-architecture', 'ai/04-stories', 'ai/05-execution'].forEach((dir) => {
    const dirPath = rel(dir);
    if (!exists(dirPath)) return;
    const files = fs.readdirSync(dirPath, { recursive: true }).filter((entry) => String(entry).endsWith('.md') && !String(entry).endsWith('.template.md'));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isFile() && /TBD/i.test(read(filePath))) {
        console.log(`WARN: unresolved TBD placeholders found in ${path.relative(ROOT, filePath)}`);
        warnings += 1;
      }
    }
  });

  if (failures > 0) {
    console.log(`\nGate check failed: ${failures} failure(s), ${warnings} warning(s).`);
    process.exitCode = 1;
    return false;
  }

  console.log(`\nGate check passed with ${warnings} warning(s).`);
  return true;
}

function gitDiffFiles(baseRef, headRef) {
  try {
    const output = execFileSync('git', ['diff', '--name-only', baseRef, headRef], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return output.split(/\r?\n/).filter(Boolean);
  } catch (_) {
    return [];
  }
}

function checkSensitive(baseRef = 'HEAD~1', headRef = 'HEAD') {
  console.log(`Checking sensitive areas between ${baseRef} and ${headRef}...`);
  const changedFiles = gitDiffFiles(baseRef, headRef);
  if (changedFiles.length === 0) {
    console.log('No changed files detected or git diff unavailable.');
    return true;
  }

  const patterns = ['auth', 'authorization', 'permission', 'billing', 'payment', 'secret', 'env', 'migration', 'terraform', 'kubernetes', 'infra', 'webhook', 'upload', 'download', 'user data', 'personal data'];
  let hits = 0;

  for (const file of changedFiles) {
    const lower = file.toLowerCase();
    for (const pattern of patterns) {
      if (lower.includes(pattern)) {
        console.log(`SENSITIVE PATH MATCH: ${file} (${pattern})`);
        hits += 1;
      }
    }
  }

  if (hits > 0) {
    console.log('\nSensitive area indicators found. Confirm human approval is recorded in the story or PR.');
    process.exitCode = 1;
    return false;
  }

  console.log('No sensitive path indicators found.');
  return true;
}

function reviewReady(storyPath) {
  if (!storyPath) throw new Error('Usage: aiwf review <path-to-story>');
  let failures = 0;
  let warnings = 0;

  console.log('== Story readiness ==');
  if (!validateStory(storyPath)) failures += 1;

  console.log('\n== Workflow gates ==');
  if (!checkGates()) failures += 1;

  console.log('\n== Sensitive area scan ==');
  const sensitiveOk = checkSensitive('HEAD~1', 'HEAD');
  if (!sensitiveOk) warnings += 1;

  if (failures > 0) {
    console.log(`\nReview readiness failed: ${failures} failure(s), ${warnings} warning(s).`);
    process.exitCode = 1;
    return false;
  }

  console.log(`\nReview readiness passed with ${warnings} warning(s).`);
  return true;
}

function doctor() {
  console.log('Running AI workflow doctor...');
  checkGates();
  console.log('\nChecking expected directories...');
  ['ai', 'ai/00-rules', 'ai/agents', 'ai/templates', 'ai/04-stories', 'ai/05-execution', 'ai/06-reviews', 'ai/08-memory', 'scripts', 'prompts'].forEach((dir) => {
    console.log(`${exists(rel(dir)) ? 'PASS' : 'WARN'}: ${dir}`);
  });
  console.log('\nDoctor complete.');
}

try {
  switch (command) {
    case 'init':
      initProject(args[1]);
      break;
    case 'story':
      createStory(args[1], args.slice(2).join(' '));
      break;
    case 'validate':
      validateStory(args[1]);
      break;
    case 'gates':
      checkGates();
      break;
    case 'sensitive':
      checkSensitive(args[1] || 'HEAD~1', args[2] || 'HEAD');
      break;
    case 'review':
      reviewReady(args[1]);
      break;
    case 'doctor':
      doctor();
      break;
    case 'help':
    case '-h':
    case '--help':
      usage();
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      usage();
      process.exitCode = 2;
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
