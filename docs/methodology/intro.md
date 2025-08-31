---
sidebar_position: 1
---

# Introducción

Bienvenido a la sección de **Metodología**. Aquí explicamos cómo aplicamos principios Agile de forma pragmática dentro del taller aprovechando *issues* de **GitHub**, *GitHub Projects* y documentación viva en Docusaurus. Este `intro.md` ofrece la vista panorámica y enlaza a páginas más específicas (prioridades & esfuerzo, trazabilidad, Projects, áreas, buenas prácticas, métricas, etc.).

## ¿Por qué Agile?

Agile promueve iteraciones cortas, feedback temprano y adaptación continua. En lugar de planificar todo al inicio, dividimos el valor en incrementos pequeños que podamos diseñar, implementar, probar y desplegar con rapidez. Esto reduce el riesgo y nos permite ajustar rumbo con datos reales.

**Principios clave que aplicamos aquí:**

- Entregas pequeñas y frecuentes (Tasks cerradas a diario idealmente).
- Transparencia total mediante issues visibles y etiquetadas.
- Calidad integrada: tests, lint y CI ejecutados en cada PR.
- Revisión continua: cada Story sólo se da por finalizada cuando sus Tasks están completadas y cumplen criterios de aceptación.

## Mapeo Conceptos Agile → Issues GitHub

| Agile | Definición en el taller | Issue Label / Campo | Ejemplo Real |
|-------|------------------------|---------------------|--------------|
| Epic | Línea de trabajo amplia que agrupa varias Stories | `type:Epic` + área | "DevEx Tooling" (#37), "Documentation" (#38) |
| Story | Incremento de valor con criterios de aceptación claros | `type:Story` | "Scripts DX" (#91), "Issue & PR templates" (#92) |
| Task | Unidad técnica ejecutable (≤1 día) que materializa parte de una Story | `type:Task` | "Crear script seed idempotente" (#347) |

Cada Story mantiene en su *body* la lista de Tasks con enlaces, lo que genera una **trazabilidad vertical** (Epic → Story → Tasks). Además, el documento `docs/traceability.md` consolida la relación y las páginas:

- [Prioridades y Esfuerzo](./prioridades-esfuerzo)
- [Vinculación y Enlace de Issues](./vinculacion-issues)
- [GitHub Projects](./github-projects)
- [Áreas funcionales](./areas)
- [Criterios de Aceptación & DoD](./criterios)
- [Métricas Ligeras](./metricas)
- [Buenas Prácticas](./buenas-practicas)
- [Próximos Pasos](./proximos-pasos)

## Ciclo de Vida Simplificado

![Diagram](/img/tutorial/methodology/diagram.png)

Este ciclo está reforzado por automatizaciones (CI/CD) y se profundiza en [GitHub Projects](./github-projects) y en la sección de [Vinculación de Issues](./vinculacion-issues).

Para el detalle de criterios, prioridades, esfuerzo, métricas y ejemplos reales visita las páginas específicas dentro de esta categoría.

---
**Resumen:** Descomponemos valor en Epics → Stories → Tasks con trazabilidad viva, priorización ligera y automatizaciones CI/CD que permiten iterar con seguridad.
