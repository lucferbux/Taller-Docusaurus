---
slug: generative-rules
title: Reglas Efectivas para IA Generativa (Copilot & Cursor)
authors: [lucferbux]
tags: [ai, generative, productivity, governance]
---

En este post introducimos el concepto de **reglas para asistentes de IA generativa** ("Copilot Rules", "Cursor Rules") como un mecanismo ligero de alineación: documentos cortos que definen estilo, límites, convenciones y prioridades para que las sugerencias y acciones de un agente / modelo se ajusten a nuestra arquitectura y estándares.

> Objetivo: Reducir re-trabajo y divergencias estableciendo expectativas explícitas para la IA antes de generar o refactorizar código.

## ¿Por qué Definir Reglas?

| Problema Observado | Síntoma | Regla Mitiga |
|--------------------|---------|--------------|
| Sugerencias inconsistentes de estilos | Clases utilitarias mezcladas con estilos inline | Regla unifica Tailwind + shadcn |
| Código sin tests | PR sin cobertura mínima | Regla exige pruebas unitarias/edge |
| Lógica duplicada | Hooks replicados | Regla obliga a reutilizar helpers existentes |
| Descripciones PR pobres | Contexto insuficiente | Regla estructura plantillas descriptivas |

Beneficios: menor tiempo de revisión, uniformidad arquitectónica, onboarding acelerado y trazabilidad de decisiones.

## Anatomía de una Buena Regla

1. Contexto (1–2 líneas) — ¿qué escenario cubre?
2. Directiva concreta (imperativo) — "Usa X / Evita Y".
3. Justificación breve — por qué importa (rendimiento, DX, seguridad).
4. Ejemplo antes/después (cuando aplica).
5. Criterio de verificación (cómo comprobar cumplimiento).

> Mantener cada regla atómica: si una directiva requiere excepciones complejas, dividirla.

## Archivos y Ubicación

| Herramienta | Archivo sugerido | Propósito |
|-------------|------------------|-----------|
| GitHub Copilot (Chat / Agent) | `docs/ai/copilot-rules.md` | Alinear generación y PRs agentes |
| Copilot Custom Instructions | Interfaz web (campo organización/usuario) | Persistir estilo global respuestas |
| Cursor | `.cursor/rules` (o `cursor/rules.md`) | Controlar refactors y planes multi‑archivo |
| Repos multi-equipo | `docs/ai/shared-rules.md` | Núcleo común (evitar duplicación) |

Estructura mínima recomendada de `copilot-rules.md`:

```markdown
# Copilot Rules

## Estilos
Usa exclusivamente Tailwind + componentes shadcn; prohíbe styled-components.

## Tests
Toda nueva función pública requiere test (happy + error). Si es hook: probar estados loading/error.

## Arquitectura
Preferir extracción a hooks/utilities antes de duplicar lógica > 2 líneas repetidas.

## PRs
Incluir sección "Contexto" + "Cambios" + "Riesgos" + "Tests".
```

## Ejemplos de Reglas Concretas

### 1. Estilos (Tailwind + shadcn)

**Regla:** Usa clases utilitarias y componentes generados con `npx shadcn add` evitando duplicar estilos en archivos sueltos.

**Justificación:** Consistencia visual y menor CSS muerto.

**Anti‑patrón:**

```tsx
<div style={{ marginTop: 12, color: '#333' }}>Hola</div>
```

**Correcto:**

```tsx
<div className="mt-3 text-foreground">Hola</div>
```

### 2. Hooks Reutilizables

**Regla:** Extrae efectos compartidos a un hook cuando se repita el mismo `useEffect` en ≥ 2 componentes.

**Verificación:** Buscar patrón por regex antes de introducir segundo duplicado.

### 3. Autenticación

**Regla:** Toda lógica nueva que necesite usuario autenticado debe consumir `useAuth()` y nunca acceder directo a `localStorage`.

**Justificación:** Encapsular persistencia y reducir fugas.

### 4. Testing

**Regla:** Añade test Vitest para cualquier rama condicional nueva (if/else, early return).

**Criterio:** Revisar diff: cada `if (` agregado implica test nuevo o ampliado.

### 5. Estructura de Commits / PR

**Regla:** Commits atómicos: *scaffold*, *feature*, *refactor*, *tests*, *docs*.

**Plantilla PR:**

```markdown
## Contexto
Motivación breve.

## Cambios
- Lista clara

## Riesgos
- Riesgos y mitigaciones

## Tests
- Casos añadidos
```

## Ejemplo de Archivo `.cursor/rules`

```text
RULE: Prefer tailwind utility classes over inline styles.
WHY: Ensures consistency and leverages design tokens.
CHECK: No `style={` unless dynamic calc; else refactor.

RULE: For new hooks include JSDoc with params + return description.
WHY: Mejora DX y autocompletado.
CHECK: grep `use[A-Z].+\nexport` then verify preceding comment.

RULE: When adding a context provider update providers tree in main.tsx.
WHY: Evita fallos en componentes consumidores.
CHECK: Diff must show main.tsx change if new context file added.
```

## Integración en Flujos Copilot Agent

1. Issue incluye enlace a reglas.
2. Primer mensaje al agente: "Respeta `docs/ai/copilot-rules.md`".
3. Tras PR generado, solicitar resumen justificación de cualquier desviación.

## Métricas de Efectividad

| Métrica | Cómo Medir | Meta |
|---------|-------------|------|
| Violaciones detectadas por revisión | Conteo manual semanal | Tendencia ↓ |
| Cobertura en PRs generados por agente | % PR con sección completa | > 95% |
| Duplicación lógica (ej: hooks) | Sonar/grep heurístico | < baseline |

## Buenas Prácticas de Mantenimiento

- Revisar reglas trimestralmente (evitar obsolescencia).
- Marcar reglas experimentales con prefijo `EXP:`.
- Archivar reglas deprecadas en sección changelog dentro del mismo archivo.

## Checklist de Adopción

```text
[ ] Archivo copilot-rules.md creado
[ ] Archivo .cursor/rules creado
[ ] Referencia añadida a README
[ ] Issues plantilla enlazan reglas
[ ] Métricas tracking definidas
```

## Conclusión

Definir un set pequeño y evolutivo de reglas crea una capa de alineación que transforma la IA de asistente genérico a **par programador contextualizado**. Mantén las reglas vivas: si una no aporta valor medible, se simplifica o elimina.
