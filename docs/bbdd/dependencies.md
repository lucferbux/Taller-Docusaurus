---
sidebar_position: 2
---

# Dependencias

Vamos a repasar las dependencias más importantes de este tercer proyecto para comprender cómo está configurado.

## Joi

Validador de datos y esquemas para JavaScript. Báscamente sirve para añadir validaciones a los atributos de un objeto. En nuestro caso lo usaremos para asegurarnos de que los diferentes atributos de cada documento de nuestra base de datos tenga el formato adecuado (por ejemplo longitudes mínimas de una cadena, que un mail tenga un formato determinado, que algunos atributos sean obligatorios y otros no...)

[Enlace a la documentación](https://github.com/sideway/joi)

## MongoDB

Base de Datos No Relacional orientado a documentos. Cada registro en MongoDB es un documento, que básicamente es una estructura de datos compuesta atributos formados por clave/valor. Estos documentos son bastante similares a objetos JSON, siendo que sus valores pueden incluir otros documentos, arrays e incluso arrays de documentos. Lo más interesante de MongoDB es que permite un **alto rendimiento** en el procesamiento de datos, una **alta disponibilidad** con replicación y redundancia, **escalabilidad horizontal**, permitiendo responder a grandes picos de demanda con más replicación y por último la capacidad de adaptar el **motor de almacenamiento** dependiendo de las necesidades de cada proyecto.

[Enlace a la documentación](https://www.mongodb.com)


## Mongoose

Librería de express para modelado de objetos MongoDB. Mongoose ofrece una solución sencilla, basada en esquemas, para modelar los datos de nuestra aplicación. Incluye algunas funcionalidades como *casteado* de tipos, validación de atributos, construcción de búsquedas y mucho más. Mongoose se integra de forma muy sencilla en nuestro proyecto *Node* para poder conectarnos a nuestra base de datos *MongoDB* y gestionarla de una forma sencilla.

[Enlace a la documentación](https://mongoosejs.com)
