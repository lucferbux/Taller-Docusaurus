---
sidebar_position: 21
---

# Prompt GPT‑5 para Generar / Evolucionar Backend (Monorepo)

Esta página provee (1) un prompt XML listo para **GPT‑5** que recrea el estado del proyecto `2-backend` a partir de `1-frontend`, (2) instrucciones de migración frontend→monorepo+api, y (3) directivas de trabajo para un agente (context gathering, tool preambles, self reflection).

## Resumen

- Conversión a monorepo (`ui` + `api`).
- API Express (users, aboutMe, projects, auth, docs swagger).
- Autenticación JWT (middleware isAuthenticated).
- Documentación OpenAPI con swagger-ui y especificación alineada a rutas.
- Logger (Winston) + dotenv para configuración.
- Rutas protegidas vs públicas.
- Sincronización modelo de datos compartido.
- Mock data servido por backend (reemplaza mocks del frontend) y eliminación de mocks en `ui`.
- Nuevo `package.json` raíz para orquestar scripts (dev concurrente, test, lint).
- Pasos de migración y criterios de aceptación.

## Migración: `1-frontend` → `2-backend`

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Crear carpetas `ui` y `api` | Estructura monorepo base |
| 2 | Mover contenido frontend existente a `ui/` | Se preserva build anterior |
| 3 | Añadir archivos raíz backend (.env, nodemon, package, tsconfig) | Configuración base Node/Express |
| 4 | Copiar scaffolding `src` backend (config express) | Servidor Express mínimo |
| 5 | Integrar rutas (users, aboutMe, projects, auth) | Endpoints accesibles |
| 6 | Añadir swagger.json + swaggerDef.js | Documentación API en /docs |
| 7 | Crear componentes (controllers) y actualizar imports rutas | Lógica de negocio modular |
| 8 | Ajustar frontend (client) para consumir API real | Reemplaza mocks locales |
| 9 | Implementar JWT (middleware + login) | Protección rutas privadas |
| 10 | Verificar end-to-end (frontend + backend) | Flujo integrado estable |

## Prompt XML (Monorepo Backend)

