---
sidebar_position: 2
---

# Dependencias

En esta ocasión no vamos a construir muchas más funcionalidades, pero hay ciertas dependencias relacionadas con el testing y la seguridad que son recomendables mencionar.

## Cookie-parser

Librería para Nodejs que permite gestionar las `cookies` que genera nuestro servidor. Es capaz de crear *cookies* con diferentes clave-valor, asignareles atributos e incluso crear *cookies firmadas* mediante un **secreto**.

[Enlace a documentación](https://www.npmjs.com/package/cookie-parser)

## Express-rate-limit

Middleware que permite gestionar el límite de peticiones en base a ciertos criterios, permitiendo poner un número limitado de peticiones en un rango de tiempo a APIs públicas o endpoints.

[Enlace a documentación](https://www.npmjs.com/package/express-rate-limit)

## Helmet

Helmet es una librería que permite securizar nuestro servidor Express añadiendo varias cabeceras *HTTP* comom *ContentSecurityPolicy*, *CrossOriginResourcePolicy*, o *XSSFilter*.

[Enlace a documentación](https://www.npmjs.com/package/helmet)

## Jest

Framework JavaScript centrado en *testing*, que permite crear *test de integración e unitarios* de forma sencilla y sin apenas configuración.

[Enlace a documentación](https://jestjs.io)

## Puppeter

Librería para Node que aporta una API de alto nmivel para controlar Chrome o Chromium mediante el [Protocolo DevTools](https://chromedevtools.github.io/devtools-protocol/), permitiendo así simular navgegación de nuestra página y poder realizar test end-2-end.

[Enlace a documentación](https://github.com/puppeteer/puppeteer)
