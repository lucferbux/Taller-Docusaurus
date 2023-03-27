---
sidebar_position: 8
---

# Testing Backend

Para realizar tests de integración en el *BackEnd* y poder probar todos nuestros endpoinst vamos a hacer uso de tres librerías diferentes: *Mocha*, para crear el entorno de los tests, *Chai*, para los *asserts* y *Supertest*, para realizar las peticiones *http*.
La configuración es relativamente sencilla, aunque ya la hemos realizado *previamente en el proyecto principal*, sería instalar las dependencias, añadir un nuevo script para test en nuestro *package.json*, `"test": "NODE_ENV=test mocha --require ts-node/register test/index.js --exit",` y por ultimo crear la carpeta `test` donde almacenar la lógica de nuestros tests.

## Ejecutar Tests en Node

Lo primero que haremos es actualizar el backend para añadir todas las dependencias necesarias para el testing

```bash
> cd backend
> npm install dotenv-flow@3.2.0	express-rate-limit@6.2.1
> npm install --save-dev @types/chai@4.2.4 @types/dotenv-flow@3.2.0 chai@4.3.7 jsdoc@4.0.2 mocha@10.2.0 supertest@6.3.3 @types/mocha@10.0.1 @types/supertest@2.0.12
```

Ahora vamos a proceder con la configuración, es que si nos fijamos bien en el script de testing, `NODE_ENV=test mocha --require ts-node/register test/index.ts --exit`, estamos directamente indicando a *mocha* el fichero de entrada de nuestros test, en nuestro caso `test/index.ts`, vamos a ver qué incluye.

```ts title="backend/test/index.ts"
import * as alias from 'module-alias';
alias.addAliases({
  '@': __dirname + '/../src'
});

import './setup';
import './authIntegration';
import './aboutMeIntegration';
import './projectIntegration';

```

Básicamente hemos creado un alias para poder importar los archivos que tienen la notación moderna de *ES* y a parte todos los ficheros de nuestros test, importados en orden de ejecución, esto va a ser importante, porque nos interesa que nuestro pirmer test sea `setup.ts`

```js title="backend/test/setup.js"
import AuthService from "../src/components/Auth/service";
import AboutMeModel from "../src/components/AboutMe/model";
import ProjectModel from "../src/components/Projects/model";
import { db } from "../src/config/connection/connection";
import user from "./fixtures/user.json";
import aboutme from "./fixtures/aboutme.json";
import projects from "./fixtures/projects.json";
import chai from "chai";
import { before } from "mocha";


// Assertion style
chai.should();

before("setup database", async () => {
  try {
    db.dropDatabase();
  } catch (error) {
    console.error("Error Deletion AboutMe API Test");
    console.error(error);
  }

  try {
    await AuthService.createUser(user);
    await AboutMeModel.create(aboutme);
    await ProjectModel.create(projects);
  } catch (error) {
    console.error("Error Insertion AboutMe API Test");
    console.error(error);
  }
});

```

Básicamente aquí estamos haciendo uso de los [hooks](https://mochajs.org/#hooks) de *mocha* para ejecutar código antes de cualquier test. Así podemos añadir a nuestra base de datos los *datos mocks* que necesitemos y siempre tener el estado ideal al inicio de nuestros tests. Además, vamos a inicializar *chai* con el tipo *assertion*.

Para poder importar los ficheros json en TypeScript, vamos a tener que añadir la opción [esModuleInterop](https://www.typescriptlang.org/tsconfig#esModuleInterop) junto a `resolveJsonModule` para poder importar los archivos json en nuestro proyecto TypeScript.

```json title="api/tsconfig.json"
    "compilerOptions": {
        "outDir": "./build/",
        "baseUrl": "./",
        "module": "commonjs",
        "noImplicitAny": true,
        "noUnusedLocals": true,
        // highlight-start
        "esModuleInterop": true,
        "resolveJsonModule": true,
        // highlight-end
        "target": "es6",
        "sourceMap": true,
        "plugins": [{
            "name": "tslint-language-service"
        }],
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "include": [
        "./src/**/*", "test"
    ],
    "exclude": [
        "node_modules"
    ]
```

Al incluir este cambio debemos modificar algunas importaciones, por ejemplo `import * as express from 'express';` pasará a `import express from 'express';` para poder importar el módulo por defecto, podéis ver los cambios en las importaciones en [este commit](https://github.com/lucferbux/Taller-Testing-Security/commit/771ee9a528d9737ac572ba1a7116123e81a55f9d).

Para empezar a probar los endpoints que hemos creado, vamos a fijarnos en el ejemplo de api de autenticación.

```js title="backend/test/authIntegration.ts"
import request from "supertest";
import app from "../src/config/server/server";
import user from "./fixtures/user.json";


/**
 * storing globals to access them in API requests
 */
let global = {
  token: "",
  update_id: "",
}
global.token = "";
global.update_id = "";

describe("Authentication Integration Test", () => {
  it("login form", (done) => {
    request(app)
      .post("/auth/login")
      .type("form")
      .send(user)
      .expect((res) => {
        res.status.should.equal(200);
        res.body.token.should.be.a("string");
        global.token = res.body.token;
      })
      .end(done);
  });

  it("get authenticated user", (done) => {
    request(app)
      .get("/v1/users/")
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null;
        res.body.length.should.be.above(0);
        res.body[0].email.should.equal(user.email);
      })
      .end(done);
  });

  it("logout auth", (done) => {
    request(app)
      .post("/auth/logout")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.message.should.be.a("string");
      })
      .end(done);
  });
});
```

Como podemos observar, realizamos la autenticación de formulario con un username/password mockeado para probar si efectivamente nuestro backend está aceptando las conexiones.

En este caso estamos realizando peticiones con *supertest*, como podemos ver en `request(app).post("/auth/login")` y luego comprobando si el resultado es correcto con *chai* como podemos ver en `res.status.should.equal(200);`. Esta es la dinámica que vamos a seguir en todos los test de integración que realicemos de la api.

Ahora solo tendremos que ejecutar `npm run test` para ver si nuestros tests se ejecutan correctamente.

![testing cli](../../static/img/tutorial/testing/5_testing_pass.png)
