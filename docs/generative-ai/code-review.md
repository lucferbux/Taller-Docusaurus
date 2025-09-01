---
sidebar_position: 4
---

# Revisión de Código Asistida por IA

Comparativa de **Copilot Code Review**, PR Summaries y alternativas como CodeRabbit.

## 1. Componentes de la Revisión Asistida

| Sub‑función | Copilot | Alternativas | Uso Clave |
|-------------|---------|--------------|-----------|
| Sugerencias línea | Comentarios de revisión AI | CodeRabbit inline, Amazon Q | Detectar smells, edge cases |
| Resumen PR | PR Summaries (scope, impacto) | CodeRabbit resumen, gpt-review | Acelerar onboarding del reviewer |
| Descripción PR | Text Completion | Modelos externos (Claude/OpenAI) | Redactar context uniforme |
| Recomendaciones seguridad | (Integrado parcialmente) | Snyk AI (parcial), Amazon Q | Señalar dependencias, patterns riesgosos |

## 2. Flujo Recomendado (Nuestro Repo)

1. Abrir PR generado (feature o refactor).
2. Ejecutar acción de resumen (si no autogenerado): "Resume cambios críticos".
3. Revisar sugerencias línea por línea; aceptar sólo si pasa criterios (legibilidad, test, performance).
4. Solicitar: "Sugiere tests faltantes para nuevas ramas lógicas".
5. Añadir/ajustar tests antes de merge.

## 3. Alternativas Destacadas

| Herramienta | Fortaleza | Limitación |
|------------|-----------|------------|
| CodeRabbit | Comentarios contextuales multi‑archivo y resumen combinado | Puede generar volumen alto (ruido) |
| Amazon Q | Integra seguridad + configuraciones cloud | Optimizado para ecosistema AWS |
| ReviewGPT (scripts) | Personalizable con prompts locales | Mantenimiento de pipeline propio |
| Sourcegraph Cody | Contexto profundo en monorepos | Requiere index embeddings |

## 4. Métricas

| Métrica | Objetivo |
|---------|----------|
| Tiempo medio revisión (min) | Reducir 20% respecto baseline |
| Comentarios AI aceptados (%) | 30–50% (resto se descartan) |
| Tests añadidos post revisión | ≥ 1 por rama lógica nueva |
| Issues post-merge relacionados | Tendencia descendente |

## 5. Buenas Prácticas

- Mantener PRs pequeños (≤ ~400 LOC cambiadas) para efectividad AI.
- Exigir justificación corta al aceptar sugerencia compleja.
- Configurar política: AI no aprueba sola; siempre revisor humano.
- Refinar prompts: "Enfócate solo en seguridad" / "Sólo edge cases no cubiertos".

## 6. Ejemplo de Prompt (Detección de Tests Faltantes)

```text
Contexto: PR #123 añade hook useSearchProjects con debounce.
Tarea: Lista escenarios no cubiertos por tests actuales.
Devuelve tabla con: escenario | riesgo | sugerencia test.
```

## 7. Decisión

Usar **Copilot Code Review** como baseline. Introducir CodeRabbit si necesitamos mayor densidad de comentarios en refactors amplios o monorepo. Scripts GPT sólo si requerimos política personalizada estricta fuera de capacidades nativas.

---
**Siguiente:** `cli-assistant.md` para asistencia en terminal.
