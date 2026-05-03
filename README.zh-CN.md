<div align="center">

# 🚀 AI-PhellOS

### 一个用于 AI 软件开发的操作系统：纪律化、按意图自适应，并兼容 Codex、Claude Code 以及可读取 Markdown 的代码代理。

<p align="center">
  <a href="README.md">English</a> •
  <a href="README.pt-BR.md">Português</a> •
  <a href="README.es.md">Español</a> •
  <a href="README.zh-CN.md">中文</a>
</p>

</div>

---

## AI-PhellOS 是什么

AI-PhellOS 是一个 portable、markdown-first 的 workflow layer，用于 AI 辅助软件开发。

它帮助 coding agents 从原始意图走向 production-ready implementation：

```text
Brainstorming → Intent Routing → Specs → Architecture → Stories → TDD → Review → Release
```

核心规则很简单：

```text
永远不要要求 AI agent 构建整个应用。
要求它一次执行一个安全、可测试、可评审的 story。
```

AI-PhellOS 不替代 Codex、Claude Code 或 Ruflo 等可选 execution adapters。它为它们提供一个纪律化的操作系统：routing、artifacts、readiness、quality gates、scope control、stop conditions、review、release 和 durable memory。

---

## 核心 UX 规则

用户应该描述想要创建、理解、修改、修复、重构或自动化什么。

用户不应该需要说明要使用哪个 AI coding tool。

```text
Claude Code session → follow CLAUDE.md, .claude/settings.json, and .claude/agents/*
Codex session       → follow AGENTS.md, .codex/config.toml, ai/agents/*, context packs, and skills
Generic agent       → follow AGENTS.md and markdown-first workflow files
Ruflo, if installed → act only as an optional Claude Code execution adapter for approved bounded phases
```

好的 prompts：

```text
我想创建一个使用 Next.js、React 和 Convex 的 web app。
```

```text
我有一个面向学校的 app 想法，但还不确定要构建什么。
```

```text
分析这个现有仓库，并在建议修改前先完成映射。
```

避免这样的 prompts：

```text
使用 Claude Code 构建整个 app。
```

```text
让 Ruflo 在夜间构建整个 app。
```

---

## Quick Start

### 安装到现有仓库

```bash
npx ai-phellos install existing .
```

在 npm 发布前，可从本仓库 clone 后使用：

```bash
node scripts/aiwf.js install existing /path/to/your/repo
```

### 启动一个新项目

```bash
npx ai-phellos install new ./my-new-app
```

在 npm 发布前：

```bash
node scripts/aiwf.js install new /path/to/new/project
```

### 生成起始 prompt

```bash
aiwf start "我想创建一个使用 Next.js、React 和 Convex 的 web app"
```

然后将生成的 prompt 粘贴到 Codex、Claude Code 或其他兼容的 coding agent 中。

---

## CLI 命令

```bash
aiwf help
aiwf doctor
aiwf install existing .
aiwf install new ./my-new-app
aiwf init existing
aiwf init new
```

Prompt generators：

```bash
aiwf start "我想为学校创建一个 SaaS"
aiwf map "authentication and billing flow"
aiwf brainstorm "一个面向学校的 app"
aiwf plan "Add team invitation flow"
```

Story 和 gate 命令：

```bash
aiwf story feature "Add team invitation flow"
aiwf story bugfix "Fix failed login redirect"
aiwf story refactor "Split billing service"
aiwf validate ai/04-stories/<story-file>.md
aiwf gates
aiwf sensitive HEAD~1 HEAD
aiwf review ai/04-stories/<story-file>.md
```

