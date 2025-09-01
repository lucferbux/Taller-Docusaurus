---
sidebar_position: 3
---

# Agentes de Codificación y Edits Multi‑Archivo

Esta página cubre **Copilot Coding Agent** y **Copilot Edits** (edit mode vs agent mode), comparando con soluciones alternativas.

## 1. Conceptos

| Término | Definición |
|---------|------------|
| Edit Mode | Modo interactivo: delimitas archivos y aceptas/rechazas cada propuesta |
| Agent Mode | Modo autónomo: el agente decide archivos y pasos hasta cumplir la tarea |
| Multi-file Edits | Capacidad de modificar múltiples archivos con un único prompt estructurado |

## 2. GitHub Copilot

**Edit Mode:** Control granular, ideal para cambios focalizados (renombrar hook, ajustar tipados).

**Agent Mode:** Encapsula planificación → ejecución → validación. Puede ejecutar comandos (scripts/test) y iterar hasta cerrar la tarea asignada al issue.

### Casos de Uso Recomendados

| Caso | Modo | Ejemplo en Repo |
|------|------|-----------------|
| Refactor local de hook | Edit | Extraer lógica retry de `useFetchData` |
| Añadir dark mode completo | Agent | Crear `themes.css`, actualizar `tailwind.config.js`, añadir toggle Layout |
| Migrar librería de auth | Agent | Sustituir mock por cliente real y actualizar context |
| Ajustar nombres de tipos | Edit | Renombrar `project.ts` interfaz a `Project` canonical |

## 3. Alternativas

| Herramienta | Enfoque | Diferenciador | Riesgo |
|-------------|---------|---------------|--------|
| Sweep AI | PR automáticos desde issues | Mapea tareas → PR con resumen | Puede generar cambios amplios inesperados |
| Aider | Chat terminal con patch incremental | Control rebases/diffs finos | Requiere manejo manual contexto |
| Cursor Agent | Integrado en editor | Navegación de cambios rápida, UI | Sobregeneración si prompt ambiguo |
| Devin (experimental) | Autonomía amplia (full stack) | Tareas largas multi‑paso | Madurez / coste computacional |

## 4. Flujo Sugerido (Issue → PR)

1. Crear issue con título claro + criterios aceptación.
2. Asignar issue al **Copilot Coding Agent**.
3. Revisar PR generado: validar diffs, tests y coverage.
4. Pedir en Chat: "Resume cambios y su racional técnico" (validar consistencia).
5. Merge tras pasar checks CI.

### Plantilla Issue (Agente)

```markdown
## Objetivo
Implementar dark mode class-based (Tailwind) con toggle persistente.

## Alcance
- Añadir tokens variables CSS (themes.css)
- Configurar `darkMode: 'class'` en tailwind.config.js
- Toggle en Layout con almacenamiento local (localStorage)
- Actualizar documentación `recreacion.md`

## Criterios de Aceptación
- Switch visible en header
- Estado persiste tras refresh
- Prefiere preferencia del usuario, fallback al system
- Lint y tests verdes
```

## 5. Métricas / Evaluación

| Métrica | Objetivo |
|---------|----------|
| Iteraciones promedio por issue | ≤ 3 |
| Tiempo hasta PR (p50) | < 10 min |
| Reversiones post-merge | 0 frecuentes |
| Cobertura tests en cambios | ≈ baseline |

## 6. Buenas Prácticas

- Empezar con issues bien acotados (≤ 1 módulo).
- Evitar mezclar refactor + feature en mismo ticket.
- Revisar plan inicial del agente si lo provee ("plan:" / "steps:").
- Forzar tests si el agente no los propone ("añade test" explícito).

---
**Siguiente:** `code-review.md` para revisión asistida.
