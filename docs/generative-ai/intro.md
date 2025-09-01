---
sidebar_position: 1
---

# Introducción a Servicios Agénticos y IA Generativa

Esta nueva sección la usaremos para apoyarnos en los siguientes módulos con herramientas generativas. El objetivo principal es enumerar y comparar las capacidades actuales de **GitHub Copilot** (completions, chat, agente, revisiones, etc.) con alternativas líderes (Cursor, Claude Code, CodeRabbit, etc.), analizando casos de uso, ventajas, limitaciones y cómo integrarlos en nuestro repositorio. Vamos con ello.

## Objetivos de la Sección

- Mapear todas las capacidades actuales de Copilot (completion, chat, agente, revisiones, extensiones, etc.).
- Ofrecer comparativas rápidas con herramientas alternativas por cada categoría.
- Definir flujos prácticos de adopción (ejemplos aplicados a nuestro proyecto).
- Establecer criterios de selección (valor, riesgo, coste, compliance, privacidad de datos).
- Proveer prompts / patrones reutilizables.

## Taxonomía de Capacidades

| Categoría | Descripción breve | Referencia Copilot | Alternativas destacadas |
|-----------|-------------------|--------------------|-------------------------|
| Code Completion | Autocompletado contextual multi‑línea | Copilot inline suggestions | Cursor, JetBrains AI, Codeium |
| Chat Contextual | Preguntas/respuestas con contexto de repo | Copilot Chat | Cursor Chat, Claude Code, Code Llama Chat |
| Coding Agent | Agente autónomo que modifica código y PR | Copilot Coding Agent | Sweep AI, Devin (experimental), Aider |
| Code Review AI | Sugerencias automáticas de revisión | Copilot Code Review | CodeRabbit, Amazon Q, ReviewGPT |
| PR Summaries | Resumen de cambios y foco de revisión | Copilot PR Summaries | CodeRabbit Summaries, gpt-review bots |
| Text Completion | Redacción asistida (descripciones PR) | Copilot Text Completion | OpenAI o Claude vía scripts, Amazon Q |
| CLI Assistant | Interacción natural en terminal | Copilot CLI | Warp AI, Fig AI, Shell Genie |
| Extensions (Apps) | Integración de herramientas externas | Copilot Extensions | VSCode Extensions AI, JetBrains Plugins |
| Multi-file Edits | Ediciones asistidas multi‑archivo | Copilot Edits (edit/agent mode) | Sourcegraph Cody, Aider |
| Custom Instructions | Preferencias persistentes de estilo | Copilot Custom Instructions | Cursor settings, OpenAI system prompts |
| Desktop Commit Messages | Mensajes commits automáticos | Copilot in GitHub Desktop | JetBrains AI commits, IntelliJ commit assistant |
| Spaces / Context Hubs | Agrupar contexto y conocimiento | Copilot Spaces | Notion AI workspace, Sourcegraph Contexts |
| Knowledge Bases | Colecciones docs para grounding | Copilot Knowledge Bases | Sourcegraph embeddings, OpenAI RAG stack |
| Spark (App Builder) | Generar apps full‑stack con prompts | GitHub Spark | Vercel v0, Railway AI boilerplates |

## Estructura de la Sección

Cada página profundiza en una categoría: definición, flujo recomendado, configuración mínima, ejemplos, métricas y alternativas.

**Siguiente:** visita `completion-vs` para comenzar con autocompletado y chat.
