---
sidebar_position: 21
---

# Prompt GPT‑5 para Generar/Recrear el Proyecto

Esta sección proporciona: (1) un prompt XML exhaustivo listo para usar con **GPT‑5**, (2) recomendaciones de uso en **Copilot Coding Agent** y **GitHub Spark**, y (3) notas de adaptación. El objetivo es regenerar o evolucionar el front-end manteniendo arquitectura, estándares y extensibilidad.

## Resumen de Contenido del Prompt

- Metadatos del proyecto (nombre, propósito, objetivos funcionales)
- Stack core y librerías complementarias
- Estructura completa de carpetas y archivos base
- Políticas de calidad (lint, tests, Storybook, accesibilidad mínima)
- Autenticación JWT (mock + puntos de extensión)
- i18n (en/es) y arquitectura de recursos
- Hooks clave (auth, fetch genérico, selección de proyecto)
- Consideraciones de observabilidad (Sentry) y performance
- Reglas de routing y protección
- Estrategia de estilos (Tailwind CSS + shadcn/ui + tokens extendidos)
- Plan de pruebas (unit + e2e + visual) y scripts
- Futuras extensiones (theming avanzado, API real, SSR opcional)

## Prompt XML (Copiar y Pegar)

```xml
<projectSpec version="1.0">
  <meta>
    <name>personal-portfolio</name>
    <description>SPA portfolio/dashboard con autenticación JWT, i18n y hooks reutilizables.</description>
    <goals>
      <goal>Listar y mostrar información AboutMe y Projects</goal>
      <goal>Autenticación JWT con rutas protegidas</goal>
      <goal>Internacionalización en/es</goal>
      <goal>Base para evolución (API real, theming, SSR)</goal>
      <goal>Animación con Lottie</goal>
    </goals>
  </meta>
  <techStack>
    <frontend framework="react" version="18" language="typescript" build="vite" />
    <routing lib="react-router" version="6" />
  <styles strategy="tailwind+shadcn" theming="class-dark-mode" />
    <i18n libs="i18next,react-i18next,detector" />
    <auth method="jwt-localstorage" />
    <observability sentry="true" />
    <animations lib="lottie-react" />
    <seo head="react-helmet-async" />
    <testing unit="vitest+rtl" e2e="playwright" storybook="7" />
  </techStack>
  <quality>
    <lint tools="eslint,prettier" config="airbnb+typescript" />
    <checks>
      <check>type-safety</check>
      <check>no-unused-vars</check>
      <check>a11y-basic</check>
    </checks>
  </quality>
  <structure root="src">
    <dir name="components">
      <dir name="layout" />
      <dir name="routes" />
      <dir name="cards" />
      <dir name="elements" />
    </dir>
    <dir name="context" />
    <dir name="hooks" />
    <dir name="model" />
    <dir name="api" />
    <dir name="utils" />
    <dir name="styles" />
    <dir name="locales" />
    <file name="i18n.ts" />
    <file name="main.tsx" />
  </structure>
  <files>
    <file name=".env.example">
VITE_BASE_URI=http://localhost:5173
VITE_API_URI=/api
VITE_SENTRY_API=__REPLACE_DSN__
    </file>
    <file name="src/utils/auth.ts" role="jwt-storage">/* Implement login, logout, decode, expiry handler */</file>
    <file name="src/hooks/useFetchData.ts" role="generic-fetch" />
    <file name="src/context/AuthContext.tsx" role="auth-provider" />
    <file name="src/context/ProjectContext.tsx" role="project-provider" />
    <file name="src/components/routes/PrivateRoute.tsx" role="route-guard" />
  </files>
  <routing>
    <route path="/" component="LandingPage" public="true" />
    <route path="/login" component="Login" public="true" />
    <route path="/dashboard" component="Dashboard" public="true" />
    <route path="/admin" component="Admin" public="false" />
  </routing>
  <i18n>
    <languages default="en">
      <lang code="en" />
      <lang code="es" />
    </languages>
    <namespace value="translation" />
  </i18n>
  <auth>
    <jwt storage="localStorage" rotation="none" refresh="manual" />
    <login flow="username+password" />
  </auth>
  <hooks>
    <hook name="useAuth" purpose="Acceso al contexto de autenticación" />
    <hook name="useProject" purpose="Estado temporal de proyecto seleccionado" />
    <hook name="useFetchData" purpose="Fetch genérico con reload y estados" />
  </hooks>
  <observability>
    <sentry tracesSampleRate="1.0" environment="development" />
  </observability>
  <styles>
    <tailwind config="tailwind.config.js" postcss="postcss.config.js" darkMode="class" />
    <shadcn componentsFile="components.json" />
    <tokens strategy="css-vars" file="styles/themes.css" />
    <globals file="styles/globals.css" />
  </styles>
  <testing>
    <unit framework="vitest" />
    <e2e framework="playwright" scenarios="login,private-route,fetch-error" />
    <storybook version="7" />
  </testing>
  <extensibility>
    <future item="SSR-next-adapter" />
    <future item="Theming-dark-mode" />
    <future item="API-client-swap" />
  </extensibility>
  <instructions>
    <step>Instalar dependencias y copiar estructura.</step>
    <step>Configurar i18n y locales en/en + es/es.</step>
    <step>Implementar auth utils (decode, persist, expiry).</step>
    <step>Crear contexts y envolver en main.tsx.</step>
    <step>Configurar rutas y PrivateRoute.</step>
    <step>Añadir hook useFetchData y reemplazar fetches directos.</step>
    <step>Añadir animación con Lottie en LandingPage.</step>
    <step>Inicializar Sentry si hay DSN.</step>
    <step>Agregar scripts test/lint/build/storybook.</step>
  </instructions>
  <deliverables>
    <item>package.json</item>
    <item>tsconfig.json</item>
    <item>vite.config.ts</item>
    <item>.eslintrc.(cjs|json)</item>
    <item>README.md con pasos</item>
    <item>Storybook inicial</item>
  </deliverables>
  <acceptance>
    <criterion>Compila y corre `vite dev` sin errores</criterion>
    <criterion>Login mock funcional y protección /admin</criterion>
    <criterion>i18n alterna EN/ES</criterion>
    <criterion>useFetchData gestiona loading/error</criterion>
  </acceptance>
</projectSpec>
```

