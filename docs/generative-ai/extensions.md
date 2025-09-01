---
sidebar_position: 6
---

# Extensiones y Ecosistemas

Exploramos **Copilot Extensions**, Spaces, Knowledge Bases y comparativas.

## 1. Copilot Extensions

Permiten integrar herramientas externas (por ejemplo, ejecución de tests, acceso a bases de conocimiento específicas) dentro de Copilot Chat como "skills".

| Aspecto | Valor |
|---------|------|
| Integración | Via GitHub App + Marketplace |
| Seguridad | Scopes definidos; auditoría enterprise |
| Casos | Ejecutar builds, obtener métricas, consultar documentación interna |

## 2. Spaces & Knowledge Bases

| Recurso | Propósito | Notas |
|---------|-----------|-------|
| Spaces | Agrupar código, specs, docs para grounding | Público o interno; versionables |
| Knowledge Bases | Colecciones curadas de docs para Chat | Enterprise; control de acceso granular |

## 3. Alternativas

| Objetivo | Alternativa | Diferenciador |
|----------|------------|---------------|
| Contexto repos grande | Sourcegraph Contexts | Index avanzado embeddings |
| RAG custom | Implementación propia (OpenAI + vectores) | Control total pipeline |
| Documentación viva | Notion AI / Confluence AI | Suites colaborativas generales |

## 4. Flujo Sugerido (Agregar Conocimiento Interno)

1. Seleccionar docs relevantes (arquitectura, decisiones, ADRs).
2. Crear Knowledge Base (enterprise) o Space.
3. Indexar y validar respuestas de muestra.
4. Añadir a prompts: "Usa KB 'arch-base' como contexto".

## 5. Métricas

| Métrica | Objetivo |
|---------|----------|
| Relevancia respuestas (evaluación manual) | ≥ 80% |
| Latencia promedio (s) | < 4 |
| Tasa de alucinaciones reportadas | Disminución continua |

## 6. Buenas Prácticas

- Reentrenar / reindexar tras cambios arquitectónicos mayores.
- Añadir metadatos (tags) para filtrar contexto.
- Mantener límite de tamaño para evitar ruido.

---
**Siguiente:** `governance.md` para políticas y administración.
