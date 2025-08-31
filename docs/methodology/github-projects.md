# GitHub Projects

Cómo usamos GitHub Projects (beta) para orquestar Epics, Stories y Tasks.

## Campos propuestos
 
| Campo | Tipo | Uso |
|-------|------|-----|
| Title | nativo | Nombre del issue |
| Status | nativo | Flujo: Backlog → Ready → In Progress → Review → Done |
| Assignees | nativo | Responsable principal / pairing opcional |
| Labels | nativo | `type:*`, `area:*`, `priority:*`, `effort:*` |
| Level | single-select | Epic / Story / Task (derivado de labels) |
| Iteration | iteration | (Opcional) Cadencias semanales/quincenales |
| Size | single-select | Duplicado ligero del label effort para vistas resumidas |

## Reglas de sincronización ligera

- Al crear un issue con label `type:Story` asignar Level=Story (manual hasta automatizar).
- No mover a "Review" sin PR abierta vinculada (referencia #id en la PR).
- Un Epic pasa a Done sólo cuando todas sus Stories están Done (validación visual mediante filtro).

## Vistas sugeridas

| Vista | Filtro | Objetivo |
|-------|--------|----------|
| Board por Status | Todos | Flujo global |
| Tabla Prioridad | Columns: Title, Level, priority, Status | Rebalance rápido |
| Stories activas | `label:type:Story AND -status:Done` | Limitar WIP |
| Riesgos | `label:priority:P0` | Atención inmediata |
| Métrica Envejecimiento | Añadir "Created at" y ordenar | Detectar estancados |

## Automatizaciones (futuras)

- Acción: si label `type:Epic` -> set Level=Epic.
- Acción: al cerrar última Task, comentar en Story sugerencia de cierre.
- Script GraphQL: recalcula matriz y actualiza documento de trazabilidad.

## Buenas prácticas

- Mantener baja la columna "In Progress" (≤ 5 ítems totales mezclando niveles).
- Revisar columna "Review" al inicio del día para evitar colas.
- Limpiar pendientes bloqueados (>7 días) moviéndolos a Backlog o dividiéndolos.

## Limitaciones

- No hay derivación automática nativa de Level desde labels (necesita action custom).
- Las métricas avanzadas (lead time) requieren extracción externa.

## Próximos pasos

Consulta [Áreas funcionales](./areas) para entender el significado de `area:*` en filtros y vistas.
