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
- Directivas de context gathering (para GPT‑5)
- Preambulos de herramientas (tool preambles)
- Ciclo de self-reflection antes de finalizar cambios

## Prompt XML (Copiar y Pegar)

```xml
<projectSpec version="2.0" targetModel="gpt-5" purpose="scaffold-and-iterate" language="en">
  <meta>
    <name>personal-portfolio</name>
    <description>Portfolio / dashboard SPA with JWT auth, i18n, reusable hooks, Tailwind + shadcn/ui styling, and initial Lottie animation (upgrade path to Three.js).</description>
    <goals>
      <goal>Render AboutMe & Projects data</goal>
      <goal>Provide protected admin route using JWT</goal>
      <goal>Offer English/Spanish internationalization</goal>
      <goal>Ensure extensibility for real API, theming, SSR</goal>
      <goal>Include baseline animation (Lottie → future Three.js)</goal>
    </goals>
  </meta>
  <techStack>
    <frontend framework="react" version="18" language="typescript" build="vite" />
    <routing lib="react-router" version="6" />
    <styles strategy="tailwind+shadcn" theming="class-dark-mode" />
    <i18n libs="i18next,react-i18next,language-detector" />
    <auth method="jwt-localstorage" />
    <observability sentry="true" />
    <animations lib="lottie-react" upgradeCandidate="three" />
    <seo head="react-helmet-async" />
    <testing unit="vitest+rtl" e2e="playwright" storybook="7" />
  </techStack>
  <quality>
    <lint tools="eslint,prettier" config="airbnb+typescript" />
    <checks>
      <check>type-safety</check>
      <check>no-unused-vars</check>
      <check>a11y-basic</check>
      <check>component-isolation-storybook</check>
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
    <file name=".env.example">VITE_BASE_URI=http://localhost:5173\nVITE_API_URI=/api\nVITE_SENTRY_API=__REPLACE_DSN__</file>
    <file name="src/utils/auth.ts" role="jwt-storage">/* login, logout, decode, expiry handler */</file>
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
    <hook name="useAuth" purpose="Expose authenticated user and session control" />
    <hook name="useProject" purpose="Temporary selected project state" />
    <hook name="useFetchData" purpose="Generic async fetch with reload + error + loading" />
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
    <future item="API-client-swap" />
    <future item="ThreeJS-animation" />
    <future item="Advanced-theming" />
  </extensibility>
  <instructions>
    <step>Install dependencies and replicate structure.</step>
    <step>Configure i18n with EN/ES resources.</step>
    <step>Implement auth utilities (decode, persist, expiry handler).</step>
    <step>Create contexts and wrap providers in main.tsx.</step>
    <step>Define routes + PrivateRoute guard.</step>
    <step>Add useFetchData hook and replace direct fetch calls.</step>
    <step>Integrate initial Lottie animation on LandingPage (placeholder for Three.js migration).</step>
    <step>Initialize Sentry if DSN present.</step>
    <step>Add scripts: lint, test, build, storybook.</step>
  </instructions>
  <context_gathering>
    <directive>List current file tree before large refactors.</directive>
    <directive>Read and summarize target files prior to multi-file edits.</directive>
    <directive>Batch read operations (max 5 per batch) and then plan edits.</directive>
    <directive>Avoid editing without up-to-date context (invalidate if file changed externally).</directive>
  </context_gathering>
  <tool_preambles>
    <rule>Prefix each tool invocation with: purpose | expected outcome.</rule>
    <rule>Group independent read operations; separate edit batches.</rule>
    <rule>After 3–5 tool calls emit a concise checkpoint (delta only).</rule>
  </tool_preambles>
  <self_reflection>
    <checkpoint>After generating code: validate architecture consistency (folders, naming).</checkpoint>
    <checkpoint>Ensure styling uses Tailwind + shadcn (no stray inline styles unless dynamic).</checkpoint>
    <checkpoint>Verify tests cover new branches (happy + error path).</checkpoint>
    <checkpoint>List potential regressions and unresolved questions before final output.</checkpoint>
  </self_reflection>
  <deliverables>
    <item>package.json</item>
    <item>tsconfig.json</item>
    <item>vite.config.ts</item>
    <item>.eslintrc.(cjs|json)</item>
    <item>README.md (usage + scripts)</item>
    <item>Storybook initial setup</item>
  </deliverables>
  <acceptance>
    <criterion>Vite dev server runs without errors</criterion>
    <criterion>Mock login works and /admin guarded</criterion>
    <criterion>Language toggle switches EN/ES</criterion>
    <criterion>useFetchData handles loading/error correctly</criterion>
    <criterion>Stories build and basic a11y checks pass</criterion>
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

## Migración de Animación: Lottie → Three.js

Esta guía muestra cómo sustituir la animación basada en **Lottie** por una animación 3D ligera usando **Three.js** sin introducir complejidad excesiva. No modificamos el XML base (sigue enumerando Lottie como estado inicial), pero este bloque describe el camino evolutivo.

### Objetivos

- Reemplazar dependencia `lottie-react` en la Landing por un canvas WebGL.
- Mantener accesibilidad (rol descriptivo) y rendimiento aceptable.
- Encapsular la animación en un componente reutilizable sin filtrar detalles de Three.js al resto de la app.

### Dependencia Nueva

```bash
npm i three
```

### Componente Ejemplo (`src/components/elements/LandingAnimation3D.tsx`)

```tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const LandingAnimation3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 300; // altura fija simple
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Geometría de ejemplo (torus knot giratorio)
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      color: '#6366f1',
      roughness: 0.3,
      metalness: 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.DirectionalLight('#ffffff', 1.2);
    light.position.set(2, 2, 4);
    scene.add(light);

    let frameId: number;
    const animate = () => {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentElement)
        renderer.domElement.parentElement.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      role="img"
      aria-label="Animated 3D torus knot"
    />
  );
};
```

### Integración en `LandingPage`

Reemplazar el uso previo (por ejemplo `<Lottie ... />`) por:

```tsx
import { LandingAnimation3D } from '@/components/elements/LandingAnimation3D';
// ... dentro del JSX
<LandingAnimation3D />
```

### Prompt de Migración (Ejemplo para Agente/Chat)

```xml
<migrationSpec version="1.0" targetModel="gpt-5" task="lottie-to-three">
  <scope>
    <from lib="lottie-react" file="LandingPage" />
    <to lib="three" component="LandingAnimation3D" />
  </scope>
  <objectives>
    <objective>Remove lottie-react dependency if unused elsewhere</objective>
    <objective>Add reusable Three.js component with cleanup + resize</objective>
    <objective>Preserve accessibility via role="img" + aria-label</objective>
    <objective>Maintain build + test green</objective>
  </objectives>
  <constraints>
    <constraint>No additional heavy abstractions (avoid react-three-fiber for now)</constraint>
    <constraint>No inline styles except dynamic computed cases</constraint>
    <constraint>Component limited to &lt;= 150 LOC</constraint>
  </constraints>
  <context_gathering>
    <directive>List files referencing lottie before removal</directive>
    <directive>Read LandingPage and related animation component(s)</directive>
  </context_gathering>
  <tool_preambles>
    <rule>Prefix batches: reason | operations</rule>
    <rule>After patch, summarize diff intent</rule>
  </tool_preambles>
  <self_reflection>
    <checkpoint>Confirm no remaining lottie imports</checkpoint>
    <checkpoint>Check component has cleanup of renderer + geometry + material</checkpoint>
    <checkpoint>Verify aria-label present</checkpoint>
    <checkpoint>List any performance caveats</checkpoint>
  </self_reflection>
  <steps>
    <step>Install three dependency</step>
    <step>Create LandingAnimation3D component</step>
    <step>Replace Lottie usage on LandingPage</step>
    <step>Remove lottie-react from package.json if orphaned</step>
    <step>Add minimal test asserting component mounts and has role img</step>
    <step>Update docs (prompt file) noting migration</step>
  </steps>
  <deliverables>
    <item>src/components/elements/LandingAnimation3D.tsx</item>
    <item>Updated LandingPage</item>
    <item>Test file LandingAnimation3D.test.tsx</item>
    <item>package.json (dependency pruned)</item>
    <item>Docs update section</item>
  </deliverables>
  <acceptance>
    <criterion>No build errors</criterion>
    <criterion>No lottie-react import remains</criterion>
    <criterion>Animation visible and rotates</criterion>
    <criterion>Component unmount frees resources (no console leaks)</criterion>
    <criterion>Test passes (role img present)</criterion>
  </acceptance>
</migrationSpec>
```

### Notas de Rendimiento

- Mantener geometrías simples evita saturar CPU/GPU.
- Considerar `@react-three/fiber` sólo si la escena crece; mantener raw Three.js minimiza dependencias.

---