```xml
<monorepoSpec version="1.0" targetModel="gpt-5" purpose="scaffold-and-migrate" language="en">
  <meta>
    <name>portfolio-monorepo</name>
    <description>Migrate single-frontend app into monorepo with Express API (users, aboutMe, projects, auth) + UI consuming real endpoints; JWT auth & Swagger docs.</description>
    <goals>
      <goal>Create monorepo layout (ui + api)</goal>
      <goal>Provide REST API with JWT protection</goal>
      <goal>Preserve existing UI with minimal changes</goal>
      <goal>Replace local mock data by HTTP calls</goal>
      <goal>Expose Swagger docs at /docs</goal>
      <goal>Introduce root package.json to orchestrate dev/test scripts</goal>
      <goal>Remove frontend mock JSON and source all data from backend</goal>
    </goals>
  </meta>
  <structure>
    <file name="package.json" scope="root" description="workspace orchestrator (scripts: dev:ui, dev:api, dev, test, lint)" />
    <dir name="api">
      <file name="package.json" />
      <file name="tsconfig.json" />
      <file name=".env.example" />
      <file name="nodemon.json" />
      <dir name="src">
        <file name="server.ts" />
        <dir name="config" />
        <dir name="routes" />
        <dir name="components" />
        <dir name="mock" />
        <file name="swagger.json" />
        <file name="swaggerDef.js" />
      </dir>
    </dir>
    <dir name="ui" source="(entire previous root moved here: src, public, config, .env, lint configs)" />
  </structure>
  <api>
    <runtime node=">=18" packageManager="npm" />
    <framework name="express" />
    <dependencies core="express,dotenv,winston,jsonwebtoken" dev="ts-node,nodemon,typescript" />
    <routing base="/v1">
      <route path="/users" auth="required" />
      <route path="/aboutMe" auth="optional" />
      <route path="/projects" auth="optional" />
      <route path="/auth" auth="public" />
      <route path="/docs" auth="public" description="swagger ui" />
    </routing>
    <auth strategy="jwt" storage="headerBearer" middleware="isAuthenticated" />
    <logging lib="winston" level="info" />
    <openapi file="swagger.json" setupFile="swaggerDef.js" uiPath="/docs" />
    <mockData location="api/src/mock" files="aboutMe.json,projects.json,users.json" />
  </api>
  <migration>
    <from project="frontend-single" />
    <to project="monorepo" />
    <steps>
      <step index="1">Create ui and api directories</step>
      <step index="2">Move ALL current root files (src, public, config, .env, lint, tests) into ui directory</step>
      <step index="3">Add backend package.json, tsconfig, env, nodemon</step>
      <step index="4">Implement express server.ts (load env, init app)</step>
      <step index="5">Add routes index + sub-routes (users, aboutMe, projects, auth)</step>
      <step index="6">Integrate swagger (swagger.json + swaggerDef.js) including paths for users, aboutMe, projects, auth</step>
      <step index="7">Add components (controllers) and wire into routes</step>
      <step index="8">Create backend mock JSON data (aboutMe, projects, users) under api/src/mock</step>
      <step index="9">Update ui fetch logic to call api endpoints (remove local mock usage)</step>
      <step index="10">Implement JWT login + protect /v1/users</step>
      <step index="11">Create root package.json with scripts (dev runs ui+api concurrently)</step>
      <step index="12">Delete obsolete mock data files from ui (verify no imports left)</step>
      <step index="13">Smoke test end-to-end + update docs</step>
    </steps>
  </migration>
  <context_gathering>
    <directive>List current root before migration to confirm files to move into ui</directive>
    <directive>List /ui structure after move (verify no leftovers at root)</directive>
    <directive>Read api/src/routes/index.ts before adding new routes</directive>
    <directive>Summarize swagger.json sections before editing</directive>
    <directive>Locate existing frontend mock data files (aboutMe, projects, users) before deletion</directive>
  </context_gathering>
  <tool_preambles>
    <rule>Prefix batches with rationale | operations summary</rule>
    <rule>Separate read vs write tool calls</rule>
    <rule>Emit checkpoint after every 3-5 operations</rule>
  </tool_preambles>
  <self_reflection>
    <checkpoint>Ensure JWT middleware applied only where required</checkpoint>
    <checkpoint>Confirm swagger /docs loads without errors</checkpoint>
    <checkpoint>Verify UI no longer uses local mocks (search for mock filenames)</checkpoint>
    <checkpoint>Validate logging not overly verbose in production mode</checkpoint>
    <checkpoint>Confirm root scripts allow single-command concurrent dev</checkpoint>
  </self_reflection>
  <deliverables>
    <item>root package.json (workspaces/scripts)</item>
    <item>api/package.json</item>
    <item>api/tsconfig.json</item>
    <item>api/src/server.ts</item>
    <item>api/src/routes/index.ts</item>
    <item>api/src/components/*</item>
    <item>api/src/swagger.json</item>
    <item>api/src/swaggerDef.js</item>
    <item>api/src/mock/*.json</item>
    <item>ui updated fetch calls</item>
    <item>Updated docs (this file)</item>
  </deliverables>
  <acceptance>
    <criterion>API starts (npm run dev) and listens on configured port</criterion>
    <criterion>/v1/projects returns JSON list</criterion>
    <criterion>/v1/users requires valid JWT</criterion>
    <criterion>Swagger UI available at /docs</criterion>
    <criterion>UI displays data from API (no mock leakage; zero matches for removed mock filenames)</criterion>
    <criterion>Root npm run dev concurrently runs ui & api</criterion>
  </acceptance>
</monorepoSpec>
```

## Uso (Agente / GPT‑5)

1. Pegar el bloque XML en la primera petición.
2. Solicitar: "Generate monorepo scaffold and migrate data fetching".
3. Validar estructura generada (`api` + `ui`).
4. Ejecutar servidor y probar rutas.
5. Iterar agregando pruebas y cobertura adicional.

## Notas / Extensiones Futuras

- Añadir tests (unit/integration) para controllers.
- Incorporar capa de persistencia (DB real) bajo interfaz repositorio.
- Añadir rate limiting y CORS config.
- Añadir pipeline CI que ejecute lint + tests en ambos paquetes.

---
