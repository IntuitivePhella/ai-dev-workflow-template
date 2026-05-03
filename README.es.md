<div align="center">

# 🚀 AI-PhellOS

### Un sistema operativo para desarrollo de software con IA, disciplinado, adaptativo por intención y compatible con Codex, Claude Code y agentes que leen Markdown.

<p align="center">
  <a href="README.md">English</a> •
  <a href="README.pt-BR.md">Português</a> •
  <a href="README.es.md">Español</a> •
  <a href="README.zh-CN.md">中文</a>
</p>

</div>

---

## Qué es AI-PhellOS

AI-PhellOS es una capa de workflow portátil y markdown-first para desarrollo de software asistido por IA.

Ayuda a agentes de código a pasar de una intención bruta a una implementación lista para producción mediante:

```text
Brainstorming → Ruteo de intención → Especificaciones → Arquitectura → Stories → TDD → Review → Release
```

La regla central es simple:

```text
Nunca le pidas a un agente de IA construir toda la app.
Pídele ejecutar una story segura, testeable y revisable a la vez.
```

AI-PhellOS no reemplaza Codex, Claude Code ni adapters opcionales como Ruflo. Les da un sistema operativo disciplinado: ruteo, artefactos, readiness, quality gates, control de alcance, stop conditions, review, release y memoria durable.

---

## Regla central de UX

El usuario debe describir lo que quiere crear, entender, cambiar, corregir, refactorizar o automatizar.

El usuario no debería necesitar decir qué herramienta de IA debe usarse.

```text
Sesión Claude Code → seguir CLAUDE.md, .claude/settings.json y .claude/agents/*
Sesión Codex       → seguir AGENTS.md, .codex/config.toml, ai/agents/*, context packs y skills
Agente genérico    → seguir AGENTS.md y los archivos Markdown del workflow
Ruflo, si está instalado → actuar solo como adapter opcional de ejecución Claude Code para fases aprobadas y acotadas
```

Buenos prompts:

```text
Quiero crear una web app con Next.js, React y Convex.
```

```text
Tengo una idea para una app para escuelas, pero todavía no sé qué construir.
```

```text
Analiza este repositorio existente y mapéalo antes de sugerir cambios.
```

Evita prompts como:

```text
Usa Claude Code para construir toda la app.
```

```text
Pídele a Ruflo que construya la app durante la noche.
```

---

## Quick Start

AI-PhellOS todavía no ha sido publicado en npm. Hasta que el paquete sea publicado, instala desde GitHub o desde un clone local.

### Instalación actual desde GitHub

Instalar en un repositorio existente:

```bash
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf install existing .
```

Iniciar un proyecto nuevo:

```bash
npm exec --yes --package github:IntuitivePhella/AI-PhellOS -- aiwf install new ./my-new-app
```

### Instalación actual desde un clone local

Usando un clone de este repositorio:

```bash
node scripts/aiwf.js install existing /path/to/your/repo
node scripts/aiwf.js install new /path/to/new/project
```

### Instalación futura vía npm, después de publicar

```bash
npx ai-phellos install existing .
npx ai-phellos install new ./my-new-app
```

### Generar un prompt inicial

Después de instalar o hacer link local:

```bash
aiwf start "Quiero crear una web app con Next.js, React y Convex"
```

Sin link local:

```bash
node scripts/aiwf.js start "Quiero crear una web app con Next.js, React y Convex"
```

Luego pega el prompt generado en Codex, Claude Code u otro agente compatible.

---

## Comandos de la CLI

```bash
aiwf help
aiwf doctor
aiwf install existing .
aiwf install new ./my-new-app
aiwf init existing
aiwf init new
```

Generadores de prompt:

```bash
aiwf start "Quiero crear un SaaS para escuelas"
aiwf map "flujo de autenticación y billing"
aiwf brainstorm "una app para escuelas"
aiwf plan "Agregar flujo de invitación de equipo"
```

Comandos de story y gates:

```bash
aiwf story feature "Add team invitation flow"
aiwf story bugfix "Fix failed login redirect"
aiwf story refactor "Split billing service"
aiwf validate ai/04-stories/<story-file>.md
aiwf gates
aiwf sensitive HEAD~1 HEAD
aiwf review ai/04-stories/<story-file>.md
```

Fallback con Node:

```bash
node scripts/aiwf.js help
node scripts/aiwf.js doctor
node scripts/aiwf.js start "Analiza este repo y mapéalo"
```

---

## Generadores de prompt

### `aiwf start [request]`

Produce un prompt general de inicio de AI-PhellOS. Úsalo cuando quieras que el agente clasifique la intención, infiera el entorno, seleccione el workflow mode, elija el squad seguro más pequeño, identifique artefactos y decida la primera acción segura.

### `aiwf map [repo-focus]`

Produce un prompt de Existing Project Understanding. Úsalo antes de cambiar un repositorio desconocido. La salida esperada es un mapa del repositorio y una propuesta de actualización de memoria, no código de producción.

### `aiwf brainstorm <idea>`

