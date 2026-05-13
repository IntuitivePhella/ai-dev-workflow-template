<div align="center">

# 🚀 AI-PhellOS

### Um sistema operacional para desenvolvimento de software com IA, disciplinado, adaptativo por intenção e compatível com Codex, Claude Code e agentes que leem Markdown.

<p align="center">
  <a href="README.md">English</a> •
  <a href="README.pt-BR.md">Português</a> •
  <a href="README.es.md">Español</a> •
  <a href="README.zh-CN.md">中文</a>
</p>

</div>

---

## O que é o AI-PhellOS

AI-PhellOS é uma camada de workflow portátil e markdown-first para desenvolvimento de software assistido por IA.

Ele ajuda agentes de código a sair de uma intenção bruta até uma implementação pronta para produção por meio de:

```text
Brainstorming → Roteamento de intenção → Especificações → Arquitetura → Stories → TDD → Review → Release
```

A regra central é simples:

```text
Nunca peça para um agente de IA construir o app inteiro.
Peça para ele executar uma story segura, testável e revisável por vez.
```

O comportamento P0 de qualidade mantém bugfixes orientados por diagnóstico, desenvolvimento atento à linguagem de domínio, melhorias estruturais roteadas por architecture deepening e stories classificadas como AFK ou HITL quando julgamento humano pode ser necessário.

O P1 adiciona protótipos descartáveis para incerteza, triagem de intake para pedidos soltos, ADRs para trade-offs duráveis e handoffs que referenciam artefatos duráveis em vez de duplicá-los.

AI-PhellOS não substitui Codex, Claude Code nem adapters opcionais como Ruflo. Ele dá a eles um sistema operacional disciplinado: roteamento, artefatos, prontidão, quality gates, controle de escopo, stop conditions, review, release e memória durável.

---

## Regra central de UX

O usuário deve descrever o que quer criar, entender, alterar, corrigir, refatorar ou automatizar.

O usuário não deve precisar dizer qual ferramenta de IA deve ser usada.

```text
Sessão Claude Code → seguir CLAUDE.md, .claude/settings.json e .claude/agents/*
Sessão Codex       → seguir AGENTS.md, .codex/config.toml, ai/agents/*, context packs e skills
Agente genérico    → seguir AGENTS.md e os arquivos Markdown do workflow
Ruflo, se instalado → atuar apenas como adapter opcional de execução Claude Code para fases aprovadas e limitadas
```

Bons prompts:

```text
Quero criar um web app com Next.js, React e Convex.
```

```text
Tenho uma ideia para um app para escolas, mas ainda não sei o que construir.
```

```text
Analise este repositório existente e mapeie antes de sugerir mudanças.
```

Evite prompts como:

```text
Use Claude Code para construir o app inteiro.
```

```text
Peça para o Ruflo construir o app durante a noite.
```

---

## Quick Start

O AI-PhellOS ainda não foi publicado no npm. Até a publicação do pacote, instale pelo GitHub ou por um clone local.

### Instalação atual via GitHub

Instalar em um repositório existente:

```bash
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf install existing .
```

Iniciar um novo projeto:

```bash
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf install new ./my-new-app
```

### Instalação atual via clone local

Usando um clone deste repositório:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

### Instalação futura via npm, após publicação

```bash
npx ai-phellos install existing .
npx ai-phellos install new ./my-new-app
```

### Gerar um prompt inicial

Após instalação ou link local:

```bash
aiwf start "Quero criar um web app com Next.js, React e Convex"
```

Sem link local:

```bash
node scripts/aiwf.js start "Quero criar um web app com Next.js, React e Convex"
```

Depois cole o prompt gerado no Codex, Claude Code ou outro agente compatível.

---

## Atualizando o AI-PhellOS em um projeto existente

**Não use `install existing` para atualizar.** Esse comando é apenas para primeira instalação.

Para atualizar um projeto AI-PhellOS existente para uma versão mais nova do framework:

