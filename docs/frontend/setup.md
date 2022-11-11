---
sidebar_position: 12
---

# Estructura Clase

En esta sesión vamos a detallar los pasos que hemos seguido en clase para preparar el proyecto con la estructura final que hemos usado para nuestro ejemplo. Los pasos son los siguientes

1. Creamos el proyecto con [create react app](https://www.google.com/search?client=safari&rls=en&q=create+react+app&ie=UTF-8&oe=UTF-8)

```bash
> mkdir workshop
> cd whorkshop
> npx create-react-app personal-portfolio --template typescript
```

2. Instalamos las dependencias del proyecto mediante **npm**

```bash
> cd personal-portfolio
> npm install react-router-dom@5.2.0 i18next@19.9.2 i18next-browser-languagedetector@6.0.1 react-i18next@11.8.10  jwt-decode@3.1.2 react-helmet-async@1.1.2 lottie-react@2.3.1 styled-components@5.2.1 @types/react@17.0.34
```

3. Instalación las [dependencias de desarrollo](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

```bash
> npm install --save-dev @types/react-router-dom@5.1.7 @types/styled-components@5.1.7 @types/react-i18next@8.1.0 
```

4. A partir de ahora, vamos a aplicar los cambios para añadir la [estructura del proyecto](./scaffolding).

5. Reemplazamos los ficheros de la [carpeta public](./scaffolding#carpeta-public).

6. Añadimos la carpeta `models` con los [modelos de la aplicación](./models).

7. Modificamos el archivo `index.tsx` e `index.css` para añadir la lógica global y los estilos globales.

8. Modificamos la estructura de `app.tsx` y la movemos a la carpeta `components`.

9. Añadir la carpeta de `styles` para añadir los [estilos](./style).

10. Añadimos la carpeta `constant` con las constantes del proyecto.

11. Añadimos la carpeta `utils` con la lógica de [autenticación](./authentication) y los [data mocks](./mocks).

12. Añadir el archivo `.env` para las [variables de entorno](https://create-react-app.dev/docs/adding-custom-environment-variables/).

13. Añadimos la carpeta `context` con los [contextos de autenticación y aplicación](./context), si queréis profundizar en Redux os [dejo aquí un artículo](https://dev.to/lucferbux/introduccion-a-redux-1mi3).

14. Añadimos la carpeta `hooks` con la lógica de los [hooks](./hooks).

15. Añadimos la carpeta `locales` y el fichero `i18n.ts` para la [internacionalización](./i18n).

16. Dentro de la carpeta `components` implementamos la [navegación](./navigation) y el resto de [componentes](./components).