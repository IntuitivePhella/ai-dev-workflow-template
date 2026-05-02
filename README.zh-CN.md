# AI 开发工作流模板

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [中文](README.zh-CN.md)

这是一个可安装的仓库模板和 CLI，用于通过 **Codex** 或 **Claude Code** 进行有纪律的 AI 辅助软件开发。

该工作流是：

```text
BMAD-first, Superpowers-enforced, SuperClaude-assisted, GStack-reviewed, GSD/RalphLoop-bounded, Orchestrator-routed, Intent-adaptive.
```

更直接地说：

```text
先头脑风暴。由规格驱动。由测试约束。由专家路由。由评审把关。由安全边界限制自动化。根据用户意图和技术栈自适应。
```

转换成与工具无关的实践：

```text
1. 理解项目或想法
2. 判断用户意图、项目成熟度和期望技术栈
3. 当想法还很模糊时，先进行引导式头脑风暴
4. 创建或更新规格文档
5. 将工作拆分成小 story
6. 在实现前验证 readiness
7. 路由到最小且安全的 specialist squad
8. 测试优先执行
9. 从产品、工程、QA、安全和发布角度进行评审
10. 通过 rollback 和 memory update 完成发布
```

该模板有意保持工具中立并支持跨平台：

- Codex：通过 `AGENTS.md`、`.codex/config.toml`、Markdown agents、context packs 和 skills
- Claude Code：通过 `CLAUDE.md`、`.claude/settings.json` 以及 `.claude/agents/` 中的原生 subagent adapters
- 任何能够读取 Markdown 指令的代码代理
- 支持 Linux、macOS 和 Windows 的 Node.js CLI
- Bash guardrail scripts，可用于 Linux、macOS、Git Bash 和 WSL

## 自适应用户体验

框架从用户意图开始，而不是假设固定路径。

如果用户只有一个想法，流程是：

```text
原始想法
→ Intent Router
→ 项目成熟度分类
→ Brainstorming Playbook
→ 每次一个高价值问题
→ Brainstorming Handoff
→ Intake
→ Project Brief
→ Discovery
→ PRD
→ Architecture
→ Story split
→ 第一个 ready story
```

如果用户已有技术栈和大致产品方向，流程是：

```text
用户自然语言请求
→ Intent Router
→ Stack Profile
→ 如果产品还模糊则先 Brainstorming
→ 必要 artefacts
→ 最小安全 squad
→ 第一个安全 story
→ TDD 实现
→ Review 和 memory update
```

模糊想法示例：

```text
我有一个面向学校的 app 想法，但还不确定到底要构建什么。
```

预期路由结果：

```text
Project maturity: Idea only
Pre-brief phase: Brainstorming
Squad: Orchestrator + Product
First safe action: 创建 brainstorming artifact，并围绕主要问题/用户提出一个高价值问题
暂不编写生产代码
```

Claude Code + Next.js + React + Convex 示例：

```text
使用 Claude Code 创建一个基于 Next.js、React 和 Convex 的 web app。
```

Orchestrator 应该按以下路径路由：

```text
1. ai/09-intake/INTENT_ROUTER.md
2. ai/09-intake/QUESTION_STRATEGY.md
3. 如果产品/用户/MVP 仍然模糊，则使用 ai/09-intake/BRAINSTORMING_PLAYBOOK.md
4. ai/09-intake/INTAKE.template.md
5. ai/09-intake/stack-profiles/web-nextjs-react-convex.md
6. ai/skills/intent-classification.md
7. ai/skills/stack-adaptation.md
8. ai/agents/ROUTING_MATRIX.md
```

预期结果：

```text
Tool target: Claude Code
Project state: New project
Project maturity: Rough concept，除非 product/user/MVP 已经清楚
Project type: Web app / SaaS candidate
Stack profile: Next.js + React + Convex
Workflow mode: 如果模糊则先 Brainstorming，否则 New Project
Squad level: 默认 Level 2；如果涉及 auth、billing、permissions、user data、migrations 或 deployment，则 Level 3
First safe action: 如有必要先 brainstorming，然后创建 intake、project brief、PRD、architecture、test plan 和第一个 story，再写生产代码
```

## 安装到任意仓库