```bash
# Visualize as mudanças primeiro (sempre faça isso)
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --dry-run

# Aplique a atualização
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf upgrade . --apply

# Verifique a atualização
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf doctor
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf gates
```

Ou a partir de um clone local do framework atualizado:

```bash
node /path/to/AI-PhellOS/scripts/aiwf.js upgrade /path/to/project --dry-run
node /path/to/AI-PhellOS/scripts/aiwf.js upgrade /path/to/project --apply
```

O comando de upgrade:

- **Nunca sobrescreve artefatos de produto** (PRD, stories, memória, discovery, arquitetura)
- **Nunca sobrescreve package.json**
- **Cria arquivos `.incoming`** quando há conflitos entre arquivos do framework e customizações
- **Gera um relatório de migração** em `ai/08-memory/FRAMEWORK_MIGRATION.md`
- **É idempotente** — executar duas vezes produz o mesmo resultado

Veja `ai/00-rules/FRAMEWORK_UPGRADE_POLICY.md` para detalhes sobre a política de upgrade e regras de classificação de arquivos.

---

## Comandos da CLI

```bash
aiwf help
aiwf doctor
aiwf install existing .
aiwf install new ./my-new-app
aiwf init existing
aiwf init new
aiwf upgrade . --dry-run
aiwf upgrade . --apply
aiwf audit ai/04-stories/<story-file>.md
```

Geradores de prompt:

```bash
aiwf start "Quero criar um SaaS para escolas"
aiwf map "fluxo de autenticação e billing"
aiwf brainstorm "um app para escolas"
aiwf plan "Adicionar fluxo de convite de equipe"
```

Comandos de story e gates:

```bash
aiwf story feature "Add team invitation flow"
aiwf story bugfix "Fix failed login redirect"
aiwf story refactor "Split billing service"
aiwf validate ai/04-stories/<story-file>.md
aiwf gates
aiwf sensitive HEAD~1 HEAD
aiwf review ai/04-stories/<story-file>.md
```

Fallback com Node:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js start "Analise este repo e mapeie"
```

---

## Geradores de prompt

### `aiwf start [request]`

Produz um prompt geral de inicialização do AI-PhellOS. Use quando quiser que o agente classifique a intenção, infira o ambiente, selecione o workflow mode, escolha o menor squad seguro, identifique artefatos e decida a primeira ação segura.

### `aiwf map [repo-focus]`

Produz um prompt de Existing Project Understanding. Use antes de alterar um repositório desconhecido. A saída esperada é um mapa do repositório e uma proposta de atualização de memória, não código de produção.

### `aiwf brainstorm <idea>`

Produz um prompt de brainstorming/pre-brief. Use quando a ideia de produto estiver vaga ou imatura. O agente deve fazer uma pergunta de alto impacto por vez e produzir um Brainstorming Handoff antes de PRD, arquitetura ou código.

### `aiwf plan <feature-or-change>`

Produz um prompt de planejamento para feature, bugfix, refactor, migration ou outra mudança. A saída esperada inclui roteamento, impact analysis, acceptance criteria, escopo, testes, rollback, stop conditions e título recomendado de story.

---

## Workflow Modes

| Modo | Propósito | Primeira ação segura |
| --- | --- | --- |
| Brainstorming / Pre-brief shaping | Transformar ideia vaga em problema, usuário, limite de MVP, riscos e handoff | Fazer uma pergunta de alto impacto |
| New Project | Sair de brief para discovery, PRD, arquitetura, stories e implementação | Criar intake e project brief |
| Existing Project Understanding | Mapear um repositório antes de codar | Criar `PROJECT_MAP.md` |
| New Feature in Existing Project | Planejar e executar uma feature com segurança | Criar impact analysis |
| Bugfix | Reproduzir, testar, corrigir minimamente e prevenir regressão | Reproduzir o bug |
| Refactor | Melhorar estrutura sem alterar comportamento | Definir comportamento preservado |
| Autonomous Phase | Rodar automação limitada somente com contrato | Criar contrato de fase autônoma |

---

## Modelo de squad de agentes

| Agente | Responsabilidade | Quando usar |
| --- | --- | --- |
| Orchestrator | Roteia trabalho, controla escopo, budget, gates e handoffs | Sempre comece aqui |
| Product | Problema, usuário, escopo, non-goals, acceptance criteria | Ideias, novos produtos, features ambíguas |
| Architect | Arquitetura, data model, APIs, dependências, trade-offs | Novos projetos, mudanças arriscadas, integrações |
| Implementer | Uma story, testes primeiro, menor mudança útil | Quando a story está pronta |
| QA | Acceptance criteria, test plan, edge cases, regressões | Antes ou depois da implementação |
| Security | Auth, permissões, exposição de dados, secrets, abuse paths | Áreas sensíveis |
| Reviewer | Review sênior de engenharia, maintainability, simplicidade | Diffs não triviais |
| Release | Readiness, rollback, known issues, risco de deploy | Release ou deploy |

Regra padrão:

```text
Use o menor número de agentes necessário para concluir a tarefa com segurança.
```

---

## Mapa de documentação

Entradas principais:

- `AGENTS.md` — instruções para Codex e agentes genéricos.
- `CLAUDE.md` — instruções específicas para Claude Code.
- `.codex/config.toml` — perfil de segurança do Codex.
- `.claude/settings.json` — guardrails de comandos do Claude Code.

Regras principais:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/00-rules/DEFINITION_OF_READY.md`
- `ai/00-rules/CHANGE_SIZE_POLICY.md`
- `ai/00-rules/GIT_WORKFLOW.md`
- `ai/00-rules/CONTINUOUS_IMPROVEMENT.md`

