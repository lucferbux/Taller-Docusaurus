---
sidebar_position: 12
---

# Estructura de la Clase

En esta sesión vamos a detallar los pasos que hemos seguido en clase para continuar con el desarrollo de la [clase anterior](../frontend/setup). Puedes descargarte la [sesión final](https://github.com/lucferbux/Taller-FrontEnd/tree/final_version) de la clase anterior o simplemente usar el [proyecto base](https://github.com/lucferbux/Taller-Backend) de esta sesión.

1. Siguiendo con el proyecto creado en la [clase anterior](../frontend/setup), vamos a cambiar la estructura a un repositorio monorepo.

```bash
mkdir ui \
&& mv *[^ui]* ui  \
&& mv .gitignore ui \
&& mv .env ui  \
&& mv .eslintrc ui  \
&& mv .eslintignore ui  \
&& mkdir api
```

2. Copiamos los archivos de la carpeta root del [proyecto base](https://github.com/lucferbux/Taller-Backend/tree/main/backend) de esta sección: `.env`, `.gitignore`, `.nodemon.json`, `package.json`, `tsconfig.json`, `.eslintrc` e instalamos las dependencias con:

```bash
npm install
```

3. Creamos el contenido mínimo copiando la carpeta `src` de la versión de la rama [1_add_scaffolding](https://github.com/lucferbux/Taller-Backend/tree/1_add_scaffolding).

4. En este punto podemos añadir el [fichero Makefile](./makefile)

5. Ahora vamos a añadir todas las [configuraciones de express](./express-overview), como podemos ver en la rama [2_express_config](https://github.com/lucferbux/Taller-Backend/tree/2_express_config)

6. Añadimos la carpeta `Routes` que podemos encontrar en la rama [3_add_routes](https://github.com/lucferbux/Taller-Backend/tree/3_add_routes) y los ficheros `swagger.json` y `swaggerDef.json` para añadir las [rutas](./routes) y la especificación [swagger](swagger). No olvidéis añadir las rutas con añadiendo `Routes.init(app)` al fichero `server.ts`.

7. Ahora añadimos la carpeta de `Componentes` que encontraremos en la rama [4_components](https://github.com/lucferbux/Taller-Backend/tree/4_components) y actualizaremos todas las rutas para importar el componente correspondiente.

8. Vamos a cambiar ahora a la carpeta `ui` e implementar los [cambios en el frontend](./front-end.md). Empezaremos por copiar la sección `api` de la rama [5_changes_api](https://github.com/lucferbux/Taller-Backend/tree/5_changes_api).

9. Ahora vamos a cambiar los ficheros de [auth](./front-end.md#auth) y [dashboard](./front-end.md#dashboard) para dejar configurado el networking.

10. Comprobamos que todo funcione y que el [jwt](./jwt.md) y la [autenticación](./authentication.md) funcionan.