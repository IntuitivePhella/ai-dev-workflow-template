<div align="center">

# 🚀 AI Development Workflow Template

### **A disciplined, intent-adaptive workflow for building software with Codex or Claude Code**

<p align="center">
  <img src="https://img.shields.io/badge/AI_Workflow-BMAD--inspired-blue" alt="BMAD inspired">
  <img src="https://img.shields.io/badge/Agents-8_specialists-purple" alt="8 agents">
  <img src="https://img.shields.io/badge/Modes-7_workflows-green" alt="7 workflow modes">
  <img src="https://img.shields.io/badge/CLI-Node.js-339933" alt="Node.js CLI">
  <img src="https://img.shields.io/badge/Platforms-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey" alt="Cross platform">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Codex-AGENTS.md-black" alt="Codex compatible">
  <img src="https://img.shields.io/badge/Claude_Code-CLAUDE.md-orange" alt="Claude Code compatible">
  <img src="https://img.shields.io/badge/Workflow-Spec--Driven-blueviolet" alt="Spec driven">
  <img src="https://img.shields.io/badge/Quality-Test--First-success" alt="Test first">
</p>

<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸_English-blue" alt="English"></a>
  <a href="README.pt-BR.md"><img src="https://img.shields.io/badge/🇧🇷_Português-green" alt="Português"></a>
  <a href="README.es.md"><img src="https://img.shields.io/badge/🇪🇸_Español-red" alt="Español"></a>
  <a href="README.zh-CN.md"><img src="https://img.shields.io/badge/🇨🇳_中文-orange" alt="中文"></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-adaptive-user-experience">User Experience</a> •
  <a href="#-workflow-statistics">Stats</a> •
  <a href="#-core-concepts">Core Concepts</a> •
  <a href="#-documentation-map">Docs</a> •
  <a href="#-commands">Commands</a>
</p>

</div>

---

<div align="center">

## 🎯 **What This Is**

**AI Development Workflow Template** is a portable, markdown-first operating system for AI-assisted software development.

It helps Codex, Claude Code, and other coding agents move from raw idea to production-ready implementation through:

```text
Brainstorming → Intent Routing → Specs → Architecture → Stories → TDD → Review → Release
```

Instead of asking an AI agent to “build the app,” this framework guides it to execute **one safe, testable, reviewable story at a time**.

</div>

---

<div align="center">

## 📊 **Workflow Statistics**

| **Agents** | **Workflow Modes** | **Reusable Skills** | **Story Templates** |
|:----------:|:------------------:|:-------------------:|:-------------------:|
| **8** | **7** | **15** | **6** |
| Specialist squad | Adaptive routes | Focused procedures | Execution formats |

| **Entry Files** | **Tool Targets** | **CLI Layer** | **Safety Model** |
|:---------------:|:----------------:|:-------------:|:----------------:|
| **2** | **3** | **Node.js** | **Guardrails** |
| `AGENTS.md` + `CLAUDE.md` | Codex, Claude Code, Generic | Cross-platform | Gates + stop conditions |

</div>

---

## 🧭 Core UX Rule

The user should **not** need to say which AI coding tool to use.

If the framework is installed and the project is opened in Claude Code or Codex, the execution environment is already known:

```text
Claude Code session → follow CLAUDE.md, .claude/settings.json, and .claude/agents/*
Codex session       → follow AGENTS.md, .codex/config.toml, ai/agents/*, context packs, and skills
Generic agent       → follow AGENTS.md and markdown-first workflow files
```

The user's prompt should describe **what they want to create, understand, change, fix, refactor, or automate**.

<table>
<tr>
<td width="50%" valign="top">

### ✅ Good prompts

```text
I want to create a web app with Next.js, React, and Convex.
```

```text
I have an idea for an app for schools, but I am not sure what to build.
```

```text
Analyze this existing repo and map it before suggesting changes.
```

</td>
<td width="50%" valign="top">

### ❌ Avoid prompts like

```text
Use Claude Code to create...
```

```text
Use Codex to build...
```

```text
Build the whole app now.
```

</td>
</tr>
</table>

---

<div align="center">

## 🧠 **Adaptive User Experience**

The framework starts from **user intent**, not from a fixed development path.

</div>

<table>
<tr>
<td width="50%" valign="top">

### 💡 If the user has only an idea

```text
Raw idea
→ Intent Router
→ Project maturity classification
→ Brainstorming Playbook
→ One high-leverage question at a time
→ Brainstorming Handoff
→ Intake
→ Project Brief
→ Discovery
→ PRD
→ Architecture
→ Story split
→ First ready story
```

</td>
<td width="50%" valign="top">

### 🧱 If the user has stack + direction

```text
Natural-language request
→ Intent Router
→ Execution environment inferred
→ Stack Profile
→ Brainstorming if product is vague
→ Required artifacts
→ Smallest safe squad
→ First safe story
→ TDD implementation
→ Review and memory update
```

</td>
</tr>
</table>

### Example: New web app

```text
I want to create a web app with Next.js, React, and Convex.
```

Expected routing:

