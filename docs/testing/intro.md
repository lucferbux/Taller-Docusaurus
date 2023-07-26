---
sidebar_position: 1
---

# Introducción

[Enlace del proyecto en Github](https://github.com/lucferbux/Taller-Testing-Security)

En esta nueva sección vamos a hablar de dos aspectos muy importantes y muy buenos indicativos de la robustez de un proyecto: el **testing** y la **seguridad**. Ya hemos pasado la primera mitad de nuestro taller, en el que nos focalizamos en desarrollar la arquitectura y el código para dotar a nuestra webapp de la funcionalidad que requería. En esta sesión iremos modificando pequeños detalles para hacer nuestro código más seguro y a la vez iremos añadiendo tests para cubrir la lógica principal de nuestra aplicación. Si seguimos utilizando el diagrama de la arquitectura, nuestro proyecto quedaría de la siguiente manera.

![Security & Testing Architecture](../../static/img/tutorial/security/0_testing_sec_architecture.png)

Como podemos observar, vamos a añadir módulos de testing tanto al *frontend* como al *backend*. Otro de los cambios que podemos observar es que moveremos el JWT a una cookie de sesión para mejorar la seguridad de las conexiones de nuestra aplicación.
