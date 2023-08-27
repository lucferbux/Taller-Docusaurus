---
sidebar_position: 5
---

# Fortificar el backend

## Rate Limit

Ahora vamos a añadir una nueva configuración a nuestro *backend* para limitar la cantidad de llamadas que pueden realizarse mediante un cliente a un endpoint determinado. Vamos a utilzar una librería llamada [express-rate-limit](https://github.com/nfriedly/express-rate-limit) ejecutando en el backend `npm install express-rate-limit` (acuerdate de estar primero en el directorio del backend `cd backend`).

Una vez hecho esto solo tendremos que añadir la configuración al middleware con los atributos que nos interese, en nuestro caso tener una ventana de 15 minutos, limitar a cada ip con 100 peticiones cada 15 minutos y que devuelva en las cabeceras el límite que queda.

```ts title=""
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
    // express middleware
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors({
        exposedHeaders: ['Authorization'],
        optionsSuccessStatus: HttpStatus.OK,
    }));

    // Apply the rate limiting middleware to all requests
    app.use(limiter)

    // custom errors
    app.use(sendHttpErrorModule);
}
```

Ahora al hacer peticiones podremos ver en la cabecera el límite y las peticiones restantes que nos quedan. Esto es muy util para prevenir ataques de fuerza bruta o similares.

![limit header](../../static/img/tutorial/security/4_rate_limit.png)

## Helmet

Pese a que esta libería ya venía instalada de antes (sinceramente, se me olvidó eliminarla para poder incluirla en esta sección), vamos a hablar un poco de su funcionamiento. Básicamente añadiendo una línea de código en nuestra aplicación:

```ts
app.use(helmet())
```

Nos va a añadir 11 paquetes que ayudará a nuestra aplicación a bloquear código malicioso, vamos a comentar algunas de las librerías.

* **helmet-csp:** Habilita la cabecera *Content-Security-Policy HTTP*. Esta cabecera define los orígenes de confianza del contenido (como scripts, imágenes y otros tipos de contenidos) que son permitidos por nuestra webapp.

* **dns-prefetch-control:** El pre-fetching de DNS suele ser bueno para acelerar los tiempos de carga. Al desahibiltar el pre-fecthing podemos limitar información sensible acerca de servicios externos usados por nuestra webapp.

* **frameguard:** Habilita la cabecera *X-Frame-Options HTTP*. Esta cabecera bloquea los intentos de *clickjacking* para deshabilitar la opción de que la página se renderice en algún otro sitio.

* **hpkp:** Añade cabeceras para *Public Key Pinning*, que básicamente ayudan a prevenir ataques de *Man In The Middle* con certificados falsos.

* **hsts:** Habilita la cabecera *Sctrict-Transport-Security*, que fuerza todas las conexiones a realizarse sobre HTTPs.

Si queréis consultar todas las librerías, las tenéis recogidas junto a las cabeceras que añaden en el [repositorio oficial](https://github.com/helmetjs/helmet).

## Mongoose y Joi

Al igual que con *Helmet*, voy a parar a hablar un momento acerca de los beneficios de implementar *Moongose* en nuestro proyecto. Al tener estructurado nuestro proyecto con los [Schemas](https://mongoosejs.com/docs/guide.html) de *Mongoose* y encima al tener la capa de validación extra de [Joi](https://joi.dev/api/?v=17.6.0) podemos asegurarnos que nuestra aplicación no es vulnerable a ataques *NoSQL*.

Como podemos comprobar [aquí](https://book.hacktricks.xyz/pentesting-web/nosql-injection), existe cierta sintáxis que hace que sea posible realizar ataques *NoSQL*, por ejemplo, si conectásemos nuestra aplicación con el propio [MongoDB Driver](https://docs.mongodb.com/drivers/), si no sanetizamos la entrada de nuestros formularios, podríamos caer en el siguiente error.

```ts title="NoSQL Injection"
User.findOne({
    "name" : req.params.name, 
    "password" : req.params.password
}, callback); 

req.post( { name: "whatever", password: "{ $ne: 1 }" })
```

La expresión `{ $ne: 1 }` implica *not equals 1*, por lo que aunque no sepamos la contraseña la condición se cumpliría siempre.

Con *Moongose* es un poco diferente, al seguir un *schema*, si la contraseña es un campo cadena, convertirá el objeto `{ $ne: 1 }` en una cadena, por lo que no se producirá ningún problema. Así, no es necesario *sanetizar* nuestras entradas.
