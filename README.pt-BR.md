# Template de Workflow de Desenvolvimento com IA

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [中文](README.zh-CN.md)

Um template de repositório e CLI instalável para desenvolvimento de software assistido por IA com **Codex** ou **Claude Code**.

O workflow é:

```text
BMAD-first, Superpowers-enforced, SuperClaude-assisted, GStack-reviewed, GSD/RalphLoop-bounded, Orchestrator-routed, Intent-adaptive.
```

Ou, de forma mais direta:

```text
Com brainstorming. Guiado por especificação. Reforçado por testes. Roteado por especialistas. Controlado por revisão. Limitado por automação segura. Adaptado à intenção e stack do usuário.
```

Na prática, isso significa:

```text
1. Entender o projeto ou ideia
2. Classificar intenção, maturidade e stack desejada
3. Rodar brainstorming guiado quando a ideia ainda for vaga
4. Criar ou atualizar especificações
5. Quebrar o trabalho em pequenas stories
6. Validar prontidão antes da implementação
7. Roteirizar para o menor squad útil e seguro
8. Executar com testes primeiro
9. Revisar por lentes de produto, engenharia, QA, segurança e release
10. Liberar com rollback e atualização de memória
```

Este template é intencionalmente neutro em relação à ferramenta e funciona em múltiplas plataformas:

- Codex via `AGENTS.md`, `.codex/config.toml`, agentes em Markdown, context packs e skills
- Claude Code via `CLAUDE.md`, `.claude/settings.json` e adapters de subagents nativos em `.claude/agents/`
- Qualquer agente de código que consiga ler instruções Markdown
- CLI em Node.js para Linux, macOS e Windows
- Scripts Bash como fallback para Linux, macOS, Git Bash e WSL

## Experiência adaptativa do usuário

O framework começa pela intenção do usuário, e não por um caminho fixo.

Se o usuário tem apenas uma ideia, o fluxo é:

```text
Ideia bruta
→ Intent Router
→ Classificação de maturidade do projeto
→ Brainstorming Playbook
→ Uma pergunta de alto impacto por vez
→ Brainstorming Handoff
→ Intake
→ Project Brief
→ Discovery
→ PRD
→ Architecture
→ Story split
→ Primeira story pronta
```

Se o usuário já tem uma stack e uma direção inicial de produto, o fluxo é:

```text
Pedido em linguagem natural
→ Intent Router
→ Stack Profile
→ Brainstorming se o produto ainda estiver vago
→ Artefatos obrigatórios
→ Menor squad seguro
→ Primeira story segura
→ Implementação com TDD
→ Review e atualização de memória
```

Exemplo de ideia vaga:

```text
Tenho uma ideia para um app para escolas, mas ainda não sei exatamente o que construir.
```

Resultado esperado:

```text
Project maturity: Idea only
Pre-brief phase: Brainstorming
Squad: Orchestrator + Product
First safe action: criar um artefato de brainstorming e fazer uma pergunta de alto impacto sobre o problema/usuário principal
Sem código de produção ainda
```

Exemplo com Claude Code + Next.js + React + Convex:

```text
Use Claude Code para criar um web app com Next.js, React e Convex.
```

O Orchestrator deve rotear por:

```text
1. ai/09-intake/INTENT_ROUTER.md
2. ai/09-intake/QUESTION_STRATEGY.md
3. ai/09-intake/BRAINSTORMING_PLAYBOOK.md se produto/usuário/MVP ainda estiverem vagos
4. ai/09-intake/INTAKE.template.md
5. ai/09-intake/stack-profiles/web-nextjs-react-convex.md
6. ai/skills/intent-classification.md
7. ai/skills/stack-adaptation.md
8. ai/agents/ROUTING_MATRIX.md
```

Resultado esperado:

```text
Tool target: Claude Code
Project state: New project
Project maturity: Rough concept, salvo se produto/usuário/MVP já estiverem claros
Project type: Web app / SaaS candidate
Stack profile: Next.js + React + Convex
Workflow mode: Brainstorming primeiro se estiver vago; caso contrário, New Project
Squad level: Level 2 por padrão; Level 3 se envolver auth, billing, permissões, dados de usuário, migrations ou deploy
First safe action: fazer brainstorming se necessário, depois criar intake, project brief, PRD, architecture, test plan e primeira story antes de código de produção
```

## Instalação em qualquer repositório

