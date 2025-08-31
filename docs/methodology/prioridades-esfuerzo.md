# Prioridades y Esfuerzo

Esta página explica el significado de las etiquetas de prioridad y el esquema de esfuerzo usado en los *issues*.

## Prioridad (`priority:P0|P1|P2`)

- **P0**: Crítico / Bloquea avance. Debe resolverse antes de progresar con temas dependientes. Ej.: configuración base de CI/CD, estructura inicial de documentación (#93).
- **P1**: Aporta valor directo al usuario o al equipo. Ej.: guías de contribución, scripts DX (#91), documentación backend/frontend (#94).
- **P2**: Mejora incremental, optimización, pulido, nice-to-have. Ej.: FAQ inicial (#98), optimizaciones de pipeline no críticas.

### Reglas de uso

- Mantener muy pocos P0 simultáneos; si aparecen muchos, redefinir alcance.
- Revisar prioridades al inicio de cada iteración (backlog grooming rápido <= 10 minutos).
- Si una Task P1 o P2 se vuelve bloqueante, elevar su prioridad justificándolo en un comentario.

## Esfuerzo (`effort:XS|S|M|L`)

| Esfuerzo | Guía de tiempo (neto) | Características | Acción si excede |
|---------|------------------------|-----------------|------------------|
| XS | < 30 min | Cambio trivial, doc menor, config puntual | Mantener inline |
| S  | 30–90 min | Implementación pequeña, test aislado | OK |
| M  | 1.5–4 h | Varios pasos, afecta 2-3 archivos/módulos | Considerar dividir si se acerca a 4h |
| L  | 0.5–1 día | Cambios coordinados múltiples componentes | Dividir en Tasks M/S antes de iniciar |

> La estimación es relativa y busca facilitar planificación ligera, no control micro.

### Flujo de estimación

1. Crear Story con criterios y dividir en Tasks tentativas.
2. Asignar esfuerzo inicial a cada Task (heurística rápida: ¿cabe en una sesión de enfoque?).
3. Durante el refinamiento, ajustar: si una Task se percibe > M dividirla.
4. Al cerrar, no reestimar salvo para aprendizaje retro (anotar en comentario si la estimación falló y causa).

### Anti-patrones

- Acumular Tasks L: indicio de falta de refinamiento.
- Reestimar continuamente para "parecer" preciso: genera desperdicio.
- Ignorar esfuerzo en métricas: dificulta detectar saturación.

## Relación Prioridad vs Esfuerzo

Un P0 no debe ser automáticamente L. Si lo es, se descompone primero. Se busca que la mayoría de ítems activos tengan esfuerzo S o M para mantener flujo.

## Métricas ligeras sugeridas

- Distribución de esfuerzo cerrado vs abierto (ej.: script que cuenta labels).
- Promedio de edad por prioridad (P0 antiguos => bloqueo).

## Próximos pasos

Profundiza en [Vinculación de Issues](./vinculacion-issues) para ver cómo se mantiene trazabilidad y en [Métricas](./metricas) para scripts de seguimiento.
