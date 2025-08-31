# Áreas funcionales

Las etiquetas `area:*` permiten agrupar trabajo por dominios técnicos o de valor.

## Taxonomía inicial
 
| Área | Propósito | Ejemplos |
|------|-----------|----------|
| area:backend | Lógica API, modelos, autenticación | Express routes, Mongoose schemas |
| area:frontend | UI, estado, componentes, i18n | React components, hooks, Storybook |
| area:devex | Mejora de productividad interna | Makefile, scripts seed, husky |
| area:docs | Contenido y estructura documental | Docusaurus pages, guías, diagramas |
| area:ci-cd | Pipelines, releases, despliegues | GitHub Actions, semantic-release |
| area:monitoring | Observabilidad y alertas | Prometheus, Grafana, Sentry |
| area:security | Hardening, análisis, dependencias | Trivy scans, secrets policy |

## Reglas

- Una Task idealmente tiene sólo 1 `area:*`. Si necesita 2, revisar si se puede dividir.
- Las Stories pueden abarcar varias áreas pero deben indicar la principal en la descripción.
- Los Epics suelen concentrarse en 1–2 áreas dominantes.

## Uso en filtros y vistas

- Balance de esfuerzo: contar issues abiertos por área.
- Detección de cuello de botella: columna In Progress saturada en una sola área.
- Planificación: agrupar mantenimiento (monitoring, security) para evitar deuda.

## Métrica rápida sugerida

Script que agrupa por `area:*` y muestra porcentaje de cierre por iteración.

## Próximos pasos

Ve a [Criterios y DoD](./criterios) para cómo asegurar calidad transversal en todas las áreas.
