---
sidebar_position: 4
---

# Swagger

Swagger es un conjunto de herramientas de software de código abierto para diseñar, construir, documentar, y utilizar servicios web RESTful. Fue desarrollado por SmartBear Software e incluye documentación automatizada, generación de código, y generación de casos de prueba. Las herramientas pueden dividirse en varios casos de uso: desarrollo, interacción con API y documentación.

En nuestro proyecto, lo vamos a utilizar para definir tanto las rutas de nuestra *API* como el modelo de datos. Existe una [live version](https://app.swaggerhub.com/apis/lucferbux/ThreePoints/1.0.0) configurada, pero nuestro propio backend soporta la especificación.

![swagger-spec](../../static/img/tutorial/backend/swagger.png)
*Swagger API*

Una de las grandes bondades que tiene *Swagger* como herramienta es que podremos exportar los modelos a muchos lenguajes de programación, por lo que si hacemos cambios, podremos exportarlos tanto al *backend* como al *frontend* para asegurarnos que se mantienen sincronizados.

Como hemos comentado, el backend soporta la visualización de la especificación de OpenAPI extraída de Swagger. La documentación se encuentra en la ruta:

```bash
[NodeRoute]/docs
Default -> http://localhost:4000/docs
```
