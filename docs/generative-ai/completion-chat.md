---
sidebar_position: 2
---

# Autocompletado y Chat Contextual

Analizamos **Code Completion** y **Chat** como capa base de productividad.

## 1. Definición

- **Completion:** Sugerencias en línea (multi‑token) a partir de contexto cercano (ventana de código + modelo de lenguaje).
- **Chat:** Interfaz conversacional capaz de razonar con múltiples archivos, historial y herramientas (extensions/skills).

## 2. GitHub Copilot (Referencia)

| Aspecto | Completion | Copilot Chat |
|---------|-----------|--------------|
| Contexto | Archivo actual + buffers abiertos | Archivo(s), repo index, símbolos, docs, KB opcional |
| Profundidad | Alta para patrones repetitivos | Razonamiento multi‑paso, preguntas exploratorias |
| Limitaciones | Menor control semántico global | Puede requerir re‑prompting para pasos largos |
| Valor Clave | Velocidad de escritura | Asistencia explicativa y refactor guiado |

### Funcionalidades Clave

- Sugerencias inline y "next edit suggestions" (VSCode).
- Chat con roles (explicar código, generar tests, refactorizar, crear PR).
- Skills / Extensions para integrar herramientas externas.

## 3. Alternativas Principales

| Herramienta | Diferenciador | Riesgos / Consideraciones |
|-------------|---------------|---------------------------|
| Cursor | Chat side-by-side + agente de refactor multi‑archivo rápido | Modelo puede sobregenerar cambios; requiere revisión |
| Claude Code | Respuestas largas coherentes y seguras | Menor integración directa con GitHub PR hoy |
| Codeium | Gratuito para features base | Calidad variable en dominios muy específicos |
| Sourcegraph Cody | Comprensión profunda repo grande | Configuración inicial (index) más compleja |
| Amazon Q | Integración AWS infra y configuración | Requiere ecosistema AWS para máximo valor |

## 4. Flujo Recomendado (Repositorio Actual)

1. Abrir archivo objetivo (ej: `src/hooks/useFetchData.ts`).
2. Escribir encabezado de función/interface -> aceptar completion si coincide con diseño.
3. En Chat: "Explica responsabilidades de useFetchData y genera test Vitest (happy + error)".
4. Revisar resultado, integrar snippet test en `src/__tests__/`.
5. Solicitar refactor: "Extrae lógica de reintento a helper separado".

### Prompt Base (Chat)

```text
Contexto: Hook useFetchData actual. Quiero añadir soporte a cancelación AbortController y testearlo.
Tareas:
1. Refactor para aceptar signal externo o crear uno interno.
2. Actualizar tipado genérico.
3. Generar test que verifique cancelación.
Formato: diff + explicación corta.
```

## 5. Métricas Sugeridas

| Métrica | Cómo medir | Meta inicial |
|---------|-----------|--------------|
| Aceptación de sugerencias (%) | (# aceptadas)/(# mostradas) | 25–40% |
| Latencia mediana (ms) | VSCode telemetry / logs | < 1200 ms |
| Tiempo ahorro por story | (Estimado manual) | ≥ 15% |
| Bugs por cambio asistido | Incidencias QA | No superior a baseline |

## 6. Buenas Prácticas

- Revisar cada completion (no aceptación ciega).
- Limitar prompts a objetivos concretos (evitar mezcla de 5 tareas heterogéneas).
- Encadenar: completion para scaffolding + chat para refinar + agente para tareas largas.
- Añadir contexto relevante (archivos críticos) pegando fragmentos acotados.

## 7. Decisión de Uso

Usar **Copilot** como baseline; complementar con Cursor o Cody en repos monolíticos muy grandes o cuando necesitemos refactors multi‑archivo agresivos fuera del modo agente.

---
**Siguiente:** `coding-agent.md` para agentes autónomos y modos de edición.
