---
sidebar_position: 5
---

# Asistentes de Línea de Comandos

Cobertura de **Copilot CLI** y alternativas (Warp AI, Fig, Shell Genie).

## 1. Capacidades

| Feature | Copilot CLI | Warp AI | Fig / Others |
|---------|-------------|---------|--------------|
| Explicación comandos | Sí | Sí | Variable |
| Generación comandos | Sí | Sí (prompt panel) | Sí (snippets) |
| Refinamiento iterativo | Chat continuo | Panel sidecar | Limitado |
| Integración GitHub | Contexto repo | Parcial | No directa |

## 2. Flujo de Uso (Ejemplo)

Caso: necesitamos crear script para exportar colecciones Mongo en `scripts/mongoexport.sh`.

Prompt:

```text
Necesito un comando bash para exportar colección projects de MongoDB local a JSON pretty en carpeta backups con timestamp.
Formato directo comando + explicación corta.
```

Luego revisar flags de seguridad (no exponer credenciales). Integrar en script y documentar en README.

## 3. Alternativas

| Herramienta | Diferenciador | Riesgo |
|-------------|---------------|--------|
| Warp AI | UI moderna + historial semántico | Lock-in cliente propietario |
| Shell Genie | Enfoque simple comandos ↔ explicación | Calidad variable prompts |
| Fig | Autocompletado enriquecido | Adquisición / cambios roadmap |

## 4. Buenas Prácticas

- Validar cada comando en entorno aislado antes de producción.
- Evitar pegar secretos en prompts (usar placeholders).
- Añadir comentario explicativo encima de comandos generados.

---
**Siguiente:** `extensions.md` para extensiones e integraciones.
