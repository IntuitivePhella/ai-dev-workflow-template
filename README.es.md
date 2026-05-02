# Plantilla de Workflow de Desarrollo con IA

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [中文](README.zh-CN.md)

Una plantilla de repositorio y CLI instalable para desarrollo de software asistido por IA con **Codex** o **Claude Code**.

El workflow es:

```text
BMAD-first, Superpowers-enforced, SuperClaude-assisted, GStack-reviewed, GSD/RalphLoop-bounded, Orchestrator-routed, Intent-adaptive.
```

O, más directamente:

```text
Con brainstorming. Guiado por especificación. Reforzado por pruebas. Ruteado por especialistas. Controlado por revisión. Limitado por automatización segura. Adaptado a la intención y stack del usuario.
```

En la práctica:

```text
1. Entender el proyecto o la idea
2. Clasificar intención, madurez y stack deseado
3. Ejecutar brainstorming guiado cuando la idea es vaga
4. Crear o actualizar especificaciones
5. Dividir el trabajo en historias pequeñas
6. Validar readiness antes de implementar
7. Rutear al squad más pequeño y seguro
8. Ejecutar con pruebas primero
9. Revisar desde producto, ingeniería, QA, seguridad y release
10. Liberar con rollback y actualización de memoria
```

Esta plantilla es intencionalmente neutral respecto a la herramienta y multiplataforma. Funciona con:

- Codex mediante `AGENTS.md`, `.codex/config.toml`, agentes Markdown, context packs y skills
- Claude Code mediante `CLAUDE.md`, `.claude/settings.json` y adapters de subagents nativos en `.claude/agents/`
- Cualquier agente de código que pueda leer instrucciones Markdown
- Una CLI en Node.js para Linux, macOS y Windows
- Scripts Bash como fallback para Linux, macOS, Git Bash y WSL

## Experiencia adaptativa del usuario

El framework empieza desde la intención del usuario, no desde un camino fijo.

Si el usuario solo tiene una idea, el flujo es:

```text
Idea cruda
→ Intent Router
→ Clasificación de madurez del proyecto
→ Brainstorming Playbook
→ Una pregunta de alto impacto a la vez
→ Brainstorming Handoff
→ Intake
→ Project Brief
→ Discovery
→ PRD
→ Architecture
→ Story split
→ Primera story lista
```

Si el usuario ya tiene una stack y una dirección inicial de producto, el flujo es:

```text
Solicitud en lenguaje natural
→ Intent Router
→ Stack Profile
→ Brainstorming si el producto aún es vago
→ Artefactos requeridos
→ Squad seguro más pequeño
→ Primera story segura
→ Implementación con TDD
→ Review y actualización de memoria
```

Ejemplo de idea vaga:

```text
Tengo una idea para una app para escuelas, pero todavía no sé exactamente qué construir.
```

Resultado esperado:

```text
Project maturity: Idea only
Pre-brief phase: Brainstorming
Squad: Orchestrator + Product
First safe action: crear un artefacto de brainstorming y hacer una pregunta de alto impacto sobre el problema/usuario principal
Sin código de producción todavía
```

Ejemplo con Claude Code + Next.js + React + Convex:

```text
Usa Claude Code para crear una web app con Next.js, React y Convex.
```

El Orchestrator debe rutear por:

```text
1. ai/09-intake/INTENT_ROUTER.md
2. ai/09-intake/QUESTION_STRATEGY.md
3. ai/09-intake/BRAINSTORMING_PLAYBOOK.md si producto/usuario/MVP todavía son vagos
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
Project maturity: Rough concept, salvo que producto/usuario/MVP ya estén claros
Project type: Web app / SaaS candidate
Stack profile: Next.js + React + Convex
Workflow mode: Brainstorming primero si está vago; si no, New Project
Squad level: Level 2 por defecto; Level 3 si incluye auth, billing, permisos, datos de usuario, migrations o deploy
First safe action: hacer brainstorming si es necesario, luego crear intake, project brief, PRD, architecture, test plan y primera story antes de código de producción
```

## Instalación en cualquier repositorio

Después de publicar en npm:

```bash
npx ai-dev-workflow-template install existing .
```

Para un nuevo proyecto:

```bash
npx ai-dev-workflow-template install new ./my-new-app
```

Antes de publicar en npm, desde un clone de este repositorio:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

