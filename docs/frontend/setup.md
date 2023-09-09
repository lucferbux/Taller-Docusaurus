---
sidebar_position: 13
---

# Estructura Clase

En esta sesión vamos a detallar los pasos que hemos seguido en clase para preparar el proyecto con la estructura final que hemos usado para nuestro ejemplo. Los pasos son los siguientes

1. Creamos el proyecto con [Vite](./vite)

```bash
mkdir workshop \
&& cd workshop \
&& npm create vite@latest personal-portfolio -- --template react-ts
```

2. Instalamos las dependencias del proyecto mediante **npm**

```bash
cd personal-portfolio \
&& npm install react-router@6.8.2 react-router-dom@6.8.2 i18next@19.9.2 i18next-browser-languagedetector@6.0.1 react-i18next@12.2.0  jwt-decode@3.1.2 react-helmet-async@1.3.0 lottie-react@2.3.1 styled-components@5.2.1
```

3. Instalación las [dependencias de desarrollo](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

```bash
npm install --save-dev @types/react-router-dom@5.1.7 @types/styled-components@5.1.7 @types/node@18.14.6
```

4. Vamos ahora a instalar las dependencias para el linter, veremos este concepto en la última sesión de [CI/CD](../testing/linter), pero dejaremos instalado el linter desde un inicio.

```bash
npm install --save-dev eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-react
```

Y por último añadiremos el plugin the airbnb y todas sus dependencias mediante la herramienta [install-peerdeps](https://www.npmjs.com/package/install-peerdeps).

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

5. A partir de ahora, vamos a aplicar los cambios para añadir la [estructura del proyecto](./scaffolding).

6. Reemplazamos los ficheros de la [carpeta public](./scaffolding#carpeta-public).

7. Añadimos la carpeta `models` con los [modelos de la aplicación](./models).

8. Modificamos el archivo `main.tsx` e `main.css` para añadir la lógica global y los estilos globales.

9. Añadir la carpeta de `styles` para añadir los [estilos](./style).

10. Modificamos la estructura de `app.tsx`, movemos a la carpeta `components` y añadimos la [navegación](./navigation).

**Clase ->** Aquí vemos como aplicar **Styled components** en el **Landing page** y como funciona **Lottie**.

11. Añadimos la carpeta `constant` con las constantes del proyecto.

12. Añadimos la carpeta `utils` con la lógica de [autenticación](./authentication) y los [data mocks](./mocks).

13. Añadir el archivo `.env` para las [variables de entorno](https://vitejs.dev/guide/env-and-mode.html).

14. Añadimos la carpeta `context` con los [contextos de autenticación y aplicación](./context).

15. Añadimos la carpeta `hooks` con la lógica de los [hooks](./hooks).

16. Añadimos la carpeta `locales` y el fichero `i18n.ts` para la [internacionalización](./i18n).

17. Dentro de la carpeta `components` implementamos el resto de [componentes](./components).