Produce un prompt de brainstorming/pre-brief. Úsalo cuando la idea de producto sea vaga o inmadura. El agente debe hacer una pregunta de alto impacto a la vez y producir un Brainstorming Handoff antes de PRD, arquitectura o código.

### `aiwf plan <feature-or-change>`

Produce un prompt de planificación para feature, bugfix, refactor, migration u otro cambio. La salida esperada incluye ruteo, impact analysis, acceptance criteria, alcance, pruebas, rollback, stop conditions y título recomendado de story.

---

## Workflow Modes

| Modo | Propósito | Primera acción segura |
| --- | --- | --- |
| Brainstorming / Pre-brief shaping | Convertir una idea vaga en problema, usuario, límite de MVP, riesgos y handoff | Hacer una pregunta de alto impacto |
| New Project | Pasar de brief a discovery, PRD, arquitectura, stories e implementación | Crear intake y project brief |
| Existing Project Understanding | Mapear un repositorio antes de programar | Crear `PROJECT_MAP.md` |
| New Feature in Existing Project | Planificar y ejecutar una feature con seguridad | Crear impact analysis |
| Bugfix | Reproducir, testear, corregir mínimamente y prevenir regresión | Reproducir el bug |
| Refactor | Mejorar estructura sin cambiar comportamiento | Definir comportamiento preservado |
| Autonomous Phase | Ejecutar automatización acotada solo con contrato | Crear contrato de fase autónoma |

---

## Modelo de squad de agentes

| Agente | Responsabilidad | Cuándo usar |
| --- | --- | --- |
| Orchestrator | Rutea trabajo, controla alcance, budget, gates y handoffs | Siempre empieza aquí |
| Product | Problema, usuario, alcance, non-goals, acceptance criteria | Ideas, nuevos productos, features ambiguas |
| Architect | Arquitectura, data model, APIs, dependencias, trade-offs | Proyectos nuevos, cambios riesgosos, integraciones |
| Implementer | Una story, pruebas primero, menor cambio útil | Cuando la story está lista |
| QA | Acceptance criteria, test plan, edge cases, regresiones | Antes o después de implementación |
| Security | Auth, permisos, exposición de datos, secrets, abuse paths | Áreas sensibles |
| Reviewer | Review senior de ingeniería, maintainability, simplicidad | Diffs no triviales |
| Release | Readiness, rollback, known issues, riesgo de deploy | Release o deploy |

Regla por defecto:

```text
Usa el menor número de agentes necesario para completar la tarea con seguridad.
```

---

## Mapa de documentación

Entradas principales:

- `AGENTS.md` — instrucciones para Codex y agentes genéricos.
- `CLAUDE.md` — instrucciones específicas para Claude Code.
- `.codex/config.toml` — perfil de seguridad de Codex.
- `.claude/settings.json` — guardrails de comandos de Claude Code.

Reglas principales:

- `ai/00-rules/AI_RULES.md`
- `ai/00-rules/WORKFLOW_MODES.md`
- `ai/00-rules/QUALITY_GATES.md`
- `ai/00-rules/DEFINITION_OF_READY.md`
- `ai/00-rules/CHANGE_SIZE_POLICY.md`
- `ai/00-rules/GIT_WORKFLOW.md`

Intake y planificación:

- `ai/09-intake/INTENT_ROUTER.md`
- `ai/09-intake/QUESTION_STRATEGY.md`
- `ai/09-intake/BRAINSTORMING_PLAYBOOK.md`
- `ai/09-intake/INTAKE.template.md`
- `ai/09-intake/stack-profiles/`

Agentes y ejecución:

- `ai/agents/ORCHESTRATOR.md`
- `ai/agents/ROUTING_MATRIX.md`
- `ai/agents/SQUAD_LEVELS.md`
- `ai/05-execution/EXECUTION_PROTOCOL.md`
- `ai/06-reviews/REVIEW_CHECKLIST.md`

Integraciones opcionales:

- `ai/10-integrations/ruflo/` — política, mapping, prompts, templates y reportes para el adapter opcional Ruflo.

---

## Integración opcional con Ruflo

El soporte para Ruflo se incluye como integración opcional de execution adapter para equipos que usan Claude Code y quieren ejecución multiagente acotada, swarms, generación de pruebas, browser checks, diff review, documentación, security review o fases autónomas controladas.

AI-PhellOS no vendorea, instala, fija versión, actualiza ni administra Ruflo.

Uso recomendado:

```text
AI-PhellOS prepara el trabajo.
Ruflo ejecuta la fase aprobada y acotada, si está instalado y es apropiado.
AI-PhellOS verifica, revisa, libera y actualiza memoria.
```

No uses Ruflo como reemplazo del ruteo, specs, Definition of Ready, quality gates, aprobación de áreas sensibles, review o release de AI-PhellOS.

---

## Desarrollo

```bash
npm test
node scripts/aiwf.js doctor
npm run pack:dry-run
```

La CLI usa intencionalmente recursos nativos de Node.js y mantiene dependencias mínimas.

---

## Licencia

MIT