Depois de publicar no npm:

```bash
npx ai-dev-workflow-template install existing .
```

Para um novo projeto:

```bash
npx ai-dev-workflow-template install new ./my-new-app
```

Antes da publicação no npm, usando um clone deste repositório:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

O comando de instalação copia os assets do workflow para o repositório alvo sem sobrescrever arquivos existentes e inicializa o workflow para projeto novo ou existente.

## CLI cross-platform

A camada de comandos recomendada é Node.js:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js init new
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

Após link local:

```bash
npm link
aiwf help
aiwf doctor
aiwf story feature "Add team invitation flow"
```

Veja `docs/CROSS_PLATFORM_INSTALL.md` para Linux, macOS, Windows PowerShell, Windows CMD, Git Bash e WSL.

Veja `docs/PUBLISHING.md` para instruções de publicação no npm.

## Referências de workflow

Este template foi desenhado após comparar e extrair os melhores padrões operacionais destes workflows/frameworks de desenvolvimento com IA:

- **BMAD-METHOD** — backbone de ciclo de vida para brainstorming de produto, discovery, PRD, arquitetura, épicos, stories e implementação agentic.
- **Superpowers** — camada de disciplina de engenharia: brainstorming antes de código, worktrees, planejamento, TDD, execução com subagents, review e finalização de branch.
- **SuperClaude Framework** — acelerador de execução no Claude Code: análise de repositório, implementação, testes, troubleshooting, documentação, context save/load e agentes técnicos especializados.
- **GStack** — camada de revisão multi-papel: CEO/produto, engineering manager, designer, QA, release e documentação.
- **GSD / Get Shit Done** — decomposição em fases, controle de janela de contexto e execução limitada.
- **RalphLoop / Ralph-style execution loops** — padrão opcional de automação limitada para uma fase pequena e bem especificada por vez, com stop conditions explícitas.

Este repositório **não** vendora nem reimplementa esses projetos. Ele transforma suas melhores ideias em um sistema operacional portátil, markdown-first, para desenvolvimento assistido por IA.

## O que este workflow otimiza

- Entendimento de projetos existentes antes de alterações
- Brainstorming BMAD-style antes do project brief
- Criação de novos projetos do brainstorm ao brief, arquitetura e stories
- Intake adaptativo a partir da intenção em linguagem natural
- Adaptação por stack profile
- Execução em stories pequenas
- Definition of Ready antes da implementação
- TDD-first ou implementação test-aware
- Quality gates explícitos
- Squads especialistas ativados apenas quando úteis
- Subagents nativos para Claude Code
- Agentes Markdown e context packs compatíveis com Codex
- Revisão por produto, engenharia, QA, segurança e release
- Execução autônoma limitada somente quando a fase for segura e especificada
- Memória durável entre sessões de IA
- Menor desperdício de tokens com context packs e regras de roteamento
- Checks scriptáveis que reduzem dependência de obediência ao prompt

## Arquivos principais

```text
AGENTS.md                                            # Instruções para Codex e agentes genéricos
CLAUDE.md                                            # Instruções específicas para Claude Code
.codex/config.toml                                   # Perfil de segurança do Codex
.claude/settings.json                                # Allow/deny list de comandos do Claude Code
.claude/agents/*.md                                  # Adapters de subagents nativos para Claude Code
package.json                                         # Metadados da CLI Node

ai/00-rules/AI_RULES.md                              # Regras não negociáveis e stop conditions
ai/00-rules/WORKFLOW_MODES.md                        # Workflow adequado para cada tipo de trabalho
ai/00-rules/QUALITY_GATES.md                         # Gates antes de avançar fases
ai/00-rules/DEFINITION_OF_READY.md                   # Prontidão antes de implementar
ai/00-rules/CHANGE_SIZE_POLICY.md                    # Quando dividir ou escalar trabalho
ai/00-rules/GIT_WORKFLOW.md                          # Branch, commit, PR, merge e rollback

ai/09-intake/INTENT_ROUTER.md                        # Roteamento de intenção natural para workflow
ai/09-intake/QUESTION_STRATEGY.md                    # Estratégia progressiva de perguntas
ai/09-intake/BRAINSTORMING_PLAYBOOK.md               # Ideação guiada BMAD-style
ai/09-intake/INTAKE.template.md                      # Artefato de intake adaptativo
ai/09-intake/stack-profiles/*.md                     # Perfis de stack
ai/skills/*.md                                       # Skills reutilizáveis

ai/agents/ORCHESTRATOR.md                            # Regras de roteamento e decisão
ai/agents/ROUTING_MATRIX.md                          # Quais especialistas chamar e quando
ai/agents/SQUAD_LEVELS.md                            # Tamanhos de squad com consciência de token
ai/agents/HANDOFF.template.md                        # Contrato de handoff entre agentes
ai/agents/CONTEXT_PACK.template.md                   # Pacote mínimo de contexto para especialistas
ai/agents/AGENT_OUTPUTS.md                           # Formatos padronizados de saída

ai/templates/BRAINSTORMING.template.md               # Template de brainstorming guiado
ai/templates/STORY.template.md                       # Template de story genérica
ai/templates/FEATURE.template.md                     # Template de feature
ai/templates/BUGFIX.template.md                      # Template de bugfix
ai/templates/REFACTOR.template.md                    # Template de refactor
ai/templates/MIGRATION.template.md                   # Template de migration
```

