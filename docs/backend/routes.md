---
sidebar_position: 6
---

# Rutas

El término *"enrutar"* se refiere a como los endpoints de una aplicación (URIs) responden a las peticiones del cliente. Estas peticiones son métodos *HTTP* como GET, POST, PUT...

Cada ruta debe tener una o más funciones manejadoras que se ejecutan cuando la ruta coincide. Esta elección se realiza en forma de cascada según tengamos nuestras rutas dispuestas en nuestro fichero.

Vamos a ver como tenemos implementadas las rutas en nuestro proyecto.

## Índice

Nuestro índice tiene una función principal llamda `init`, que instancia un objeto **router** para construir todas las rutas y luego irá llamando a cada *sub-ruta* mediante la función `app.use(...)`, que tomará el *path* que queremos asignar a nuestra ruta, algún *middleware* como la comprobación de si necesita estár autenticada y por último el fichero con las rutas que queremos soportar.

```ts title="src/routes/index.ts"
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);

    /**
     * @description
     *  Forwards any requests to the /v1/aboutMe URI to our AboutMeRouter
     *  Also, check if user authenticated
     * @constructs
     */
     app.use('/v1/aboutMe', AboutMeRouter);

     /**
     * @description
     *  Forwards any requests to the /v1/projects URI to our ProjectsRouter
     *  Also, check if user authenticated
     * @constructs
     */
      app.use('/v1/projects', ProjectsRouter);

    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);

    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    }

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
```

Además podemos ver que si tenemos configurado *swaggerDoc* podremos tener habilitada la ruta */docs*, donde podremos lanzar nuestra especificación *OpenAPI*.

## Rutas anidadas

Dentro de `routes/index.ts` hemos visto que uno de los argumentos que se le pasa a la función es un fichero declarado con las rutas específicas para un *path* determinado. En este fichero declararemos los métodos *HTTP* que soportará nuestra ruta, instanciando el objeto router mediante `const router: Router = Router();` y luego llamando al método *HTTP* que queramos, junto a la función manejadora que controle esa ruta, como podemos observar en el siguiente archivo:

```ts title="src/routes/UseRouter"
import { Router } from 'express';
import { UserComponent } from '@/components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', UserComponent.findAll);

router.get('/:id', UserComponent.findOne);


/**
 * @export {express.Router}
 */
export default router;
```