Intake e planejamento:

- `ai/09-intake/INTENT_ROUTER.md`
- `ai/09-intake/QUESTION_STRATEGY.md`
- `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`
- `ai/09-intake/INTAKE.template.md`
- `ai/09-intake/stack-profiles/`

Agentes e execução:

- `ai/agents/ORCHESTRATOR.md`
- `ai/agents/ROUTING_MATRIX.md`
- `ai/agents/SQUAD_LEVELS.md`
- `ai/05-execution/EXECUTION_PROTOCOL.md`
- `ai/06-reviews/REVIEW_CHECKLIST.md`
- `ai/templates/PRIVACY_AND_SAFETY_REVIEW.template.md`

Specs comportamentais e change packages:

- `ai/config.template.yaml` - Template opcional de configuração do projeto para paths, comandos e regras de artefatos.
- `ai/11-specs/README.md` - Specs comportamentais duráveis.
- `ai/04-changes/README.md` - Workflow opcional de change packages.
- `ai/templates/ADR.template.md`
- `ai/templates/PROTOTYPE_NOTES.template.md`

Integrações opcionais:

- `ai/10-integrations/ruflo/` — política, mapping, prompts, templates e relatórios para adapter opcional Ruflo.

---

## Integração opcional com Ruflo

O suporte ao Ruflo é incluído como integração opcional de execution adapter para times que usam Claude Code e querem execução multiagente limitada, swarms, geração de testes, browser checks, diff review, documentação, security review ou fases autônomas controladas.

AI-PhellOS não vendora, instala, fixa versão, atualiza nem gerencia Ruflo.

Uso recomendado:

```text
AI-PhellOS prepara o trabalho.
Ruflo executa a fase aprovada e limitada, se estiver instalado e for apropriado.
AI-PhellOS verifica, revisa, libera e atualiza memória.
```

Não use Ruflo como substituto de roteamento, specs, Definition of Ready, quality gates, aprovação de áreas sensíveis, review ou release do AI-PhellOS.

---

## Desenvolvimento

```bash
npm test
node scripts/aiwf.js doctor
npm run pack:dry-run
```

A CLI usa intencionalmente recursos nativos do Node.js e mantém dependências mínimas.

---

## Licença

MIT