## Modelo de squad de agentes

O workflow usa um modelo de squad roteado pelo Orchestrator.

Especialistas disponíveis:

```text
Orchestrator  # roteia trabalho, controla escopo, budget, gates e handoffs
Product       # problema, usuário, escopo, non-goals, acceptance criteria
Architect     # arquitetura, data model, APIs, dependências, trade-offs
Implementer   # uma story, testes primeiro, menor mudança útil
QA            # acceptance criteria, test plan, edge cases, regressões
Security      # auth, permissões, exposição de dados, secrets, abuso
Reviewer      # review sênior de engenharia, maintainability, simplicidade
Release       # readiness, rollback, known issues, deployment risk
```

Regra padrão:

```text
Use o menor número de agentes necessário para concluir a tarefa com segurança.
```

Durante brainstorming, use por padrão Orchestrator + Product. Adicione Architect apenas quando viabilidade técnica ou escolha de stack importar. Não chame Implementer durante brainstorming.

## Modos de workflow

Use o menor modo que resolve o trabalho:

0. **Brainstorming / Pre-brief shaping** — ideia vaga para problema, usuário, MVP boundary, riscos e handoff.
1. **New Project** — ideia para brief, discovery, PRD, architecture, stories e implementação.
2. **Existing Project Understanding** — mapear repositório antes de codar.
3. **New Feature in Existing Project** — feature brief, impact analysis, test plan, story, execução e review.
4. **Bugfix** — reprodução, teste falhando, correção mínima e regression test.
5. **Refactor** — melhoria estrutural sem mudança de comportamento, com safety tests.
6. **Autonomous Phase** — automação limitada somente com contrato explícito.

## Quick start para ideia vaga

```text
Tenho uma ideia para um app, mas ainda não sei exatamente o que construir.
Use o Brainstorming Playbook primeiro.
Não escreva código de aplicação.
Faça uma pergunta de alto impacto por vez e produza um Brainstorming Handoff antes de criar o Project Brief.
```

## Quick start para Claude Code + Next.js + React + Convex

```text
Use Claude Code para criar um web app com Next.js, React e Convex.
Comece com ai/09-intake/INTENT_ROUTER.md e ai/09-intake/stack-profiles/web-nextjs-react-convex.md.
Se produto/usuário/MVP estiverem vagos, rode ai/09-intake/BRAINSTORMING_PLAYBOOK.md primeiro.
Use .claude/agents/orchestrator.md primeiro.
Crie ou atualize ai/09-intake/INTAKE.md, ai/01-discovery/PROJECT_BRIEF.md, ai/02-product/PRD.md, ai/03-architecture/ARCHITECTURE.md, ai/05-execution/TEST_PLAN.md e uma primeira story pequena em ai/04-stories/.
Não implemente auth, billing, dados de usuário, deploy de produção ou mudanças em dados de produção Convex sem aprovação explícita.
Não escreva código de produção até a primeira story satisfazer a Definition of Ready.
```

## Regra central

Nunca peça para um agente de IA “construir o app”.

Peça para ele executar **uma story** com:

- acceptance criteria claros
- arquivos em escopo
- arquivos/áreas explicitamente proibidos
- testes obrigatórios
- comandos a executar
- non-goals
- stop conditions
- rollback plan
- review checklist
- roteamento de especialistas apenas quando útil
- Definition of Ready satisfeita antes da implementação