发布到 npm 后：

```bash
npx ai-dev-workflow-template install existing .
```

用于新项目目录：

```bash
npx ai-dev-workflow-template install new ./my-new-app
```

在 npm 发布前，可从该仓库 clone 后使用：

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

安装命令会将 workflow assets 复制到目标仓库，且不会覆盖已有文件，然后初始化 new-project 或 existing-project workflow。

## 跨平台 CLI

推荐使用 Node.js 命令层：

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js init new
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

本地 link 后可使用短命令：

```bash
npm link
aiwf help
aiwf doctor
aiwf story feature "Add team invitation flow"
```

Linux、macOS、Windows PowerShell、Windows CMD、Git Bash 和 WSL 的使用方式见 `docs/CROSS_PLATFORM_INSTALL.md`。

npm 发布说明见 `docs/PUBLISHING.md`。

## 工作流参考

该模板是在比较并提取以下 AI 开发工作流/框架的强模式后设计的：

- **BMAD-METHOD** — 用于产品头脑风暴、产品 discovery、PRD、架构、epics、stories 和 agentic implementation 的生命周期骨架。
- **Superpowers** — 工程纪律层：编码前 brainstorming、worktrees、planning、TDD、subagent-driven execution、review 和 branch finalization。
- **SuperClaude Framework** — Claude Code 执行加速器：仓库分析、实现、测试、排障、文档、context save/load 和 specialized technical agents。
- **GStack** — 多角色 review 层：CEO/product、engineering manager、designer、QA、release 和 documentation perspectives。
- **GSD / Get Shit Done** — phase decomposition、context-window control 和 bounded execution phases。
- **RalphLoop / Ralph-style execution loops** — 可选的 bounded automation 模式，每次只执行一个小而明确的 phase，并带有明确 stop conditions。

本仓库**不会 vendoring 或重新实现**这些项目。它将它们最强的 workflow ideas 转化为一个 portable、markdown-first 的 AI 辅助开发操作系统。

## 该 workflow 优化什么

- 在修改前理解 existing project
- 在 project brief 前进行 BMAD-style idea shaping 和 brainstorming
- 从 brainstorm 到 brief、architecture、stories 的新项目创建流程
- 从自然语言意图开始的 adaptive intake
- 通过 stack profiles 进行技术栈适配
- small story-based execution
- 实现前 Definition of Ready
- TDD-first 或 test-aware implementation
- 明确 quality gates
- 只在有用时激活 specialist squads
- Claude Code native subagent adapters
- 与 Codex 兼容的 Markdown agents 和 context packs
- 从 product、engineering、QA、security 和 release 角度 review
- 仅在阶段安全且明确时进行 bounded autonomous execution
- AI sessions 之间的 durable project memory
- 通过 context packs 和 routing rules 减少 token 浪费
- 通过 scriptable checks 降低对 prompt obedience 的依赖

## 核心文件

```text
AGENTS.md                                            # Codex 和通用 agents 指令
CLAUDE.md                                            # Claude Code 专用指令
.codex/config.toml                                   # Codex safety profile
.claude/settings.json                                # Claude Code command allow/deny list
.claude/agents/*.md                                  # Claude Code native subagent adapters
package.json                                         # Node CLI package metadata

ai/00-rules/AI_RULES.md                              # 不可违反的规则和 stop conditions
ai/00-rules/WORKFLOW_MODES.md                        # 不同工作类型对应的 workflow
ai/00-rules/QUALITY_GATES.md                         # 进入下一阶段前的 gates
ai/00-rules/DEFINITION_OF_READY.md                   # 实现前 readiness 要求
ai/00-rules/CHANGE_SIZE_POLICY.md                    # 何时拆分或升级工作
ai/00-rules/GIT_WORKFLOW.md                          # Branch、commit、PR、merge 和 rollback 规则

ai/09-intake/INTENT_ROUTER.md                        # 自然语言意图到 workflow 的路由
ai/09-intake/QUESTION_STRATEGY.md                    # 渐进式提问策略
ai/09-intake/BRAINSTORMING_PLAYBOOK.md               # BMAD-style guided idea shaping
ai/09-intake/INTAKE.template.md                      # Adaptive intake artifact
ai/09-intake/stack-profiles/*.md                     # 技术栈 profiles
ai/skills/*.md                                       # 可复用 skills

ai/agents/ORCHESTRATOR.md                            # Orchestrator routing 和 decision rules
ai/agents/ROUTING_MATRIX.md                          # 何时调用哪些 specialists
ai/agents/SQUAD_LEVELS.md                            # token-aware squad sizes
ai/agents/HANDOFF.template.md                        # agent-to-agent handoff contract
ai/agents/CONTEXT_PACK.template.md                   # specialist work 的最小 context bundle
ai/agents/AGENT_OUTPUTS.md                           # 标准化 specialist output formats

ai/templates/BRAINSTORMING.template.md               # guided brainstorming artifact template
ai/templates/STORY.template.md                       # generic story template
ai/templates/FEATURE.template.md                     # feature story template
ai/templates/BUGFIX.template.md                      # bugfix story template
ai/templates/REFACTOR.template.md                    # refactor story template
ai/templates/MIGRATION.template.md                   # migration story template
```

