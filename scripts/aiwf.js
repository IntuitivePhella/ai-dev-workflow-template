#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const TARGET_ROOT = process.cwd();
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const command = args[0] || 'help';
const DEFAULT_PROJECT_CONFIG = {
  paths: {
    specsPath: 'ai/11-specs',
    changesPath: 'ai/04-changes',
  },
  commands: {
    test: 'npm.cmd test',
    gates: 'node scripts/aiwf.js gates',
    doctor: 'node scripts/aiwf.js doctor',
  },
  artifacts: {},
};
let cachedProjectConfig = null;

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

function parseYamlScalar(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function parseSimpleYaml(content) {
  const root = {};
  const stack = [{ indent: -1, value: root }];

  for (const line of content.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line) || /^\s*-/.test(line)) continue;
    const match = /^(\s*)([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/.exec(line);
    if (!match) continue;

    const indent = match[1].length;
    const key = match[2];
    const rawValue = match[3] || '';

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();

    const parent = stack[stack.length - 1].value;
    if (rawValue.trim()) {
      parent[key] = parseYamlScalar(rawValue);
    } else {
      parent[key] = {};
      stack.push({ indent, value: parent[key] });
    }
  }

  return root;
}

function normalizeConfigPath(value, fallback, settingName) {
  const raw = String(value || fallback).trim().replace(/\\/g, '/').replace(/\/+$/g, '');
  if (!raw) return fallback;
  if (path.isAbsolute(raw) || /^[A-Za-z]:\//.test(raw)) throw new Error(`ai/config.yaml ${settingName} must be repository-relative`);
  const normalized = path.posix.normalize(raw);
  if (normalized === '.' || normalized.startsWith('../') || normalized === '..') {
    throw new Error(`ai/config.yaml ${settingName} must stay inside the repository`);
  }
  return normalized;
}

function loadProjectConfig() {
  const configPath = targetRel('ai', 'config.yaml');
  const config = {
    paths: { ...DEFAULT_PROJECT_CONFIG.paths },
    commands: { ...DEFAULT_PROJECT_CONFIG.commands },
    artifacts: {},
  };

  if (!exists(configPath)) return config;

  const parsed = parseSimpleYaml(read(configPath));
  const pathsConfig = parsed.paths || {};
  const commandsConfig = parsed.commands || {};

  config.paths.specsPath = normalizeConfigPath(pathsConfig.specsPath, config.paths.specsPath, 'paths.specsPath');
  config.paths.changesPath = normalizeConfigPath(pathsConfig.changesPath, config.paths.changesPath, 'paths.changesPath');
  config.commands = { ...config.commands, ...commandsConfig };
  config.artifacts = parsed.artifacts || {};
  return config;
}

function projectConfig() {
  if (!cachedProjectConfig) cachedProjectConfig = loadProjectConfig();
  return cachedProjectConfig;
}

function configuredPath(...parts) {
  return targetRel(...parts.join('/').split('/').filter(Boolean));
}

function specsPathRel() {
  return projectConfig().paths.specsPath;
}

function changesPathRel() {
  return projectConfig().paths.changesPath;
}

function specsRootPath() {
  return configuredPath(specsPathRel());
}

function changesRootPath() {
  return configuredPath(changesPathRel());
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
  aiwf change <title>
  aiwf status <change-path> [--json]
  aiwf instructions <artifact> <change-path>
  aiwf verify <change-path>
  aiwf sync <change-path>
  aiwf archive <change-path>
  aiwf validate-spec <spec-or-delta-file>
  aiwf validate-change <change-package-dir>
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
  aiwf change "Add dark mode"
  aiwf status ai/04-changes/20260506-add-dark-mode
  aiwf instructions proposal ai/04-changes/20260506-add-dark-mode
  aiwf verify ai/04-changes/20260506-add-dark-mode
  aiwf sync ai/04-changes/20260506-add-dark-mode
  aiwf archive ai/04-changes/20260506-add-dark-mode
  aiwf validate-spec ai/11-specs/session-continuity.md
  aiwf validate-change ai/04-changes/20260506-add-dark-mode
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

function defaultCommandsText() {
  const commands = projectConfig().commands;
  return Object.keys(commands)
    .sort()
    .map((name) => `- ${name}: ${commands[name]}`)
    .join('\n');
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

Default commands from ai/config.yaml or AI-PhellOS defaults:
${defaultCommandsText()}

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

function templateWithTitle(templatePath, title) {
  return read(templatePath)
    .replace(/<title>/g, title)
    .replace(/<change title>/g, title);
}

function changeDesignTemplate(title) {
  return `# Design Notes: ${title}

## Context

Document design decisions, trade-offs, and alternatives for this change package.

## Decisions

- TBD

## Alternatives considered

- TBD

## Risks

- TBD
`;
}

function createChangePackage(title) {
  if (!title) throw new Error('Usage: aiwf change <title>');

  const slug = slugify(title);
  if (!slug) throw new Error('Change title must contain at least one alphanumeric character');

  const changeDir = path.join(changesRootPath(), `${todayStamp()}-${slug}`);
  if (exists(changeDir)) throw new Error(`Change package already exists: ${path.relative(TARGET_ROOT, changeDir)}`);

  const proposalTemplate = sourceFile('ai', 'templates', 'CHANGE_PROPOSAL.template.md');
  const tasksTemplate = sourceFile('ai', 'templates', 'CHANGE_TASKS.template.md');
  const specDeltaTemplate = sourceFile('ai', 'templates', 'SPEC_DELTA.template.md');

  if (!exists(proposalTemplate)) throw new Error('Template not found: ai/templates/CHANGE_PROPOSAL.template.md');
  if (!exists(tasksTemplate)) throw new Error('Template not found: ai/templates/CHANGE_TASKS.template.md');
  if (!exists(specDeltaTemplate)) throw new Error('Template not found: ai/templates/SPEC_DELTA.template.md');

  ensureDir(path.join(changeDir, 'specs'));
  write(path.join(changeDir, 'proposal.md'), templateWithTitle(proposalTemplate, title));
  write(path.join(changeDir, 'tasks.md'), templateWithTitle(tasksTemplate, title));
  write(path.join(changeDir, 'design.md'), changeDesignTemplate(title));
  write(path.join(changeDir, 'specs', `${slug}.delta.md`), templateWithTitle(specDeltaTemplate, title));

  console.log(`Created change package: ${displayRel(changeDir)}`);
  console.log(`Next: review proposal.md, tasks.md, design.md, and specs/${slug}.delta.md before creating implementation stories.`);
}

function hasAny(content, patterns) {
  return patterns.some((pattern) => new RegExp(pattern, 'im').test(content));
}

function rel(filePath) {
  return path.relative(TARGET_ROOT, filePath) || '.';
}

function displayRel(filePath) {
  return rel(filePath).split(path.sep).join('/');
}

function isPathInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function hasHeading(content, level, title) {
  return new RegExp(`^#{${level}}\\s+${title}\\s*$`, 'im').test(content);
}

function requirementBlocks(content) {
  const requirementPattern = /^###\s+Requirement:\s*(.+?)\s*$/gim;
  const matches = [...content.matchAll(requirementPattern)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const next = matches[index + 1];
    const end = next ? next.index : content.length;
    return {
      title: match[1].trim(),
      body: content.slice(start, end),
    };
  });
}

function scenarioBlocks(content) {
  const scenarioPattern = /^####\s+Scenario:\s*(.+?)\s*$/gim;
  const matches = [...content.matchAll(scenarioPattern)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const next = matches[index + 1];
    const end = next ? next.index : content.length;
    return {
      title: match[1].trim(),
      body: content.slice(start, end),
    };
  });
}

function validateScenarioFormatting(content, fail) {
  const scenarios = scenarioBlocks(content);

  for (const scenario of scenarios) {
    if (!/^\s*-\s+Given\b/im.test(scenario.body)) fail(`scenario "${scenario.title}" missing Given step`);
    if (!/^\s*-\s+When\b/im.test(scenario.body)) fail(`scenario "${scenario.title}" missing When step`);
    if (!/^\s*-\s+Then\b/im.test(scenario.body)) fail(`scenario "${scenario.title}" missing Then step`);
  }
}

function validateBehaviorSpecContent(content, displayPath) {
  let failures = 0;

  function fail(message) {
    console.log(`FAIL: ${displayPath}: ${message}`);
    failures += 1;
  }

  console.log(`Validating behavioral spec: ${displayPath}`);

  if (!hasHeading(content, 2, 'Purpose')) fail('missing ## Purpose');
  if (!hasHeading(content, 2, 'Requirements')) fail('missing ## Requirements');
  if (!/^###\s+Requirement:/im.test(content)) fail('missing ### Requirement:');
  if (!/^####\s+Scenario:/im.test(content)) fail('missing #### Scenario:');

  for (const requirement of requirementBlocks(content)) {
    if (!/^####\s+Scenario:/im.test(requirement.body)) fail(`requirement "${requirement.title}" missing scenario`);
  }

  validateScenarioFormatting(content, fail);

  if (failures > 0) {
    console.log(`\nSpec is NOT valid: ${failures} failure(s).`);
    process.exitCode = 1;
    return false;
  }

  console.log('\nSpec validation passed.');
  return true;
}

function deltaSections(content) {
  const sectionPattern = /^##\s+(ADDED|MODIFIED|REMOVED|RENAMED)\s*$/gim;
  const matches = [...content.matchAll(sectionPattern)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const next = matches[index + 1];
    const end = next ? next.index : content.length;
    return {
      type: match[1].toUpperCase(),
      body: content.slice(start, end),
    };
  });
}

function markdownSectionBody(content, level, title) {
  const heading = new RegExp(`^#{${level}}\\s+${title}\\s*$`, 'im');
  const match = heading.exec(content);
  if (!match) return '';

  const start = match.index + match[0].length;
  const nextHeading = new RegExp(`^#{1,${level}}\\s+`, 'gim');
  nextHeading.lastIndex = start;
  const next = nextHeading.exec(content);
  return content.slice(start, next ? next.index : content.length).trim();
}

function validateDeltaSpecContent(content, displayPath) {
  let failures = 0;

  function fail(message) {
    console.log(`FAIL: ${displayPath}: ${message}`);
    failures += 1;
  }

  console.log(`Validating spec delta: ${displayPath}`);

  if (!hasHeading(content, 2, 'Target spec')) fail('missing ## Target spec');
  if (!hasHeading(content, 2, 'Summary')) fail('missing ## Summary');

  const sections = deltaSections(content).filter((section) => /^###\s+Requirement:/im.test(section.body));
  if (sections.length === 0) fail('missing at least one delta section with ### Requirement:');

  for (const section of sections) {
    if (['ADDED', 'MODIFIED'].includes(section.type) && !/^####\s+Scenario:/im.test(section.body)) {
      fail(`${section.type} section missing #### Scenario:`);
    }
    validateScenarioFormatting(section.body, fail);
  }

  if (failures > 0) {
    console.log(`\nSpec delta is NOT valid: ${failures} failure(s).`);
    process.exitCode = 1;
    return false;
  }

  console.log('\nSpec delta validation passed.');
  return true;
}

function validateSpec(specPath) {
  if (!specPath) throw new Error('Usage: aiwf validate-spec <spec-or-delta-file>');
  const absolute = path.resolve(TARGET_ROOT, specPath);
  if (!exists(absolute)) throw new Error(`File not found: ${specPath}`);
  if (!fs.statSync(absolute).isFile()) throw new Error(`Not a file: ${specPath}`);

  const content = read(absolute);
  const displayPath = rel(absolute);
  const isDelta = /\.delta\.md$/i.test(absolute) || /^#\s+Spec Delta:/im.test(content) || hasHeading(content, 2, 'Target spec');

  return isDelta ? validateDeltaSpecContent(content, displayPath) : validateBehaviorSpecContent(content, displayPath);
}

function extractTargetSpecPath(deltaContent, deltaFile) {
  const body = markdownSectionBody(deltaContent, 2, 'Target spec');
  const fenced = /`([^`]+)`/.exec(body);
  const target = (fenced ? fenced[1] : body.split(/\r?\n/).find((line) => line.trim()))
    ?.trim()
    .replace(/^['"]|['"]$/g, '');

  if (!target) throw new Error(`${displayRel(deltaFile)} missing target spec path`);
  if (path.isAbsolute(target)) throw new Error(`${displayRel(deltaFile)} target spec must be repository-relative`);
  const absoluteTarget = path.resolve(TARGET_ROOT, target);
  if (!isPathInside(absoluteTarget, specsRootPath())) {
    throw new Error(`${displayRel(deltaFile)} target spec must be under ${specsPathRel()}/`);
  }

  return target;
}

function titleFromSpecPath(targetSpec) {
  const base = path.basename(targetSpec, '.md').replace(/[-_]+/g, ' ');
  return base.replace(/\b\w/g, (char) => char.toUpperCase());
}

function addedRequirementContent(deltaContent, deltaFile) {
  const sections = deltaSections(deltaContent);
  const unsupported = sections.find((section) => section.type !== 'ADDED' && section.body.trim());
  if (unsupported) throw new Error(`Unsupported delta operation: ${unsupported.type} in ${displayRel(deltaFile)}`);

  const added = sections
    .filter((section) => section.type === 'ADDED')
    .map((section) => section.body.trim())
    .filter(Boolean);

  if (added.length === 0) throw new Error(`${displayRel(deltaFile)} has no ADDED requirements to sync`);
  return added.join('\n\n').trim();
}

function buildNewBehaviorSpec(targetSpec, deltaContent, requirements) {
  const summary = markdownSectionBody(deltaContent, 2, 'Summary') || `Describe durable behavior for ${titleFromSpecPath(targetSpec)}.`;
  return `# Spec: ${titleFromSpecPath(targetSpec)}

## Purpose

${summary}

## Requirements

${requirements.trim()}
`;
}

function applyDeltaToSpec(deltaFile) {
  const deltaContent = read(deltaFile);
  if (!validateDeltaSpecContent(deltaContent, rel(deltaFile))) throw new Error(`Spec delta validation failed: ${displayRel(deltaFile)}`);

  const targetSpec = extractTargetSpecPath(deltaContent, deltaFile);
  const absoluteTarget = path.resolve(TARGET_ROOT, targetSpec);
  const specsRoot = specsRootPath();
  if (!isPathInside(absoluteTarget, specsRoot)) throw new Error(`Target spec escapes ${specsPathRel()}: ${targetSpec}`);

  const requirements = addedRequirementContent(deltaContent, deltaFile);
  let nextContent;
  let created = false;

  if (exists(absoluteTarget)) {
    const current = read(absoluteTarget).replace(/\s*$/, '\n');
    if (!hasHeading(current, 2, 'Requirements')) throw new Error(`${displayRel(absoluteTarget)} missing ## Requirements`);
    nextContent = `${current.trimEnd()}\n\n${requirements}\n`;
  } else {
    created = true;
    nextContent = buildNewBehaviorSpec(targetSpec, deltaContent, requirements);
  }

  if (!validateBehaviorSpecContent(nextContent, targetSpec)) throw new Error(`Synced spec would be invalid: ${targetSpec}`);
  write(absoluteTarget, nextContent);

  console.log(`${created ? 'Created spec' : 'Updated spec'}: ${displayRel(absoluteTarget)}`);
  console.log(`Synced delta: ${displayRel(deltaFile)}`);
}

function syncChangePackage(changePath) {
  const changeDir = resolveChangeDir(changePath, 'Usage: aiwf sync <change-package-dir>');
  if (!validateChangePackage(changeDir)) throw new Error(`Change package validation failed: ${displayRel(changeDir)}`);

  const deltaFiles = listDeltaFiles(path.join(changeDir, 'specs'));
  if (deltaFiles.length === 0) throw new Error(`No delta specs found: ${displayRel(changeDir)}`);

  for (const deltaFile of deltaFiles) applyDeltaToSpec(deltaFile);
  console.log('\nSpec sync complete.');
  return true;
}

function listDeltaFiles(specsDir) {
  if (!exists(specsDir)) return [];
  return fs.readdirSync(specsDir)
    .map((name) => path.join(specsDir, name))
    .filter((filePath) => fs.statSync(filePath).isFile())
    .filter((filePath) => /\.delta\.md$/i.test(filePath));
}

function validateChangePackage(changePath) {
  if (!changePath) throw new Error('Usage: aiwf validate-change <change-package-dir>');
  const absolute = path.resolve(TARGET_ROOT, changePath);
  if (!exists(absolute)) throw new Error(`Directory not found: ${changePath}`);
  if (!fs.statSync(absolute).isDirectory()) throw new Error(`Not a directory: ${changePath}`);

  let failures = 0;

  function fail(message) {
    console.log(`FAIL: ${rel(absolute)}: ${message}`);
    failures += 1;
  }

  console.log(`Validating change package: ${rel(absolute)}`);

  if (!exists(path.join(absolute, 'proposal.md'))) fail('missing proposal.md');
  if (!exists(path.join(absolute, 'tasks.md'))) fail('missing tasks.md');

  const specsDir = path.join(absolute, 'specs');
  if (exists(specsDir)) {
    if (!fs.statSync(specsDir).isDirectory()) {
      fail('specs exists but is not a directory');
    } else {
      const deltaFiles = listDeltaFiles(specsDir);
      if (deltaFiles.length === 0) fail('specs folder exists but contains no *.delta.md files');
      for (const deltaFile of deltaFiles) {
        if (!validateDeltaSpecContent(read(deltaFile), rel(deltaFile))) failures += 1;
      }
    }
  }

  if (failures > 0) {
    console.log(`\nChange package is NOT valid: ${failures} failure(s).`);
    process.exitCode = 1;
    return false;
  }

  console.log('\nChange package validation passed.');
  return true;
}

function resolveChangeDir(changePath, usageText) {
  if (!changePath) throw new Error(usageText);
  const absolute = path.resolve(TARGET_ROOT, changePath);
  if (!exists(absolute)) throw new Error(`Directory not found: ${changePath}`);
  if (!fs.statSync(absolute).isDirectory()) throw new Error(`Not a directory: ${changePath}`);
  return absolute;
}

function changeArtifactStatus(changeDir) {
  const proposalPath = path.join(changeDir, 'proposal.md');
  const specsDir = path.join(changeDir, 'specs');
  const designPath = path.join(changeDir, 'design.md');
  const tasksPath = path.join(changeDir, 'tasks.md');
  const specFiles = exists(specsDir) && fs.statSync(specsDir).isDirectory()
    ? listDeltaFiles(specsDir).map(displayRel).sort()
    : [];

  const artifacts = {
    proposal: {
      status: exists(proposalPath) && fs.statSync(proposalPath).isFile() ? 'complete' : 'missing',
      path: displayRel(proposalPath),
    },
    specs: {
      status: specFiles.length > 0 ? 'complete' : 'missing',
      path: displayRel(specsDir),
      files: specFiles,
    },
    design: {
      status: exists(designPath) && fs.statSync(designPath).isFile() ? 'complete' : 'missing',
      path: displayRel(designPath),
    },
    tasks: {
      status: exists(tasksPath) && fs.statSync(tasksPath).isFile() ? 'complete' : 'missing',
      path: displayRel(tasksPath),
    },
  };

  const missing = Object.keys(artifacts).filter((name) => artifacts[name].status !== 'complete');

  return {
    changePath: displayRel(changeDir),
    complete: missing.length === 0,
    missing,
    next: missing[0] || null,
    artifacts,
  };
}

function changeStatus(changePath, json = false) {
  const changeDir = resolveChangeDir(changePath, 'Usage: aiwf status <change-package-dir> [--json]');
  const status = changeArtifactStatus(changeDir);

  if (json) {
    console.log(JSON.stringify(status, null, 2));
    return true;
  }

  console.log(`Change package: ${status.changePath}`);
  console.log('\nArtifacts:');
  for (const name of ['proposal', 'specs', 'design', 'tasks']) {
    const artifact = status.artifacts[name];
    console.log(`[${artifact.status}] ${name}  ${artifact.path}`);
    if (name === 'specs' && artifact.files.length > 0) {
      for (const file of artifact.files) console.log(`  - ${file}`);
    }
  }

  if (status.next) {
    console.log(`\nNext: aiwf instructions ${status.next} ${status.changePath}`);
  } else {
    console.log('\nNext: aiwf validate-change ' + status.changePath);
  }

  return true;
}

function normalizeInstructionArtifact(artifact) {
  const value = String(artifact || '').toLowerCase();
  if (value === 'spec' || value === 'delta' || value === 'deltas') return 'specs';
  if (['proposal', 'specs', 'design', 'tasks'].includes(value)) return value;
  throw new Error('Unknown artifact. Allowed: proposal, specs, design, tasks');
}

function instructionDetails(artifact, changeDir) {
  const changePath = displayRel(changeDir);
  const details = {
    proposal: {
      expected: displayRel(path.join(changeDir, 'proposal.md')),
      template: 'ai/templates/CHANGE_PROPOSAL.template.md',
      guidance: [
        'State the problem, goals, non-goals, affected behavior, acceptance criteria, risks, and rollback approach.',
        'Keep the proposal durable enough that agents can split implementation stories without inventing scope.',
      ],
    },
    specs: {
      expected: `${displayRel(path.join(changeDir, 'specs'))}/<slug>.delta.md`,
      template: 'ai/templates/SPEC_DELTA.template.md',
      guidance: [
        'Describe ADDED, MODIFIED, REMOVED, or RENAMED behavior against a target spec.',
        'Use Requirement and Scenario headings with Given, When, and Then steps for added or modified behavior.',
      ],
    },
    design: {
      expected: displayRel(path.join(changeDir, 'design.md')),
      template: 'inline design notes scaffold from aiwf change',
      guidance: [
        'Record design decisions, alternatives considered, trade-offs, and risks.',
        'Keep it brief; omit design notes only when the change package explicitly does not need design decisions.',
      ],
    },
    tasks: {
      expected: displayRel(path.join(changeDir, 'tasks.md')),
      template: 'ai/templates/CHANGE_TASKS.template.md',
      guidance: [
        'Break the change into ordered, reviewable tasks and implementation stories.',
        'Mark completed tasks only after tests and quality gates for that task pass.',
      ],
    },
  };

  return { changePath, ...details[artifact] };
}

function changeInstructions(artifactArg, changePath) {
  if (!artifactArg || !changePath) throw new Error('Usage: aiwf instructions <artifact> <change-package-dir>');
  const artifact = normalizeInstructionArtifact(artifactArg);
  const changeDir = resolveChangeDir(changePath, 'Usage: aiwf instructions <artifact> <change-package-dir>');
  const details = instructionDetails(artifact, changeDir);

  console.log(`# Change Package Instructions: ${artifact}`);
  console.log(`\nChange package: ${details.changePath}`);
  console.log(`Expected file: ${details.expected}`);
  console.log(`Template: ${details.template}`);
  console.log('\nGuidance:');
  for (const line of details.guidance) console.log(`- ${line}`);
  console.log(`\nRun status next: aiwf status ${details.changePath}`);
  return true;
}

function verifyChangePackage(changePath) {
  const changeDir = resolveChangeDir(changePath, 'Usage: aiwf verify <change-package-dir>');
  const status = changeArtifactStatus(changeDir);
  const tasksPath = path.join(changeDir, 'tasks.md');
  const specsDir = path.join(changeDir, 'specs');
  const deltaFiles = listDeltaFiles(specsDir);
  let critical = 0;
  let warnings = 0;

  function criticalLine(message) {
    console.log(`- CRITICAL: ${message}`);
    critical += 1;
  }

  function warningLine(message) {
    console.log(`- WARNING: ${message}`);
    warnings += 1;
  }

  function okLine(message) {
    console.log(`- OK: ${message}`);
  }

  console.log('# Verify Report');
  console.log(`\nChange package: ${status.changePath}`);
  console.log('\nThis command checks package artifacts and checklist state. It does not prove implementation correctness.');

  console.log('\n## Completeness');
  if (status.artifacts.proposal.status === 'complete') okLine('proposal.md exists');
  else criticalLine('missing proposal.md');

  if (status.artifacts.tasks.status === 'complete') {
    const tasks = read(tasksPath);
    if (/^\s*-\s*\[\s\]/im.test(tasks)) criticalLine('tasks.md has incomplete tasks');
    else okLine('tasks.md has no incomplete checklist items');
  } else {
    criticalLine('missing tasks.md');
  }

  if (deltaFiles.length > 0) {
    okLine(`found ${deltaFiles.length} spec delta file(s)`);
  } else {
    warningLine('no spec delta files found; acceptable only when no durable behavior contract changed');
  }

  if (status.artifacts.design.status === 'complete') {
    okLine('design.md exists');
  } else {
    warningLine('design.md is missing; treat as skipped only if no design decisions were needed');
  }

  console.log('\n## Correctness');
  if (status.artifacts.proposal.status === 'complete' && status.artifacts.tasks.status === 'complete') {
    let invalidDeltaCount = 0;
    for (const deltaFile of deltaFiles) {
      if (!validateDeltaSpecContent(read(deltaFile), rel(deltaFile))) invalidDeltaCount += 1;
    }

    if (invalidDeltaCount === 0) okLine('change package structure is valid');
    else criticalLine(`${invalidDeltaCount} spec delta file(s) failed structural validation`);
  } else {
    criticalLine('cannot validate package correctness until proposal.md and tasks.md exist');
  }

  console.log('\n## Coherence');
  if (deltaFiles.length > 0) okLine('spec deltas provide behavior-contract context for review');
  else warningLine('reviewers must confirm the absence of spec deltas is intentional');
  okLine('human review is still required for product fit, implementation behavior, and release readiness');

  console.log('\n## Result');
  if (critical > 0) {
    console.log(`Verification report failed: ${critical} critical finding(s), ${warnings} warning(s).`);
    process.exitCode = 1;
    return false;
  }

  if (warnings > 0) console.log(`Verification report passed with warnings: ${warnings} warning(s).`);
  else console.log('Verification report passed.');
  return true;
}

function dateStampDashed() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function assertChangePackageCanArchive(changeDir) {
  const changesRoot = changesRootPath();
  const archiveRoot = path.join(changesRoot, 'archive');

  if (!isPathInside(changeDir, changesRoot) || isPathInside(changeDir, archiveRoot)) {
    throw new Error(`Can only archive active change packages under ${changesPathRel()}/`);
  }

  const tasksPath = path.join(changeDir, 'tasks.md');
  if (!exists(tasksPath)) throw new Error(`Missing tasks.md: ${displayRel(changeDir)}`);
  if (/^\s*-\s*\[\s\]/im.test(read(tasksPath))) {
    throw new Error('Cannot archive change package with incomplete tasks');
  }
}

function archiveChangePackage(changePath) {
  const changeDir = resolveChangeDir(changePath, 'Usage: aiwf archive <change-package-dir>');
  if (!validateChangePackage(changeDir)) throw new Error(`Change package validation failed: ${displayRel(changeDir)}`);
  assertChangePackageCanArchive(changeDir);

  const archiveRoot = path.join(changesRootPath(), 'archive');
  const destination = path.join(archiveRoot, `${dateStampDashed()}-${path.basename(changeDir)}`);
  if (exists(destination)) throw new Error(`Archive destination already exists: ${displayRel(destination)}`);

  ensureDir(archiveRoot);
  fs.renameSync(changeDir, destination);
  console.log(`Archived change package: ${displayRel(destination)}`);
  return true;
}

function hasSessionStatePlaceholders(content) {
  const requiredSections = [
    'Current project phase',
    'Current active story',
    'Last completed step',
    'Exact next step',
    'Blockers',
    'Tests status',
    'Risks / watchouts',
  ];

  const missingSection = requiredSections.some((section) => !new RegExp(`^##\\s+${section}\\s*$`, 'im').test(content));
  if (missingSection) return true;

  return [
    /-\s*Brainstorming \/ Discovery \/ PRD \/ Architecture \/ Story execution \/ Review \/ Release/i,
    /-\s*Path:\s*$/im,
    /-\s*Status:\s*$/im,
    /-\s*Acceptance criteria status:\s*$/im,
    /^-\s*$/m,
    /\bTBD\b/i,
  ].some((pattern) => pattern.test(content));
}

function findMissingLocalCoordinationReferences(content) {
  const matches = content.match(/`?ai\/_local\/[^`\s),]+`?/g) || [];
  const missing = [];
  for (const match of matches) {
    const rel = match.replace(/`/g, '').replace(/\.$/, '');
    const absolute = targetRel(...rel.split('/'));
    if (!exists(absolute) && !missing.includes(rel)) missing.push(rel);
  }
  return missing;
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

  const sessionStatePath = targetRel('ai/08-memory/SESSION_STATE.md');
  if (!exists(sessionStatePath)) {
    console.log('WARN: optional file missing: ai/08-memory/SESSION_STATE.md');
    warnings += 1;
  } else {
    const sessionState = read(sessionStatePath);
    if (hasSessionStatePlaceholders(sessionState)) {
      console.log('WARN: ai/08-memory/SESSION_STATE.md appears to contain placeholder or incomplete continuity fields');
      warnings += 1;
    }
    const missingLocalRefs = findMissingLocalCoordinationReferences(sessionState);
    if (missingLocalRefs.length > 0) {
      console.log(`WARN: ai/08-memory/SESSION_STATE.md references missing local coordination artifact(s): ${missingLocalRefs.join(', ')}`);
      warnings += 1;
    }
  }

  const storyDir = targetRel('ai/04-stories');
  if (exists(storyDir)) {
    const stories = listStoryFiles(storyDir);
    if (stories.length === 0) {
      console.log('PASS: no active executable stories found in ai/04-stories');
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
    case 'change':
      createChangePackage(args.slice(1).join(' '));
      break;
    case 'status': {
      const json = args.includes('--json');
      const changePath = args.slice(1).find((arg) => arg !== '--json');
      changeStatus(changePath, json);
      break;
    }
    case 'instructions':
      changeInstructions(args[1], args[2]);
      break;
    case 'verify':
      verifyChangePackage(args[1]);
      break;
    case 'sync':
      syncChangePackage(args[1]);
      break;
    case 'archive':
      archiveChangePackage(args[1]);
      break;
    case 'validate-spec':
      validateSpec(args[1]);
      break;
    case 'validate-change':
      validateChangePackage(args[1]);
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
