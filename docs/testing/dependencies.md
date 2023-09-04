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

## Vitest

Framework JavaScript centrado en *testing*, que permite crear *test de integración e unitarios* de forma sencilla y sin apenas configuración.

[Enlace a documentación](https://vitest.dev)

## React Testing Library

Librería core de *create react app* para escribir tests sin necesidad de implementaciones complicadas y dependencias de los componentes entre ficheros.

[Enlace a documentación](https://github.com/testing-library/react-testing-library)

## Mocha

Framework JavaScript especialmente optimizado para **Node,js**, permite crear tanto tests síncronos como asíncronos de una forma muy sencilla, además de proporcionar muchas utilidades para la ejecución y el reporte de tests.

[Enlace a documentación](https://mochajs.org)

## Chai

Librería JavaScript de aserciones, es decir de comprobaciones entre valores. Chai tiene múltiples interfaces, como **asert**, **expect** y **should**, que permiten al desarrollador elegir el estilo que le resulte más legible y cómodo a la hora de construir los tests.

[Enlace a documentación](https://www.chaijs.com/)

## Supertest

*Supertest* es un módulo que nos permite testear servidores en *Nodejs HTTP*. Está construido por encima de la librería [superagent](https://github.com/visionmedia/superagent), que permite realizar peticiones al servidor y luego ser evaluadas.

[Enlace a documentación](https://github.com/visionmedia/supertest#readme)

## Playwright

Playwright es una librería que permite automatizar navegadores web, como por ejemplo *Chrome*, *Firefox* o *Safari*. Es una librería muy potente que permite realizar tests end to end de forma muy sencilla.

[Enlace a documentación](https://playwright.dev)


## ESLint TypeScript

ESLint es uno de los [linter](https://eslint.org) más populares en JavaScript. Básicamente analiza el código para encontrar problemas, tanto de estilo, de sintáxis o de estructura, para mantener el código homogeneo y definir buenas prácticas en todo nuestro proyecto. Typescript ESLint habilita ESLint procesar sintáxis en TypeScript, ampliar las reglas para soportar este lenguaje y hacer uso de la información de *tipos* de TypeScript.

[Enlace a la documentación](https://typescript-eslint.io)
