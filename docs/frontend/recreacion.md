---
sidebar_position: 20
---

# Creación del proyecto con herramientas generativas

En esta sección intentaremos detallar como usar herramientas generativas para crear un proyecto que contenga los principales elementos que acabamos de repasar. Incluye: stack tecnológico, estructura de carpetas, dependencias clave, configuración, componentes fundamentales, autenticación, internacionalización, datos mock, pruebas y observabilidad.

## 1. Objetivos

- Portafolio / dashboard con contenido dinámico (about me + projects)
- Navegación SPA con rutas públicas y privadas
- Autenticación basada en JWT (mock / API futura)
- i18n (en/es) con detección automática + fallback
- Estilos utilitarios y componentes (Tailwind CSS + shadcn/ui)
- Animaciones (Lottie) y telemetría (Sentry)
- Fetch abstraído vía hooks reutilizables (`useFetchData`)
- Preparado para futuras integraciones (SSR/API real / theming avanzado)

## 2. Stack Tecnológico

| Categoría | Tecnología | Uso |
|-----------|------------|-----|
| Core | React 18 + TypeScript | UI component model tipado |
| Build | Vite | Dev server rápido + HMR |
| Routing | React Router v6 | Definición de rutas y protección |
| State/Context | React Context + custom hooks | Auth, Project selection |
| Estilos | Tailwind CSS + shadcn/ui | Utilidades atómicas + componentes accesibles |
| i18n | i18next + react-i18next + detector | Localización runtime |
| Animaciones | lottie-react | Hero / elementos visuales |
| Auth | JWT + localStorage + utilidades | Persistencia sesión y expiración |
| Observabilidad | Sentry (@sentry/react, tracing) | Errores y performance |
| SEO/Head | react-helmet-async | Metadatos dinámicos |
| Testing | Vitest + React Testing Lib + Playwright | Unit + E2E |
| Docs/UI sistema | Storybook | Aislar y documentar componentes |

## 3. Estructura de Carpetas (src/)

```text
src/
  components/
    layout/ (Layout, Header, Footer, Nav)
    routes/ (LandingPage, Login, Dashboard, Admin, PrivateRoute)
    cards/ (AboutMeCard, ProjectCard)
    elements/ (Loader, etc.)
  context/
    AuthContext.tsx
    ProjectContext.tsx
  hooks/
    useAuth.ts
    useProject.ts
    useFetchData.ts
  model/
    user.ts
    project.ts
    aboutme.ts (si aplica)
  api/
    api-client.ts / factories / interfaces (mock o real)
  utils/
    auth.ts
    config.ts
    mock-response.ts
    test-utils.tsx
  styles/ (opcional para extensiones)
    globals.css (directivas @tailwind base/components/utilities)
    themes.css (tokens extendidos: colores, spacing, radius)
  locales/
    en-us.json
    es-es.json
  i18n.ts
  main.tsx
  vite-env.d.ts
```

## 4. Dependencias Relevantes

Ver `package.json` original: incluye Sentry, Lottie, Router, i18n stack, testing libs, Storybook y tooling ESLint/Prettier/TypeScript. En esta recreación se sustituye `styled-components` por **Tailwind + shadcn/ui**.

## 5. Configuración Clave

- `main.tsx`: monta providers (Helmet, Auth, Project) e inicializa Sentry.
- `i18n.ts`: registra recursos, detector de idioma y fallback.
- `.env`: variables `VITE_BASE_URI`, `VITE_API_URI`, `VITE_SENTRY_API`.
- `auth.ts`: decodifica, persiste y expira JWT con `setLogoutIfExpiredHandler`.
- `tailwind.config.js`: configuración tema + safelist + dark mode.
- `postcss.config.js`: pipeline de Tailwind.
- `components.json`: catálogo shadcn para generar primitives.
- `LandingPage.tsx`: página de inicio con hero y animación con `Lottie`.

## 6. Flujo de Autenticación

1. Usuario envía credenciales → `login()` (mock o API real) recibe token.
2. Se decodifica y persiste (localStorage) con timestamps iat/exp.
3. Contexto Auth expone `{user, isLoading, login, logout, loadUser}`.
4. `PrivateRoute` consulta `useAuth()`; si no hay usuario navega a `/login`.
5. Handler programado expira sesión automáticamente.

## 7. Hook de Fetch Genérico

`useFetchData(fn)` gestiona ciclo: loading → data | error y ofrece `reload()` para reintentos idempotentes. Encapsula re-render con dependencia `reloadCount`.

## 8. Internacionalización

- Recursos agrupados por `translation` namespace.
- Detector auto + `fallbackLng: 'en'`.
- Componentes consumen `const { t } = useTranslation();` y claves: `t('landing.title')`.

## 9. Datos Mock

`mock-response.ts` simula `login`, `aboutMe`, `projects` con `setTimeout` y resoluciones JSON, permitiendo UI realista sin backend.

## 10. Rutas

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Pública | Landing con animación / hero |
| `/login` | Pública | Formulario autenticación |
| `/dashboard` | Pública (datos) | Lista projects + about me |
| `/admin` | Privada | CRUD futuro / edición proyectos |

## 11. Observabilidad

Inicialización Sentry con `tracesSampleRate` configurada; ampliar usando filtros de entorno para producción.

## 12. Testing (Propuesto)

- Unit: hooks (`useFetchData`), utils (`auth.ts`), componentes UI atómicos.
- E2E: flujo login + navegación protegida.
- Visual/Docs: Storybook para componentes reutilizables.

## 13. Accesibilidad y Mejora Continua (Breve)

- Revisar roles ARIA en componentes interactivos.
- Añadir verificación ESLint a11y plugin (ya incluido en AirBnB base).

## 14. Prompt de Generación (GPT‑5)

Se incluye un prompt XML estructurado reutilizable para regenerar este proyecto (ver sección dedicada `frontend/prompt-gpt5`).

**Nota estilos:** Migración desde styled-components: 1) Extraer tokens a `tailwind.config.js`, 2) Reemplazar wrappers por clases utilitarias o componentes shadcn (`npx shadcn add button` etc.), 3) Eliminar dependencia una vez no queden imports.

---
Siguiente: consulta la nueva sección de prompt para reproducción automatizada con agentes.
