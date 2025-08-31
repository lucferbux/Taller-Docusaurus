# Métricas ligeras

Enfocadas en detectar bloqueos y mejorar flujo sin burocracia pesada.

## Principios
 
- Bajo costo de captura.
- Accionables (informan una decisión inmediata).
- Iterables: si no aportan, se descartan.

## Métricas sugeridas
 
| Métrica | Cómo obtenerla | Umbral inicial |
|---------|-----------------|----------------|
| Edad de Task abierta | `now - createdAt` | > 7 días revisar |
| % Stories completas por Epic | Stories Done / Stories Totales | < 50% a mitad de iteración alerta |
| Tiempo Task (open→merge) | Diferencia timestamps | > 3 días investigar |
| Distribución esfuerzo | Contar labels effort | Sesgo a L indica falta de slicing |
| P0 abiertos | Filtro label prioridad | > 3 simultáneos redefinir alcance |

## Técnicas de obtención
 
1. Script GraphQL simple (Node) exporta JSON.
2. Procesar con pequeña función y generar tabla Markdown.
3. Incrustar resultado en `docs/metricas-report.md` (rotativo).

## Ejemplo pseudo-script
 
```ts
// fetchIssues.ts (esquema simplificado)
const query = `{
  repository(owner:"org", name:"repo") {
    issues(first:100, states:OPEN, labels:["type:Task"]) {
      nodes { number createdAt labels { name } }
    }
  }
}`;
```

## Uso práctico
 
- Revisión semanal: escanear Tasks > 7 días, decidir dividir/cerrar.
- Retro: analizar desviaciones esfuerzo estimado vs real (solo si aporta aprendizaje).

## Anti-patrones
 
- Contar líneas de código como métrica de productividad.
- Automatizar todo antes de validar utilidad.

## Próximos pasos
 
Consulta [Buenas Prácticas](./buenas-practicas) para incorporar estas métricas al ciclo sin fricción.
