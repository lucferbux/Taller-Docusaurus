---
sidebar_position: 7
---

# Gobernanza, Políticas y Métricas

Cobertura de administración enterprise: políticas, acceso, auditoría y métricas de uso.

## 1. Capacidades Copilot Enterprise

| Función | Descripción | Valor |
|---------|-------------|-------|
| Policy Management | Definir features habilitadas/deshabilitadas | Controlar superficie y coste |
| Access Management | Asignar licencias por org/equipo | Optimizar gasto |
| Usage Data | Métricas adopción y eficacia | Decisiones data-driven |
| Audit Logs | Registro de acciones y cambios | Cumplimiento y forensics |
| Exclude Files | Ignorar rutas sensibles | Protección IP |

## 2. Riesgos y Controles

| Riesgo | Control Mitigación | Evidencia |
|--------|--------------------|----------|
| Filtración de secretos | Exclude files + secret scanning | Config repos y reportes |
| Dependencia excesiva | Métricas calidad / code review humana | Revisión PRs |
| Alucinaciones críticas | Tests automatizados + lint | Pipeline CI |
| Sesgo de modelo | Revisiones cruzadas humanas | Checklist revisión |

## 3. KPIs de Adopción

| KPI | Definición | Meta Inicial |
|-----|-----------|--------------|
| Tasa Activación | Usuarios activos / licencias | > 85% |
| % PR con Revisión AI | PR con sugerencias AI | 60% |
| Aceptación Sugerencias | Ratio aceptación línea | 30–50% |
| Tiempo Medio Story | Lead time desde start | -15% baseline |

## 4. Proceso de Evaluación de Herramientas Nuevas

1. Definir caso de uso y métrica objetivo.
2. Probar en subset controlado (beta interna).
3. Recolectar datos (latencia, calidad, aceptación, incidencias).
4. Decidir escalar / descartar.
5. Documentar decisión (ADR / registro herramientas).

## 5. Checklist de Cumplimiento

```text
[ ] Políticas Copilot revisadas trimestralmente
[ ] Revisión logs auditoría mensual
[ ] Lista de exclusión archivos sensible actualizada
[ ] Métricas aceptación y latencia monitorizadas
[ ] Entrenamiento usuarios (prompts best practices) completado
```

## 6. Roadmap Evolutivo

| Fase | Objetivo | Resultado |
|------|----------|-----------|
| F1 | Centralizar métricas en dashboard | Visibilidad unificada |
| F2 | Añadir KB arquitectónica | Respuestas más precisas |
| F3 | Integrar QA tests vía extensión | Shift-left calidad |
| F4 | Automatizar PR risk scoring | Priorización revisión |

---
**Fin (puedes volver al `intro.md`).**