## Agent squad 模型

该 workflow 使用 Orchestrator-routed squad model。

可用 specialists：

```text
Orchestrator  # 路由工作，控制 scope、budget、gates 和 handoffs
Product       # problem、user、scope、non-goals、acceptance criteria
Architect     # architecture、data model、APIs、dependencies、trade-offs
Implementer   # one story, tests first, smallest useful change
QA            # acceptance criteria、test plan、edge cases、regressions
Security      # auth、permissions、data exposure、secrets、abuse paths
Reviewer      # senior engineering review、maintainability、simplicity
Release       # readiness、rollback、known issues、deployment risk
```

默认规则：

```text
使用安全完成任务所需的最少 agents。
```

在 brainstorming 阶段，默认使用 Orchestrator + Product。只有当技术可行性或 stack choice 很重要时才添加 Architect。Brainstorming 阶段不要调用 Implementer。

## Workflow modes

使用能解决任务的最小模式：

0. **Brainstorming / Pre-brief shaping** — 从模糊想法到 problem、user、MVP boundary、risks 和 handoff。
1. **New Project** — 从 idea 到 brief、discovery、PRD、architecture、stories 和 implementation。
2. **Existing Project Understanding** — 编码前先 map repository。
3. **New Feature in Existing Project** — feature brief、impact analysis、test plan、story、execution 和 review。
4. **Bugfix** — reproduction、failing test、minimal fix 和 regression test。
5. **Refactor** — 带 safety tests 的行为保持型结构改进。
6. **Autonomous Phase** — 仅在有明确 contract 时进行 bounded automation。

## 模糊想法 quick start

```text
我有一个 app 想法，但还不确定到底要构建什么。
先使用 Brainstorming Playbook。
不要编写应用代码。
每次只问一个高价值问题，并在创建 Project Brief 前产出 Brainstorming Handoff。
```

## Claude Code + Next.js + React + Convex quick start

```text
使用 Claude Code 创建一个基于 Next.js、React 和 Convex 的 web app。
从 ai/09-intake/INTENT_ROUTER.md 和 ai/09-intake/stack-profiles/web-nextjs-react-convex.md 开始。
如果 product/user/MVP 仍然模糊，先运行 ai/09-intake/BRAINSTORMING_PLAYBOOK.md。
先使用 .claude/agents/orchestrator.md。
创建或更新 ai/09-intake/INTAKE.md、ai/01-discovery/PROJECT_BRIEF.md、ai/02-product/PRD.md、ai/03-architecture/ARCHITECTURE.md、ai/05-execution/TEST_PLAN.md，以及 ai/04-stories/ 下的第一个小 story。
没有明确批准，不要实现 auth、billing、user data、production deploy 或 Convex production data changes。
在第一个 story 满足 Definition of Ready 之前，不要编写生产代码。
```

## 核心规则

永远不要要求 AI agent “build the app”。

要求它执行**一个 story**，并包含：

- 清晰的 acceptance criteria
- scope 内文件
- 明确禁止的文件/区域
- required tests
- commands to run
- non-goals
- stop conditions
- rollback plan
- review checklist
- 仅在有用时进行 specialist routing
- 实现前满足 Definition of Ready