Node fallback：

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js start "Analyze this repo and map it"
```

---

## Prompt Generator Commands

### `aiwf start [request]`

生成通用的 AI-PhellOS startup prompt。用于让 agent 分类用户意图、推断执行环境、选择 workflow mode、选择最小安全 squad、识别所需 artifacts，并决定第一个安全动作。

### `aiwf map [repo-focus]`

生成 Existing Project Understanding prompt。用于修改陌生仓库之前。预期输出是 repository map 和 memory update，而不是 production code。

### `aiwf brainstorm <idea>`

生成 pre-brief brainstorming prompt。用于产品想法模糊或不成熟时。agent 应该每次只问一个高价值问题，并在 PRD、architecture 或 code 之前产出 Brainstorming Handoff。

### `aiwf plan <feature-or-change>`

生成 feature、bugfix、refactor、migration 或其他 change 的 planning prompt。预期输出包括 routing、impact analysis、acceptance criteria、scope、tests、rollback、stop conditions 和推荐的 story title。

---

## Workflow Modes

| Mode | Purpose | First Safe Action |
| --- | --- | --- |
| Brainstorming / Pre-brief shaping | 将模糊想法转化为 problem、user、MVP boundary、risks 和 handoff | 问一个高价值问题 |
| New Project | 从 brief 进入 discovery、PRD、architecture、stories 和 implementation | 创建 intake 和 project brief |
| Existing Project Understanding | 在编码前 map repository | 创建 `PROJECT_MAP.md` |
| New Feature in Existing Project | 安全地规划和执行 feature | 创建 impact analysis |
| Bugfix | 复现、测试、最小修复并防止 regression | 复现 bug |
| Refactor | 在不改变行为的情况下改进结构 | 定义要保留的行为 |
| Autonomous Phase | 仅在有 contract 时执行 bounded automation | 创建 autonomous phase contract |

---

## Agent Squad Model

| Agent | Responsibility | Use When |
| --- | --- | --- |
| Orchestrator | 路由工作，控制 scope、budget、gates 和 handoffs | 总是从这里开始 |
| Product | Problem、user、scope、non-goals、acceptance criteria | Ideas、新产品、模糊 features |
| Architect | Architecture、data model、APIs、dependencies、trade-offs | 新项目、高风险变更、integrations |
| Implementer | 一个 story，tests first，最小有用变更 | Story ready 时 |
| QA | Acceptance criteria、test plan、edge cases、regressions | 实现前或实现后 |
| Security | Auth、permissions、data exposure、secrets、abuse paths | 敏感区域 |
| Reviewer | Senior engineering review、maintainability、simplicity | 非平凡 diffs |
| Release | Readiness、rollback、known issues、deployment risk | Shipping 或 deployment |

默认规则：

```text
使用安全完成任务所需的最少 agents。
```

---

## Documentation Map

入口文件：

- `AGENTS.md` — Codex 和 generic agent instructions。
- `CLAUDE.md` — Claude Code-specific instructions。
- `.codex/config.toml` — Codex safety profile。
- `.claude/settings.json` — Claude Code command guardrails。

核心规则：

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/00-rules/DEFINITION_OF_READY.md`
- `ai/00-rules/CHANGE_SIZE_POLICY.md`
- `ai/00-rules/GIT_WORKFLOW.md`

Intake 和 planning：

- `ai/09-intake/INTENT_ROUTER.md`
- `ai/09-intake/QUESTION_STRATEGY.md`
- `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`
- `ai/09-intake/INTAKE.template.md`
- `ai/09-intake/stack-profiles/`

Agents 和 execution：

- `ai/agents/ORCHESTRATOR.md`
- `ai/agents/ROUTING_MATRIX.md`
- `ai/agents/SQUAD_LEVELS.md`
- `ai/05-execution/EXECUTION_PROTOCOL.md`
- `ai/06-reviews/REVIEW_CHECKLIST.md`

可选 integrations：

- `ai/10-integrations/ruflo/` — optional Ruflo execution-adapter policy、workflow mapping、prompts、templates 和 reports。

---

## Optional Ruflo Integration

Ruflo support 是一个可选 execution-adapter integration，适合使用 Claude Code 并希望进行 bounded multi-agent execution、swarms、test generation、browser checks、diff review、documentation support、security review 或 controlled autonomous phases 的团队。

AI-PhellOS 不 vendoring、不安装、不 pin 版本、不更新也不管理 Ruflo。

推荐用法：

```text
AI-PhellOS prepares the work.
Ruflo executes the approved bounded phase, if installed and appropriate.
AI-PhellOS verifies, reviews, releases, and updates memory.
```

不要用 Ruflo 替代 AI-PhellOS 的 routing、specs、Definition of Ready、quality gates、sensitive-area approval、review 或 release。

---

## Development

```bash
npm test
node scripts/aiwf.js doctor
npm run pack:dry-run
```

CLI 有意使用 Node.js built-ins，并尽量保持依赖最少。

---

## License

MIT
