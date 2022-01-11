---
sidebar_position: 8
---

# Modelos

Como hablamos en el curso te TypeScript, las interfaces son un tipo de construcción que permite definir los tipos en Objetos JavaScript. El compilador de TS no convierte la interfaz en código JavaScript, utiliza las interfaces para la comprobación de tipos.
Puede extenderse para tener más flexibilidad y cuenta con atributos opcionales, atributos de solo lectura o funciones.

En el caso de proyectos grandes, las interfaces cobran una nueva dimensión para asegurar que la información que interpolamos a React realmente existe y que el modelo de datos que manejamos esté sincronizado entre el frontend y el backend.

En nuestro proyecto vamos a tener tres interfaces para controlar nuestro modelo de datos, `user`, `about me` y `project`.

## User

*User* representa el usuario autenticado de la aplicación, en este caso, como no tenemos control de roles ni vamos a mostrar ninguna información del usuario vamos a mantener los atributos simples. Tanto `id` como `email` los vamos a extraer directamente del [JWT](../backend/jwt.md) que almacenaremos en la webapp para autenticarnos.

```ts title="src/model/user.ts"
export interface User {
    active: boolean;
    id: string;
    email: string;
}
```

## AboutMe

*AboutMe* almacena la información que mostraremos en la *carta* con nuestra información. Tiene un `id` generado que extraeremos posteriormente del documento de la **bbdd**, un nombre, fecha de nacimiento, nacionalidad, puesto de trabajo y link a github. Este modelo lo hemos extraído directamente de [Swagger](../backend/swagger.md), del que hablaremos próximamente.

```ts title="src/model/aboutme.ts"
export interface AboutMe {
    /**
     * 
     * @type {string}
     * @memberof AboutMe
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AboutMe
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof AboutMe
     */
    birthday?: number;
    /**
     * 
     * @type {string}
     * @memberof AboutMe
     */
    nationality?: string;
    /**
     * 
     * @type {string}
     * @memberof AboutMe
     */
    job?: string;
    /**
     * 
     * @type {string}
     * @memberof AboutMe
     */
    github?: string;
}
```

## Project

Por último tenemos *Project*, que representa las *cartas* de los proyectos que tendremos en el *dashboard* de nuestra webapp. El atributo `id`, al igual que en *AboutMe*, estará generado por el documento de la **bbdd**, y el resto de atributos conformarán los datos mostrados en nuestros proyectos.

```ts title="src/model/project.ts"
export interface Project {
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    version: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    link: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    tag: string;
    /**
     * 
     * @type {Date}
     * @memberof Project
     */
    timestamp: Date;
}
```
