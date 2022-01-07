---
sidebar_position: 2
---

# Dependencias

Vamos a repasar las dependencias más importantes de este segundo proyecto para comprender cómo está configurado.

## Node  

Node es un proyecto que permite ejecutar el **runtime de JavaScript** fuera del navegador para poder desarrollar aplicaciones de red altamente escalables. Cuenta con funcionalidades como asincronía, entrada y salida de datos, arquitectura orientada a eventos, callbacks...

[Enlace a la documentación](https://nodejs.org/en/)

## Express

Express es un framework simple y flexible de **Node.js** que cuenta con un set de funcionalidads robustas para desarrollar aplicaciones web y móviles. Es fácil crear APIs de una forma rápida y sencilla gracias a todos los métodos HTTP y middleware con el que cuenta este Framework. Además, otro de los grandes beneficios de usar este framework es su rendimiento, al ser una fina capa por necima de Node no impacta su funcionamiento en general.

[Enlace a la documentación](http://expressjs.com)

## JWT  

JWT es una especificación de Autenticación que se utiliza sobre todo para control de autenticación entre dos actores. Se introdujo con la especificación [RFC 7519](https://tools.ietf.org/html/rfc7519) por el IEFT. Aunque se puede usar con todo tipo de comunicaciones, JWT es muy popular para el control de autenticación y autorización mediante HTTP, es por ello que lo hemos introducido en nuestra API.

[Enlace a la documentación](https://jwt.io)

## Swagger  

Swagger es un conjunto de herramientas de software de código abierto para diseñar, construir, documentar, y utilizar servicios web RESTful. Fue desarrollado por SmartBear Software e incluye documentación automatizada, generación de código, y generación de casos de prueba. Las herramientas pueden dividirse en varios casos de uso: desarrollo, interacción con API y documentación.

[Enlace a la documentación](https://app.swaggerhub.com/apis/lucferbux/ThreePoints/1.0.0)

## DotEnv

Herramienta gestión de variables entorno. Convierte elementos dentro de un archivo `.env` en variables de entorno *process.env*. Guardar las configuraciones del entorno separadas del código es un pilar fundamental dentro de la [metodología de los 12 factores](https://12factor.net/config).

[Enlace a la documentación](https://github.com/motdotla/dotenv)