## Uso con Copilot Coding Agent

1. Abre el editor con un workspace vacío.
2. Pega el XML en una solicitud inicial al agente.
3. Solicita: "Genera el scaffolding completo cumpliendo projectSpec".
4. Revisa los archivos creados; ajusta atributos (por ej. añadir dark mode).
5. Itera pidiendo ampliaciones: *"Añade testing para useFetchData"*.

### Consejos

- Divide cambios grandes: primero estructura, luego auth, luego i18n, luego estilos (shadcn components).
- Usa comentarios en el XML para marcar extensiones futuras.
- Mantén la sección `<acceptance>` como checklist de validación.

## Uso con GitHub Spark

> GitHub Spark (entorno generativo orientado a repos) puede usar este prompt como blueprint de repo inicial.

Pasos:
 
1. Crea un repo vacío en GitHub.
2. Abre Spark y envía el prompt dentro de un bloque de código.
3. Solicita generación incremental (*incremental synthesis*) para permitir feedback.
4. Usa la sección `<deliverables>` como verificación de completitud.
5. Genera un PR inicial y revisa diffs antes de merge.

### Integración Continua

- Añade workflow que ejecute `npm run lint && npm test` para garantizar criterios `<acceptance>`.
- Posteriormente extiende para subir sourcemaps a Sentry.

## Adaptación / Extensión

- Para API real sustituir mock client por `fetch`/`axios` detrás de factoría.
- Añadir refresh tokens agregando `<jwt rotation="sliding" refresh="auto"/>` en `<auth>`.
- Incorporar dark mode activando `darkMode: 'class'` en Tailwind y añadiendo toggle en Layout.

## Buenas Prácticas al Usar el Prompt

- Mantenerlo versionado (`docs/prompts/projectSpec.xml`).
- Sincronizar cambios reales en código con el XML (fuente de verdad documental).
- Ejecutar ajustes menores (nuevos hooks, libs) como PRs que actualizan ambas partes.

---
**Listo:** Copia el bloque XML y úsalo directamente con GPT‑5 / agentes para recrear el proyecto con **Tailwind + shadcn/ui** de forma consistente y extensible.