```text
Execution environment: inferred from current tool
Project state: New project
Project maturity: Rough concept unless product/user/MVP are already clear
Project type: Web app / SaaS candidate
Stack profile: Next.js + React + Convex
Workflow mode: Brainstorming first if vague, otherwise New Project
Squad level: Level 2 by default; Level 3 if auth, billing, permissions, user data, migrations, or deployment are involved
First safe action: brainstorm if needed, then create intake, project brief, PRD, architecture, test plan, and first story split before production app code
```

### Example: Vague idea

```text
I have an idea for an app for schools, but I am not sure what exactly to build.
```

Expected routing:

```text
Project maturity: Idea only
Pre-brief phase: Brainstorming
Squad: Orchestrator + Product
First safe action: create a brainstorming artifact and ask one high-leverage question about the primary problem/user
No production code yet
```

---

<div align="center">

## ⚡ **Quick Start**

</div>

### Install into an existing repository

After publishing to npm:

```bash
npx ai-dev-workflow-template install existing .
```

Before npm publishing, from a cloned copy of this repo:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
```

### Start a new project

After publishing to npm:

```bash
npx ai-dev-workflow-template install new ./my-new-app
```

Before npm publishing:

```bash
node scripts/aiwf.js install new /path/to/new/project
```

### Then prompt your coding agent

```text
Read AGENTS.md, CLAUDE.md, ai/09-intake/INTENT_ROUTER.md, ai/09-intake/QUESTION_STRATEGY.md, ai/09-intake/BRAINSTORMING_PLAYBOOK.md, ai/00-rules/AI_RULES.md, ai/00-rules/WORKFLOW_MODES.md, ai/00-rules/QUALITY_GATES.md, ai/00-rules/DEFINITION_OF_READY.md, ai/00-rules/CHANGE_SIZE_POLICY.md, ai/00-rules/GIT_WORKFLOW.md, and ai/agents/ORCHESTRATOR.md.
Classify my intent and project maturity, run brainstorming if needed, select the stack profile if available, and start the new-project workflow.
Do not write application code yet.
Use the routing matrix to select the smallest safe squad.
```

---

<div align="center">

## 🧩 **Core Concepts**

</div>

<table>
<tr>
<td width="50%" valign="top">

### 🧭 Intent Routing
Classifies what the user wants to do and chooses the smallest safe workflow.

**Key file:** `ai/09-intake/INTENT_ROUTER.md`

</td>
<td width="50%" valign="top">

### 💬 Brainstorming First
Turns vague ideas into a product direction before writing specs or code.

**Key file:** `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 👥 Specialist Squads
Uses the fewest agents needed for the current risk level.

**Key file:** `ai/agents/ROUTING_MATRIX.md`

</td>
<td width="50%" valign="top">

### ✅ Quality Gates
Prevents implementation before readiness, tests, scope, and risk are clear.

**Key file:** `ai/00-rules/QUALITY_GATES.md`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🧪 Test-Aware Execution
Pushes implementation toward TDD or the strongest available verification path.

**Key file:** `ai/skills/tdd.md`

</td>
<td width="50%" valign="top">

### 🧠 Durable Memory
Preserves project conventions, commands, risks, and decisions across sessions.

**Key file:** `ai/08-memory/PROJECT_MEMORY.md`

</td>
</tr>
</table>

---

<div align="center">

## 🤖 **Agent Squad Model**

</div>

| Agent | Responsibility | Use When |
|------|----------------|----------|
| **Orchestrator** | Routes work, controls scope, budget, gates, and handoffs | Always start here |
| **Product** | Problem, user, scope, non-goals, acceptance criteria | Ideas, new products, ambiguous features |
| **Architect** | Architecture, data model, APIs, dependencies, trade-offs | New projects, risky changes, integrations |
| **Implementer** | One story, tests first, smallest useful change | Story is ready |
| **QA** | Acceptance criteria, test plan, edge cases, regressions | Before/after implementation |
| **Security** | Auth, permissions, data exposure, secrets, abuse paths | Sensitive areas |
| **Reviewer** | Senior engineering review, maintainability, simplicity | Non-trivial diffs |
| **Release** | Readiness, rollback, known issues, deployment risk | Shipping or deployment |

> Default rule: **use the fewest agents necessary to safely complete the task.**

---

<div align="center">

## 🛣️ **Workflow Modes**

</div>

| Mode | Purpose | First Safe Action |
|------|---------|-------------------|
| **0. Brainstorming / Pre-brief shaping** | Vague idea to problem, user, MVP boundary, risks, and handoff | Ask one high-leverage question |
| **1. New Project** | Idea to brief, discovery, PRD, architecture, stories, implementation | Create intake and brief |
| **2. Existing Project Understanding** | Map a repository before coding | Create `PROJECT_MAP.md` |
| **3. New Feature in Existing Project** | Feature brief, impact analysis, test plan, story, execution, review | Create impact analysis |
| **4. Bugfix** | Reproduction, failing test, minimal fix, regression test | Reproduce the bug |
| **5. Refactor** | Behavior-preserving structural improvement with safety tests | Define preserved behavior |
| **6. Autonomous Phase** | Bounded automation only with an explicit contract | Create autonomous phase contract |

