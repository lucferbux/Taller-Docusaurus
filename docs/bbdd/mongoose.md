---
sidebar_position: 4
---

# Mongoose

## Overview

Librería de express para modelado de objetos MongoDB. Mongoose ofrece una solución sencilla, basada en esquemas, para modelar los datos de nuestra aplicación. Incluye algunas funcionalidades como *casteado* de tipos, validación de atributos, construcción de búsquedas y mucho más. Mongoose se integra de forma muy sencilla en nuestro proyecto *Node* para poder conectarnos a nuestra base de datos *MongoDB* y gestionarla de una forma sencilla.

## Inicialización

Es relativamente sencillo conectarse a una base de datos *MongoDB* mediante *Mongoose*. Solamente necesitamos la *uri* de conexión para instanciar un objeto `mongoose.Connection`. A este objeto se pasan como atributo la *uri* y las opciones de conexión. En nuestro proyecto tendremos la funcionalidad de auto-conexión activa, un número ilimitado de intentos de reconexión, 1000ms de intervalos de conexión...

Además, el objeto db tendrá una serie de *callbacks* para determinados eventos, como por ejemplo en la conexión con la base de datos, en algún error, reconexiones...

```ts title="backend/src/config/connection/connection.ts"
const connectOptions: IConnectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

const MONGO_URI: string = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

// handlers
db.on('connecting', () => {
    Logger.info('[MongoDB] connecting');
});

db.on('error', (error: any) => {
    Logger.error(`[MongoDB] connection ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    Logger.info('[MongoDB] connected');
});

db.once('open', () => {
    Logger.info('[MongoDB] connection opened');
});

db.on('reconnected', () => {
    Logger.warn('[MongoDB] reconnected');
});

db.on('reconnectFailed', () => {
    Logger.error('[MongoDB] reconnectFailed');
});

db.on('disconnected', () => {
    Logger.warn('[MongoDB] disconnected');
});

db.on('fullsetup', () => {
    Logger.debug('[MongoDB] reconnecting... %d');
});
```

## Esquemas y documentos

Todos los objetos den Mongoose comienzan con un Esquema. Cada *esquema* relaciona una colección MongoDB y define la forma de los documentos en cada colección. Tenéis mucha más información de los esquemas en [su documentación](https://mongoosejs.com/docs/guide.html)

```ts title="backend/src/components/Projects/model.ts"
const ProjectsSchema: Schema = new Schema(
    {
        id: {
            type: String,
            unique: true,
            trim: true,
        },
        title: String,
        description: String,
        version: String,
        link: String,
        tag: String,
        timestamp: Number,
    },
    {
        collection: 'projects',
        versionKey: false,
    }
)
```

Por otro lado los documentos representan una correlación uno a uno a los documentos almacenados en MongoDB. Cada documento es una instancia de su Modelo y permite realizar operaciones de lectura y escritura dentro de nuestras colecciones.

```ts title="backend/src/components/Projects/model.ts"
export interface IProjectsModel extends Document {
    id: string;
    title: string;
    description: string;
    version: string;
    link: string;
    tag: string;
    timestamp: number;
}
```

Al realizar esto, podremos exportar nuestro Modelo utilizando nuestro *Documento* como tipo e inicializándolo con nuestro *esquema*. Así al exportar este objeto tendremos la capacidad de realizar operaciones de lectura y escritura *CRUD* con nuestros documentos.

```ts title="backend/src/components/Projects/model.ts"
export default connections.db.model<IProjectsModel>('ProjectsModel', ProjectsSchema);
```

## Variables de entorno

Además de todo esto, vamos a añadir las variables de entorno para la conexión de Mongoose con nuestra instancia de Mongo.

```tsx title="api/src/config/env/index.tsx
interface IConfig {
  port: string | number;
  // highlight-start
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  // highlight-end
  secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 3000,
  // highlight-start
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'example_db'
  },
  // highlight-end
  secret: process.env.SECRET || 'secret'
};

const production: IConfig = {
  port: process.env.PORT || 3000,
  // highlight-start
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'example_db'
  },
  // highlight-end
  secret: process.env.SECRET || 'secret'
};

const test: IConfig = {
  port: process.env.PORT || 3000,
  // highlight-start
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
    MONGODB_DB_MAIN: `${process.env.MONGODB_DB_MAIN || 'example_db'}_testing`
  },
  // highlight-end
  secret: process.env.SECRET || 'secret'
};
```
