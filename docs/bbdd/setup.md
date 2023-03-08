---
sidebar_position: 9
---

# Estructura de la Clase

En esta sesión vamos a detallar los pasos que hemos seguido en clase para continuar con el desarrollo de la [clase de backend](../backend/setup). Puedes descargarte la [sesión final](https://github.com/lucferbux/Taller-Backend/tree/final_version) de la clase anterior o simplemente usar el [proyecto base](https://github.com/lucferbux/Taller-BBDD) de esta sesión.

1. Instalar [MongoDB](https://www.mongodb.com) en nuestro equipo y acceder con Compass como se indica en la sección de [mongodb](./mongodb).
2. Vamos a seguir los pasos para actualizar los componentes del backend que se encuentran en la ruta `./backend/src/components` según la sección de [moongose](./mongoose):
    1. Eliminar el archivo `mock.ts` de todos los componentes.
    2. Actualizar el archivo `model.ts` con la [conexión a moongose](./mongoose#esquemas-y-documentos).
    3. Creamos el validador de Joi `validation.ts` siguiendo la sección de [Joi](./joi).
    4. Adaptamos el archivo `service.ts` haciendo uso del nuevo modelo y validador.
    5. Actualizamos la conexión a la bbdd en el *backend* siguiendo la sección de [inicialización de bbbdd](./mongoose#inicialización).
    6. Añadiremos las *variables de entorno* actualizadas en nuestro fichero `.env`
3. Actualizamos nuestro fichero `Makefile` según la sección [Makefile](./makefile).
4. Añadimos los [scripts bbdd](./scripts) y seguimos las instrucciones para poblar nuestra bbdd local.
5. Actualizamos el frontend con [nuevos contextos](./frontend#contexto-para-proyectos) y [nuevos hooks](./frontend#nuevos-hooks), añadimos un [botón para actualizar](./frontend#botón-de-actualizar) un proyecto e [implementar la lógica en admin](./frontend#cambios-en-admin) para permitir actualizar información.
