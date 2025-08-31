# Vinculación y Enlace de Issues

Esta página detalla cómo mantenemos la trazabilidad entre Epics, Stories y Tasks y las convenciones de enlace.

## Objetivos

- Ofrecer trazabilidad vertical (Epic → Story → Task).
- Facilitar navegación rápida entre dependencias.
- Permitir generación futura automatizada (script) sin cambios manuales mayores.

## Convenciones de escritura

| Elemento | Contenido obligatorio | Enlaces requeridos |
|----------|-----------------------|--------------------|
| Epic (type:Epic) | Descripción de alcance + objetivo de valor | Lista de Stories (checkbox + #id) |
| Story (type:Story) | Criterios de aceptación (lista) | Referencia al Epic ("Relacionado a #XX") + lista Tasks |
| Task (type:Task) | Acción concreta / resultado verificable | Referencia Story ("Pertenece a #YY") |

## Formato recomendado Story

```md
### Contexto
Breve situación / problema.

### Criterios de Aceptación
- [ ] Criterio 1
- [ ] Criterio 2

### Tasks
- [ ] #123 Descripción Task A
- [ ] #124 Descripción Task B

Relacionado a: #90 (Epic)
```

## Reglas

1. Las listas de Tasks viven en la Story (no en el Epic) para reducir ruido.
2. El Epic sólo incluye Stories (no Tasks directas).
3. Una Task nunca cierra una Story automáticamente: se marca manualmente al cumplir criterios.
4. Si una Task genera subtareas, se convierte en Story o se divide (no crear árbol profundo).
5. Menciona IDs (#) siempre al inicio de la línea si quieres checkbox en Project (facilita escaneo visual).

## Enlace cruzado y referencias

- Usa frases cortas: "Relacionado a #XX", "Depende de #YY", "Bloqueado por #ZZ".
- Cuando una dependencia se resuelve, edita el comentario inicial y tacha la nota opcionalmente.

## Actualización de trazabilidad

| Momento | Acción |
|---------|--------|
| Al crear Story | Añadir referencia al Epic + plantilla de Tasks vacías |
| Al identificar nueva Task | Crear Task y enlazar en Story (orden lógico de ejecución) |
| Al cerrar Task | Marcar checkbox en Story |
| Al cerrar Story | Verificar todos los criterios y Tasks cerradas; actualizar Epic si es la última pendiente |

## Ejemplo real (resumido)

```text
Epic #90 DevEx Tooling
  Story #91 Scripts DX
    Tasks: #347 #348 #349 #350
```

## Futuras automatizaciones

- Script GraphQL que construye matriz Epic→Story→Tasks y exporta a `docs/traceability.md`.
- Validación CI (action) que alerta si una Story no referencia un Epic.

## Próximos pasos

Explora [GitHub Projects](./github-projects) para ver cómo esta estructura se refleja en vistas y tableros.