El comando de instalación copia los assets del workflow al repositorio objetivo sin sobrescribir archivos existentes e inicializa el workflow para proyecto nuevo o existente.

## CLI multiplataforma

La capa de comandos recomendada es Node.js:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js init new
node scripts/aiwf.js story feature "Add team invitation flow"
node scripts/aiwf.js validate ai/04-stories/<story-file>.md
node scripts/aiwf.js review ai/04-stories/<story-file>.md
```

Después de link local:

```bash
npm link
aiwf help
aiwf doctor
aiwf story feature "Add team invitation flow"
```

Consulta `docs/CROSS_PLATFORM_INSTALL.md` para Linux, macOS, Windows PowerShell, Windows CMD, Git Bash y WSL.

Consulta `docs/PUBLISHING.md` para instrucciones de publicación en npm.

## Referencias de workflow

Esta plantilla fue diseñada después de comparar y extraer los mejores patrones operativos de estos workflows/frameworks de desarrollo con IA:

- **BMAD-METHOD** — backbone de ciclo de vida para brainstorming de producto, discovery, PRD, arquitectura, épicos, stories e implementación agentic.
- **Superpowers** — capa de disciplina de ingeniería: brainstorming antes de código, worktrees, planificación, TDD, ejecución con subagents, review y finalización de branch.
- **SuperClaude Framework** — acelerador de ejecución en Claude Code: análisis de repositorio, implementación, pruebas, troubleshooting, documentación, context save/load y agentes técnicos especializados.
- **GStack** — capa de revisión multi-rol: CEO/producto, engineering manager, diseñador, QA, release y documentación.
- **GSD / Get Shit Done** — descomposición en fases, control de ventana de contexto y ejecución acotada.
- **RalphLoop / Ralph-style execution loops** — patrón opcional de automatización acotada para una fase pequeña y bien especificada a la vez, con stop conditions explícitas.

Este repositorio **no** vendorea ni reimplementa esos proyectos. Convierte sus mejores ideas en un sistema operativo portátil, markdown-first, para desarrollo asistido por IA.

## Qué optimiza este workflow

- Entendimiento de proyectos existentes antes de cambios
- Brainstorming BMAD-style antes del project brief
- Creación de nuevos proyectos desde brainstorm hasta brief, arquitectura y stories
- Intake adaptativo desde intención en lenguaje natural
- Adaptación por stack profile
- Ejecución en stories pequeñas
- Definition of Ready antes de implementar
- TDD-first o implementación test-aware
- Quality gates explícitos
- Squads especialistas activados solo cuando son útiles
- Subagents nativos para Claude Code
- Agentes Markdown y context packs compatibles con Codex
- Revisión por producto, ingeniería, QA, seguridad y release
- Ejecución autónoma acotada solo cuando la fase es segura y especificada
- Memoria durable entre sesiones de IA
- Menor desperdicio de tokens con context packs y reglas de routing
- Checks scriptables que reducen dependencia de obediencia al prompt

## Archivos principales

```text
AGENTS.md                                            # Instrucciones para Codex y agentes genéricos
CLAUDE.md                                            # Instrucciones específicas para Claude Code
.codex/config.toml                                   # Perfil de seguridad de Codex
.claude/settings.json                                # Allow/deny list de comandos de Claude Code
.claude/agents/*.md                                  # Adapters de subagents nativos para Claude Code
package.json                                         # Metadatos de la CLI Node

ai/00-rules/AI_RULES.md                              # Reglas no negociables y stop conditions
ai/00-rules/WORKFLOW_MODES.md                        # Workflow adecuado para cada tipo de trabajo
ai/00-rules/QUALITY_GATES.md                         # Gates antes de avanzar fases
ai/00-rules/DEFINITION_OF_READY.md                   # Readiness antes de implementar
ai/00-rules/CHANGE_SIZE_POLICY.md                    # Cuándo dividir o escalar trabajo
ai/00-rules/GIT_WORKFLOW.md                          # Branch, commit, PR, merge y rollback

ai/09-intake/INTENT_ROUTER.md                        # Routing de intención natural a workflow
ai/09-intake/QUESTION_STRATEGY.md                    # Estrategia progresiva de preguntas
ai/09-intake/BRAINSTORMING_PLAYBOOK.md               # Ideación guiada BMAD-style
ai/09-intake/INTAKE.template.md                      # Artefacto de intake adaptativo
ai/09-intake/stack-profiles/*.md                     # Perfiles de stack
ai/skills/*.md                                       # Skills reutilizables

ai/agents/ORCHESTRATOR.md                            # Reglas de routing y decisión
ai/agents/ROUTING_MATRIX.md                          # Qué especialistas llamar y cuándo
ai/agents/SQUAD_LEVELS.md                            # Tamaños de squad conscientes de tokens
ai/agents/HANDOFF.template.md                        # Contrato de handoff entre agentes
ai/agents/CONTEXT_PACK.template.md                   # Paquete mínimo de contexto para especialistas
ai/agents/AGENT_OUTPUTS.md                           # Formatos estandarizados de salida

ai/templates/BRAINSTORMING.template.md               # Template de brainstorming guiado
ai/templates/STORY.template.md                       # Template de story genérica
ai/templates/FEATURE.template.md                     # Template de feature
ai/templates/BUGFIX.template.md                      # Template de bugfix
ai/templates/REFACTOR.template.md                    # Template de refactor
ai/templates/MIGRATION.template.md                   # Template de migration
```

## Modelo de squad de agentes

El workflow usa un modelo de squad ruteado por el Orchestrator.

Especialistas disponibles:

```text
Orchestrator  # rutea trabajo, controla alcance, budget, gates y handoffs
Product       # problema, usuario, alcance, non-goals, acceptance criteria
Architect     # arquitectura, data model, APIs, dependencias, trade-offs
Implementer   # una story, pruebas primero, menor cambio útil
QA            # acceptance criteria, test plan, edge cases, regresiones
Security      # auth, permisos, exposición de datos, secrets, abuso
Reviewer      # review senior de ingeniería, maintainability, simplicidad
Release       # readiness, rollback, known issues, deployment risk
```

Regla por defecto:

```text
Usa el menor número de agentes necesario para completar la tarea con seguridad.
```

Durante brainstorming, usa por defecto Orchestrator + Product. Añade Architect solo cuando la viabilidad técnica o la elección de stack importe. No llames a Implementer durante brainstorming.

## Modos de workflow

Usa el modo más pequeño que resuelva el trabajo:

0. **Brainstorming / Pre-brief shaping** — idea vaga hacia problema, usuario, MVP boundary, riesgos y handoff.
1. **New Project** — idea hacia brief, discovery, PRD, architecture, stories e implementación.
2. **Existing Project Understanding** — mapear repositorio antes de programar.
3. **New Feature in Existing Project** — feature brief, impact analysis, test plan, story, ejecución y review.
4. **Bugfix** — reproducción, test fallando, corrección mínima y regression test.
5. **Refactor** — mejora estructural sin cambio de comportamiento, con safety tests.
6. **Autonomous Phase** — automatización acotada solo con contrato explícito.

## Quick start para idea vaga

```text
Tengo una idea para una app, pero todavía no sé exactamente qué construir.
Usa primero el Brainstorming Playbook.
No escribas código de aplicación.
Haz una pregunta de alto impacto a la vez y produce un Brainstorming Handoff antes de crear el Project Brief.
```

## Quick start para Claude Code + Next.js + React + Convex

```text
Usa Claude Code para crear una web app con Next.js, React y Convex.
Empieza con ai/09-intake/INTENT_ROUTER.md y ai/09-intake/stack-profiles/web-nextjs-react-convex.md.
Si producto/usuario/MVP son vagos, ejecuta primero ai/09-intake/BRAINSTORMING_PLAYBOOK.md.
Usa .claude/agents/orchestrator.md primero.
Crea o actualiza ai/09-intake/INTAKE.md, ai/01-discovery/PROJECT_BRIEF.md, ai/02-product/PRD.md, ai/03-architecture/ARCHITECTURE.md, ai/05-execution/TEST_PLAN.md y una primera story pequeña en ai/04-stories/.
No implementes auth, billing, datos de usuario, deploy de producción ni cambios en datos de producción Convex sin aprobación explícita.
No escribas código de producción hasta que la primera story satisfaga la Definition of Ready.
```

## Regla central

Nunca le pidas a un agente de IA “construye la app”.

Pídele ejecutar **una story** con:

- acceptance criteria claros
- archivos en alcance
- archivos/áreas explícitamente prohibidos
- pruebas requeridas
- comandos a ejecutar
- non-goals
- stop conditions
- rollback plan
- review checklist
- routing de especialistas solo cuando sea útil
- Definition of Ready satisfecha antes de implementar
