---
sidebar_position: 3
---

# Docker en Desarrollo

![Docker en desarrollo](../../static/img/tutorial/container/1_container_dev.svg)

## Arquitectura

```yaml title="docker-compose.yml"
version: '3.9'

services:

  ui:
    container_name: ui_react
    build:
      context: ./ui
      dockerfile: Dockerfile
    environment:
      REACT_APP_PROXY_HOST: http://api:4000
    ports:
      - 3000:3000
    depends_on:
      - api
    networks:
      - mynet

  api:
    container_name: api_express
    build:
      context: ./api
      dockerfile: Dockerfile
    depends_on:
      - mongodb
    expose:
      - 4000
    restart: always
    environment:
      NODE_ENV: development
      SECRET: e42d8dd28adf34fc489044d5aa21e5166f22a6ef
      MONGODB_URI: mongodb://mongodb:27017/
      MONGODB_DB_MAIN: portfolio_db
      PORT: 4000
    networks:
      - mynet

  mongodb:
    container_name: mongodb
    image: mongo:latest
    restart: always
    environment:
        MONGO_INITDB_DATABASE: portfolio_db
    ports:
      - 27017:27017
    volumes:
      - ./scripts/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - mynet

networks:
  mynet:
```

## Frontend

```dockerfile title="ui/Dockerfile"
FROM node:17-alpine3.14
WORKDIR /usr/src/app
RUN npm install react-scripts@4.0.3 -g
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install
COPY . .
CMD ["npm", "run", "start:docker"];
```

```.dockerignore title="ui/.dockerignore"
build
node_modules
```

```jsx title="ui/src/setUpProxy.js"
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_HOST,
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_HOST,
      changeOrigin: true,
    })
  );
};
```

## Backend y bbdd

```dockerfile title="api/Dockerfile"
FROM node:17-alpine3.14
WORKDIR /usr/src/app 
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"];
```

```.dockerignore title="api/.dockerignore"
build
node_modules
```

```js title="scripts/mongo-init.js"
db = db.getSiblingDB('portfolio_db');

db.createCollection('users');
db.createCollection('profile');
db.createCollection('profile');

db.users.insertMany([
    {
        "email": "lucasfernandezaragon@gmail.com",
        "password": "$2b$10$JPu9IXwoLajqFiFFUTpE8OSC1RSK/XNb0n1hsx4ap7cghyo/YYDka",
        "tokens": []
    }
]
);
db.profile.insertMany([
    {
        "name": "Lucas Fernández Aragón",
        "birthday": 765817712000,
        "nationality": "Spain",
        "job": "Red Hat",
        "github": "https://github.com/lucferbux"
    }
]);
db.projects.insertMany([
    {
        "title": "React",
        "description": "React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad",
        "version": "17.0.1",
        "link": "https://reactjs.org/docs/hello-world.html",
        "tag": "JavaScript, Typescript, React",
        "timestamp": 765817712000
    },
    {
        "title": "Create React App",
        "description": "Toolchain para la creación de proyectos basados en React, contiene lo báisco para crear proyectos basados en single-page apps",
        "version": "4.0.3",
        "link": "https://create-react-app.dev",
        "tag": "Toolchain, React, Bootstraping",
        "timestamp": 765817712001
    },
    {
        "title": "Styled components",
        "description": "Librería que permite usar template literals y css para crear estilos en componente con JavaScript",
        "version": "5.2.1",
        "link": "https://styled-components.com/docs",
        "tag": "CSS, JavaScript, Babel",
        "timestamp": 765817712002
    },
    {
        "title": "React i18next",
        "description": "Internacionalización de nuestro proyecto en React.",
        "version": "19.9.2",
        "link": "https://react.i18next.com",
        "tag": "JavaScript, i18n, React",
        "timestamp": 765817712003
    },
    {
        "title": "React Lottie",
        "description": "Animaciones en alta calidad que cuentan con distintos tipos de reproducción.",
        "version": "1.2.3",
        "link": "https://airbnb.design/lottie/",
        "tag": "Animation, React, Aribnb",
        "timestamp": 765817712004
    },
    {
        "title": "React Router",
        "description": "Navegación entre páginas dentro de nuestra web app.",
        "version": "5.2.0",
        "link": "https://reactrouter.com/web/guides/quick-start",
        "tag": "Navigation, routing",
        "timestamp": 765817712005
    },
    {
        "title": "Swagger",
        "description": "Herramienta para creación de especificaciones OpenAPI",
        "version": "3.0,2",
        "link": "https://app.swaggerhub.com/apis/lucferbux/ThreePoints/1.0.0",
        "tag": "API, OpenAPI",
        "timestamp": 765817712006
    },
    {
        "title": "Figma",
        "description": "Herramienta de diseño vectorial y prototipado",
        "version": "-",
        "link": "https://www.figma.com/proto/3e43h8TrzwpjfKwXvFxZoP/Taller?page-id=144%3A51&node-id=308%3A1187&viewport=254%2C48%2C0.12&scaling=min-zoom&starting-point-node-id=147%3A3",
        "tag": "Vector, UX, UI",
        "timestamp": 765817712007
    },
    {
        "title": "JWT",
        "description": "Estandar de autenticacion muy popular en APIs",
        "version": "6.1.0",
        "link": "https://jwt.io/",
        "tag": "Auth, Secure, Networking",
        "timestamp": 765817712008
    },
    {
        "title": "Express Router",
        "description": "Web Framework para Node.js que controla la navegación de la webapp",
        "version": "4.17.1",
        "link": "http://expressjs.com",
        "tag": "Server, Backend, Networking",
        "timestamp": 765817712009
    },
    {
        "title": "DotEnv",
        "description": "Herramienta gestión de variables entorno y su carga dinámica",
        "version": "10.0.0",
        "link": "https://github.com/motdotla/dotenv#readme",
        "tag": "Javascript, Env Variable",
        "timestamp": 765817712010
    },
    {
        "title": "Mongoose",
        "description": "Librería de express para modelado de objetos mongodb",
        "version": "6.0.13",
        "link": "https://mongoosejs.com/",
        "tag": "Javascript, Env Variable",
        "timestamp": 765817712011
    },
    {
        "title": "MongoDB",
        "description": "Base de Datos No Relacional orientado a documentos",
        "version": "10.0.0",
        "link": "https://github.com/motdotla/dotenv#readme",
        "tag": "Javascript, Env Variable",
        "timestamp": 765817712012
    },
    {
        "title": "Joi",
        "description": "Validador de datos y esquemas para JavaScript",
        "version": "17.5.0",
        "link": "https://github.com/sideway/joi",
        "tag": "Javascript, Schema, Validator",
        "timestamp": 765817712018
    }
    
]);
```
