# Buenas Prácticas

## Objetivo

Mantener flujo estable y calidad sin sobreproceso.

## Checklist Pull Request (recomendada)

- [ ] Descripción clara (qué y por qué)
- [ ] Issue(s) referenciados (#ID)
- [ ] Tests añadidos/actualizados
- [ ] Linter y build pasan local
- [ ] Docs/Storybook/Swagger actualizados (si aplica)
- [ ] Sin secretos / credenciales accidentales

## Slicing efectivo

- Preferir varias Tasks S/M vs una L.
- Dividir por vertical (end-to-end) antes que por capas técnicas aisladas.
- Evitar bloqueos: si una Task depende de otra, reflejarlo con comentario "Bloqueado por #X".

## Gestión de deuda técnica

- Etiquetar explícitamente con `type:Task` + comentario TODO fuente.
- Priorizar deuda que aumenta coste de cambio futuro (no sólo estilo).
- Revisar lista de deuda cada 2 iteraciones.

## Comunicación

- Usar comentarios concisos y accionables en PR.
- Hacer squash de commits ruidosos ("fix lint", "typo") antes de merge.
- Cerrar el loop: al resolver feedback, responder confirmando el cambio.

## Anti-patrones

- Aplazar tests "para después" sistemáticamente.
- Mezclar refactor grande con feature nuevo en una sola PR.
- Abrir muchas Stories simultáneas sin progreso real.
