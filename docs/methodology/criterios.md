# Criterios de Aceptación y Definition of Done

## Objetivo

Asegurar que el incremento entregado cumple valor funcional y calidad técnica mínima.

## Definition of Done (Story)

Una Story se considera Done cuando:

1. Todos los criterios de aceptación están marcados.
2. Todas las Tasks asociadas (checkbox en el body) están cerradas.
3. PR(s) mergeadas en `main` con pipelines verdes.
4. No se introducen vulnerabilidades críticas nuevas (escaneo security OK).
5. Documentación / ejemplos / swagger / Storybook actualizados cuando aplica.
6. Métricas y logs sin errores recurrentes nuevos tras despliegue (observación mínima >10 min).

## Definition of Done (Task)

- Código y tests (si aplica) en `main`.
- Linter, tests y build pasando.
- Referencia a la Story en commits o PR.
- No quedan comentarios de revisión bloqueantes.

## Criterios de aceptación (buenas prácticas)

- Específicos y verificables (evitar "mejor rendimiento").
- Separar comportamiento visible de detalles internos.
- Usar checkboxes para marcar completados.

## Ejemplo

```md
Story #91 Scripts DX
Criterios:
- [ ] Seed inicial genera usuario demo y colecciones base
- [ ] Comando reset requiere confirmación interactiva
- [ ] Makefile expone targets documentados
- [ ] README actualizado con uso rápido
```

## Anti-patrones

- Criterios genéricos: "Funciona correctamente".
- Marcar Story Done con Tasks abiertas.
- Saltar actualización de docs porque "es obvio".

## Próximos pasos

Revisa [Métricas](./metricas) para medir flujo y estabilidad.
