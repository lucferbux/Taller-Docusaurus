---
sidebar_position: 14
---

# Generar proyecto con Claude Sonet

Vamos a recrear el proyecto cambiando de tecnologías, en este caso usaremos **vite**, **typescript**, **react**, **react-router**, **shadcn**, **tailwindcss** y **three.js**.

Primero vamos a crear el proyecto siguiendo los pasos de la documentación de shadcn:

1. Creamos el proyecto con [Vite](./vite)

```bash
mkdir workshop \
&& cd workshop \
&& npm create vite@latest personal-portfolio -- --template react-ts
```

2. Añadimos tailwindcss:

```bash
npm install tailwindcss @tailwindcss/vite
```

Añadir al archivo `src/index.css`:

```css
@import "tailwindcss";
```

3. Editamos el archivo `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

4. Editamos el archivo `tsconfig.app.json`

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

5. Actualiza `vite.config.ts` para incluir Tailwind CSS:

```bash
npm install -D @types/node
```

Ahora edita `vite.config.ts`

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
````

6. Ejecuta el archivo de shadcn:

```bash
npx shadcn@latest init
```

## Prompts

```bash
Based on this project with the current technologies:

## Base techologies
- React 18+ with TypeScript
- Vite as the build tool
- Shadcn UI and Tailwind CSS

We want to add these follow technologies to the project so we can create a modern and engaging portfolio:

## Enhanced Technologies

- ESLint and Prettier for code quality
- React Router v7 
- Three.js for 3D interactive elements
- i18next for internationalization
- JWT authentication

## Project Structure
Please add the following project structure to the current application:
- src/
  - components/
    - ui/
    - layout/
  - hooks/
  - context/
  - routes/
  - i18n/
  - services/
  - models/
  - utils/

## Configuration Files
Generate all necessary configuration files:
- tsconfig.json
- vite.config.ts
- package.json with all dependencies
- tailwind.config.js
- components.json for shadcn
- .eslintrc.cjs and .prettierrc

Please provide all the code for the scaffolding of the application, don't include code for the features, that will be done in follow up steps. Include setup instructions and explanations for key architectural decisions. You can use any additional libraries or tools as needed to meet the requirements.
```

Después de esto, vamos a seguir con el siguiente prompt:

```bash
Continue the project by implementing the following features:

## Features
1. Complete authentication system using JWT:
   - Login screen with form validation
   - Protected routes
   - Auth context with useAuth hook
   - The context should support: login, logout, and user data
   - Create a utils file to handle JWT token storage, JWT decode, expiration, login and logout.

2. Internationalization with i18next:
   - Support for English and Spanish
   - Language switcher component

3. Landing page with THREE.js interactive 3D scene:
   - Create an engaging 3D scene as the hero section
   - Responsive and performant implementation
   - Use Three.js for the 3D scene
   - The three.js scene should be interactive with mouse events and related to development.

4. Modern UI with shadcn components:
   - Themed with Tailwind CSS
   - Responsive design for all screen sizes

5. Routing with React Router v7:
   - Implement routing for the landing page and other pages
   - Use React Router hooks for navigation

6. Custom hooks for data fetching:
   - Create custom hooks for data fetching
   - The data fetch hook should answer this specification:

type FetchDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => void;
};

export default function useFetchData<T>(fetchFunction: () => Promise<T>): FetchDataResult<T> {
  // Implementation
}

7. Model interfaces for data:
   - Define TypeScript interfaces for the data models used in the application
   - Use the interfaces in the data fetch hook
   - The types that are used are: User (id, email, isActive), Project(id, title, description, version, link, tag, timestamp), News (id, title, body, imageUrl, author, timestamp), AboutMe (id, name, birthday, nationality, job, github)

## Layout
To follow the feature development, please update the project structure with the following layout:

- src/
  - components/
    - ui/ (for shadcn components)
    - layout/ (Layout, Header, Footer, etc.)
  - hooks/
    - useAuth.ts
    - useFetchData.ts
    - useToogle.ts
  - context/
    - AuthContext.tsx
    - ThemeContext.tsx
  - routes/
    - index.tsx
    - PrivateRoute.tsx (component for protected routes)
    - pages/
      - Home.tsx
      - Login.tsx
      - Dashboard.tsx (for about me and projects)
      - Admin.tsx (for creating and editing projects and about me, protected route)
  - constants/
    - config.ts (API URL, JWT secret, etc.)
  - i18n/
    - locales/
      - en.json
      - es.json
    - config.ts
  - services/
    - api.ts (mocked API service)
  - models/
    - Define appropriate TypeScript interfaces
  - utils/
    - helpers.ts

Please provide all the code for completing the application that follow these requirements. Include instructions and explanations for key architectural decisions. You can use any additional libraries or tools as needed to meet the requirements.
```