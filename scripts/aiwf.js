#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const TARGET_ROOT = process.cwd();
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const command = args[0] || 'help';

function targetRel(...parts) {
  return path.join(TARGET_ROOT, ...parts);
}

function packageRel(...parts) {
  return path.join(PACKAGE_ROOT, ...parts);
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

function copyFileIfMissing(source, target) {
  if (!exists(source)) return false;
  if (exists(target)) return false;
  write(target, read(source));
  return true;
}

function copyDirIfMissing(sourceDir, targetDir) {
  if (!exists(sourceDir)) return { copied: 0, skipped: 0 };
  let copied = 0;
  let skipped = 0;

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      const result = copyDirIfMissing(source, target);
      copied += result.copied;
      skipped += result.skipped;
    } else if (entry.isFile()) {
      if (copyFileIfMissing(source, target)) copied += 1;
      else skipped += 1;
    }
  }

  return { copied, skipped };
}

function sourceFile(...parts) {
  const inTarget = targetRel(...parts);
  if (exists(inTarget)) return inTarget;
  return packageRel(...parts);
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

function isStoryFile(filePath) {
  const name = path.basename(filePath).toLowerCase();
  if (!name.endsWith('.md')) return false;
  if (name === 'readme.md') return false;
  if (name.endsWith('.template.md')) return false;
  if (name.startsWith('.')) return false;
  return true;
}

function listStoryFiles(dirPath) {
  if (!exists(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .map((name) => path.join(dirPath, name))
    .filter((filePath) => fs.statSync(filePath).isFile())
    .filter(isStoryFile);
}

function usage() {
  console.log(`AI Workflow CLI

Usage:
  aiwf install <new|existing> [target-dir]
  aiwf init <new|existing>
  aiwf start [request]
  aiwf map [repo-focus]
  aiwf brainstorm <idea>
  aiwf plan <feature-or-change>
  aiwf story <feature|bugfix|refactor|migration|generic> "Title"
  aiwf validate <story-file>
  aiwf gates
  aiwf sensitive [base-ref] [head-ref]
  aiwf review <story-file>
  aiwf doctor

Node fallback:
  node scripts/aiwf.js <command>

Examples:
  npx ai-phellos install existing .
  aiwf start "I want to create a web app with Next.js, React, and Convex"
  aiwf map "authentication and billing flow"
  aiwf brainstorm "an app for schools"
  aiwf plan "Add team invitation flow"
  aiwf story feature "Add team invitation flow"
  aiwf validate ai/04-stories/20260502-feature-add-team-invitation-flow.md
  aiwf review ai/04-stories/20260502-feature-add-team-invitation-flow.md`);
}

function printPrompt(title, body) {
  console.log(`# ${title}\n`);
  console.log(body.trim());
}

function quotedOrFallback(value, fallback) {
  const text = String(value || '').trim();
  return text || fallback;
}

function startPrompt(request) {
  const userRequest = quotedOrFallback(request, '<describe what you want to create, understand, change, fix, refactor, or automate>');
  printPrompt('AI-PhellOS Start Prompt', `
Read AGENTS.md, CLAUDE.md when present, ai/09-intake/INTENT_ROUTER.md, ai/09-intake/QUESTION_STRATEGY.md, ai/09-intake/BRAINSTORMING_PLAYBOOK.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/00-rules/DEFINITION_OF_READY.md, ai/00-rules/CHANGE_SIZE_POLICY.md, ai/00-rules/GIT_WORKFLOW.md, ai/agents/ORCHESTRATOR.md, ai/agents/ROUTING_MATRIX.md, and ai/agents/SQUAD_LEVELS.md.

User request:
${userRequest}

Produce an Intent Routing Result before implementation.

Classify:
- execution environment;
- user intent;
- project state;
- project maturity;
- project type;
- stack profile, if known;
- workflow mode;
- squad level;
- agents selected;
- agents skipped and why;
- required artifacts;
- first safe action;
- blocking questions;
- assumptions;
- stop conditions.

If the request is an idea or rough concept, run brainstorming first and ask at most one high-leverage question.
If this is an existing project, map the repository before suggesting code changes.
Do not write production code until the selected workflow is ready.
`);
}

function mapPrompt(focus) {
  const repoFocus = quotedOrFallback(focus, 'overall repository structure, stack, commands, tests, risks, and conventions');
  printPrompt('AI-PhellOS Repository Mapping Prompt', `
Read AGENTS.md, CLAUDE.md when present, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/agents/ORCHESTRATOR.md, ai/agents/ROUTING_MATRIX.md, and existing memory under ai/08-memory/.

Workflow mode: Existing Project Understanding.

Mapping focus:
${repoFocus}

Create or update ai/08-memory/PROJECT_MAP.md and ai/08-memory/PROJECT_MEMORY.md.

Map:
- repository purpose;
- tech stack and package managers;
- entry points;
- important directories;
- runtime commands;
- test/build/typecheck/lint commands;
- data model or persistence layer, if present;
- integrations and external services;
- security-sensitive areas;
- architectural boundaries;
- current risks and unknowns;
- recommended next stories.

Do not write production application code.
Stop after the repository understanding report and memory update proposal.
`);
}

function brainstormPrompt(idea) {
  const userIdea = quotedOrFallback(idea, '<describe the idea or rough product direction>');
  printPrompt('AI-PhellOS Brainstorming Prompt', `
Read AGENTS.md, CLAUDE.md when present, ai/09-intake/INTENT_ROUTER.md, ai/09-intake/QUESTION_STRATEGY.md, ai/09-intake/BRAINSTORMING_PLAYBOOK.md, ai/templates/BRAINSTORMING.template.md, ai/agents/ORCHESTRATOR.md, and ai/agents/PRODUCT.md.

Idea:
${userIdea}

Workflow mode: Brainstorming / Pre-brief shaping.
Project maturity: Idea only or Rough concept unless evidence says otherwise.
Squad: Orchestrator + Product. Add Architect only if feasibility or stack materially changes the first decision.

Create a brainstorming artifact and guide the user toward:
- primary user;
- painful problem;
- desired outcome;
- alternatives and competitors;
- MVP boundary;
- non-goals;
- risky assumptions;
- validation path;
- first project brief inputs.

Ask at most one high-leverage question at a time.
Do not create production code, PRD, or architecture until the Brainstorming Handoff is clear.
`);
}

function planPrompt(change) {
  const requestedChange = quotedOrFallback(change, '<describe the feature, bugfix, refactor, migration, or change>');
  printPrompt('AI-PhellOS Planning Prompt', `
Read AGENTS.md, CLAUDE.md when present, ai/09-intake/INTENT_ROUTER.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/00-rules/DEFINITION_OF_READY.md, ai/00-rules/CHANGE_SIZE_POLICY.md, ai/agents/ORCHESTRATOR.md, ai/agents/ROUTING_MATRIX.md, ai/agents/SQUAD_LEVELS.md, and ai/08-memory/PROJECT_MAP.md if present.

Requested change:
${requestedChange}

Produce a plan before implementation.

Include:
- Intent Routing Result;
- workflow mode;
- squad level;
- specialists needed and skipped;
- required artifacts;
- impact analysis;
- acceptance criteria;
- non-goals;
- files likely in scope;
- files or areas explicitly forbidden;
- sensitive areas and required human approval;
- test plan;
- commands to run;
- rollback plan;
- stop conditions;
- recommended story file and title.

If this is an existing project and PROJECT_MAP.md is missing or empty, map the repo first.
Do not implement until Definition of Ready is satisfied.
`);
}

function installWorkflow(mode, targetDir = '.') {
  const targetRoot = path.resolve(TARGET_ROOT, targetDir);
  if (!['new', 'existing'].includes(mode)) throw new Error('Usage: aiwf install <new|existing> [target-dir]');

  const copyPairs = [
    ['ai', 'ai'],
    ['scripts', 'scripts'],
    ['prompts', 'prompts'],
    ['docs', 'docs'],
    ['.claude', '.claude'],
    ['.codex', '.codex'],
    ['.github', '.github'],
  ];

  let copied = 0;
  let skipped = 0;

  for (const [source, target] of copyPairs) {
    const result = copyDirIfMissing(packageRel(source), path.join(targetRoot, target));
    copied += result.copied;
    skipped += result.skipped;
  }

  for (const file of ['AGENTS.md', 'CLAUDE.md']) {
    if (copyFileIfMissing(packageRel(file), path.join(targetRoot, file))) copied += 1;
    else skipped += 1;
  }

  if (!exists(path.join(targetRoot, 'package.json'))) {
    if (copyFileIfMissing(packageRel('package.json'), path.join(targetRoot, 'package.json'))) copied += 1;
  } else {
    skipped += 1;
  }

  console.log(`Installed workflow assets into ${targetRoot}`);
  console.log(`Copied: ${copied}. Skipped existing: ${skipped}.`);

  const previousCwd = process.cwd();
  process.chdir(targetRoot);
  try {
    initProject(mode, targetRoot);
  } finally {
    process.chdir(previousCwd);
  }
}

function initProject(mode, root = TARGET_ROOT) {
  const tr = (...parts) => path.join(root, ...parts);
  const sf = (...parts) => {
    const candidate = path.join(root, ...parts);
    if (exists(candidate)) return candidate;
    return packageRel(...parts);
  };

  if (mode === 'new') {
    ['ai/01-discovery', 'ai/02-product', 'ai/03-architecture', 'ai/04-stories', 'ai/05-execution', 'ai/06-reviews', 'ai/07-release', 'ai/08-memory'].forEach((dir) => ensureDir(tr(dir)));
    copyFileIfMissing(sf('ai/templates/PROJECT_BRIEF.template.md'), tr('ai/01-discovery/PROJECT_BRIEF.md'));
    copyFileIfMissing(sf('ai/templates/PRD.template.md'), tr('ai/02-product/PRD.md'));
    copyFileIfMissing(sf('ai/templates/ARCHITECTURE.template.md'), tr('ai/03-architecture/ARCHITECTURE.md'));
    console.log('New project workflow initialized.');
    console.log('Next: ask your agent to fill ai/01-discovery/PROJECT_BRIEF.md without writing code.');
    return;
  }

  if (mode === 'existing') {
    ['ai/05-execution', 'ai/08-memory', 'ai/04-stories', 'ai/06-reviews'].forEach((dir) => ensureDir(tr(dir)));
    if (!exists(tr('ai/08-memory/PROJECT_MAP.md'))) write(tr('ai/08-memory/PROJECT_MAP.md'), '');
    if (!exists(tr('ai/08-memory/PROJECT_MEMORY.md'))) write(tr('ai/08-memory/PROJECT_MEMORY.md'), '');
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

  const templatePath = sourceFile(...template.split('/'));
  if (!exists(templatePath)) throw new Error(`Template not found: ${template}`);

  ensureDir(targetRel('ai/04-stories'));
  const output = targetRel('ai/04-stories', `${todayStamp()}-${type}-${slugify(title)}.md`);
  if (exists(output)) throw new Error(`Story already exists: ${path.relative(TARGET_ROOT, output)}`);

  const content = read(templatePath).replace(/<title>/g, title);
  write(output, content);
  console.log(`Created story: ${path.relative(TARGET_ROOT, output)}`);
  console.log(`Next: fill required fields, then run: aiwf validate ${path.relative(TARGET_ROOT, output)}`);
}

function hasAny(content, patterns) {
  return patterns.some((pattern) => new RegExp(pattern, 'im').test(content));
}

function validateStory(storyPath) {
  if (!storyPath) throw new Error('Usage: aiwf validate <path-to-story-or-template>');
  const absolute = path.resolve(TARGET_ROOT, storyPath);
  if (!exists(absolute)) throw new Error(`File not found: ${storyPath}`);

  if (!isStoryFile(absolute)) {
    console.log(`Skipping non-story markdown file: ${storyPath}`);
    return true;
  }

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
    const filePath = targetRel(file);
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

  const storyDir = targetRel('ai/04-stories');
  if (exists(storyDir)) {
    const stories = listStoryFiles(storyDir);
    if (stories.length === 0) {
      console.log('WARN: no executable stories found in ai/04-stories');
      warnings += 1;
    }
  }

  ['ai/01-discovery', 'ai/02-product', 'ai/03-architecture', 'ai/04-stories', 'ai/05-execution'].forEach((dir) => {
    const dirPath = targetRel(dir);
    if (!exists(dirPath)) return;
    const files = fs.readdirSync(dirPath, { recursive: true }).filter((entry) => String(entry).endsWith('.md') && !String(entry).endsWith('.template.md'));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (!fs.statSync(filePath).isFile()) continue;
      if (path.basename(filePath).toLowerCase() === 'readme.md') continue;
      if (/TBD/i.test(read(filePath))) {
        console.log(`WARN: unresolved TBD placeholders found in ${path.relative(TARGET_ROOT, filePath)}`);
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
    const output = execFileSync('git', ['diff', '--name-only', baseRef, headRef], { cwd: TARGET_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
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
    console.log(`${exists(targetRel(dir)) ? 'PASS' : 'WARN'}: ${dir}`);
  });
  console.log('\nDoctor complete.');
}

try {
  switch (command) {
    case 'install':
      installWorkflow(args[1], args[2] || '.');
      break;
    case 'init':
      initProject(args[1]);
      break;
    case 'start':
      startPrompt(args.slice(1).join(' '));
      break;
    case 'map':
      mapPrompt(args.slice(1).join(' '));
      break;
    case 'brainstorm':
      brainstormPrompt(args.slice(1).join(' '));
      break;
    case 'plan':
      planPrompt(args.slice(1).join(' '));
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
