---
sidebar_position: 6
---

# Jest & React Testing Library

Ahora vamos a hablar de *Jest* y *React Testing library*. Jest es una librería open source escrita en JavaScript, muy optimizada para apliaciones *React* que permite implementar *tests unitarios* y junto a *react-testing-library*, escribir test de integración en nuestro proyecto.

Ambas librerías vienen instaladas por defecto en nuestro proyecto, ya que lo creamos con la *toolchain* `create-react-app`. Ahora bien, si fuese necesario incluirlo, solo habría que ejecutar los siguientes comandos:

* `npm install --save-dev jest`
* `npm install --save-dev @testing-library/react`

## Ejecutar Tests en React

Para empezar a crear tests en react, solo tenemos que empezar a crear ficheros con una convención específica para que *create-react-app* identifique que son tests:

* Archivos con extensión `.ts` dentro de carpetas `__tests__`. (Puede haber tantas carpetas `__tests__` como queramos).
* Archivos con extensión `.test.ts`.
* Archivos con extensión `.spec.js`.

Desde la documentación oficial de *create-react-app* recomiendan utilizar la primera opción

## Ejecutar Tests en Node