---

<div align="center">

## 📚 **Documentation Map**

</div>

<table>
<tr>
<th align="center">🚀 Entry Points</th>
<th align="center">🧭 Intake & Planning</th>
<th align="center">🤖 Agents</th>
<th align="center">✅ Execution & Quality</th>
</tr>
<tr>
<td valign="top">

- [`AGENTS.md`](AGENTS.md)  
  Codex and generic agent instructions

- [`CLAUDE.md`](CLAUDE.md)  
  Claude Code-specific instructions

- [`.codex/config.toml`](.codex/config.toml)  
  Codex safety profile

- [`.claude/settings.json`](.claude/settings.json)  
  Claude Code command guardrails

</td>
<td valign="top">

- [`INTENT_ROUTER.md`](ai/09-intake/INTENT_ROUTER.md)  
  Natural-language intent routing

- [`QUESTION_STRATEGY.md`](ai/09-intake/QUESTION_STRATEGY.md)  
  Progressive questioning rules

- [`BRAINSTORMING_PLAYBOOK.md`](ai/09-intake/BRAINSTORMING_PLAYBOOK.md)  
  BMAD-style idea shaping

- [`INTAKE.template.md`](ai/09-intake/INTAKE.template.md)  
  Adaptive intake artifact

</td>
<td valign="top">

- [`ORCHESTRATOR.md`](ai/agents/ORCHESTRATOR.md)  
  Routing and decision rules

- [`ROUTING_MATRIX.md`](ai/agents/ROUTING_MATRIX.md)  
  Which specialists to call

- [`SQUAD_LEVELS.md`](ai/agents/SQUAD_LEVELS.md)  
  Token-aware squad sizes

- [`.claude/agents/`](.claude/agents/)  
  Claude Code subagent adapters

</td>
<td valign="top">

- [`DEFINITION_OF_READY.md`](ai/00-rules/DEFINITION_OF_READY.md)  
  Readiness before implementation

- [`QUALITY_GATES.md`](ai/00-rules/QUALITY_GATES.md)  
  Required gates

- [`EXECUTION_PROTOCOL.md`](ai/05-execution/EXECUTION_PROTOCOL.md)  
  Story execution protocol

- [`REVIEW_CHECKLIST.md`](ai/06-reviews/REVIEW_CHECKLIST.md)  
  Product/engineering/QA/security/release review

</td>
</tr>
</table>

---

<div align="center">

## 🧰 **Commands**

</div>

### Cross-platform Node CLI

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js init new
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js gates
node scripts/aiwf.js review ai/04-stories/<story-file>.md
node scripts/aiwf.js sensitive HEAD~1 HEAD
```

After local linking:

```bash
npm link
aiwf help
aiwf doctor
aiwf story feature "Add team invitation flow"
```

<details>
<summary><b>📋 Available story templates</b></summary>

- [`BRAINSTORMING.template.md`](ai/templates/BRAINSTORMING.template.md)
- [`STORY.template.md`](ai/templates/STORY.template.md)
- [`FEATURE.template.md`](ai/templates/FEATURE.template.md)
- [`BUGFIX.template.md`](ai/templates/BUGFIX.template.md)
- [`REFACTOR.template.md`](ai/templates/REFACTOR.template.md)
- [`MIGRATION.template.md`](ai/templates/MIGRATION.template.md)

</details>

---

<div align="center">

## 🧬 **Workflow DNA**

</div>

This template was designed after comparing and extracting strong operating patterns from:

| Inspiration | What Was Adapted |
|------------|------------------|
| **BMAD-METHOD** | Brainstorming, discovery, PRD, architecture, epics, stories |
| **Superpowers** | Engineering discipline, planning, TDD, branch hygiene |
| **SuperClaude Framework** | Claude Code acceleration, analysis, specialist-agent inspiration |
| **GStack** | Multi-role review perspectives |
| **GSD** | Phase decomposition and context-window control |
| **RalphLoop-style loops** | Bounded automation with stop conditions |

This repo does **not** vendor or reimplement those projects. It turns their strongest workflow ideas into a portable, markdown-first operating system for AI-assisted development.

---

<div align="center">

## 🧱 **Core Rule**

### Never ask an AI agent to “build the app.”

Ask it to execute **one story** with:

</div>

<table>
<tr>
<td width="50%" valign="top">

- Clear acceptance criteria
- Files in scope
- Files/areas explicitly forbidden
- Tests required
- Commands to run

</td>
<td width="50%" valign="top">

- Non-goals
- Stop conditions
- Rollback plan
- Review checklist
- Definition of Ready satisfied

</td>
</tr>
</table>

---

<div align="center">

## ⚖️ **License**

This project is licensed under the **MIT License**.

<img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License">

</div>

---

<div align="center">

### 🚀 Built for developers who want AI to work like a disciplined engineering team

<sub>Spec-driven. Test-aware. Agent-routed. Review-gated.</sub>

<br><br>

<a href="#-ai-development-workflow-template">Back to top ↑</a>

</div>
