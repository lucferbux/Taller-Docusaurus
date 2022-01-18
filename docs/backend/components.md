---
sidebar_position: 7
---

# Componentes

La carpeta `components` contiene todos los ficheros que definirán, modelarán, y se encargarán del tratamiento de los datos del servidor. Actualmente nuestro servicio cuenta con los siguientes modelos: `AboutMe`, para la información que poblará la carta de *About Me*, `Auth`, con el modelo de autenticación con el servicio, `Projects` con los datos de los proyectos y por último `User`, con el modelo del usuario autenticado.

Además de estas carpetas, que cada uno contendrá un fichero para las distintas funcionalidades, tendremos el archivo `validation.ts` con la lógica de validación mediante [Joi](dependencies#joi).

## Interfaz

La parte donde se declara los métodos de tratamiento de datos que podremos realizar sobre el tipo de dato en concreto.

```tsx title="src/components/AboutMe/interface.ts"
export interface IAboutMeService {
    /**
     * @returns {Promise<IAboutMeModel>}
     * @memberof IAboutMeService
     */
    findAll(): Promise<IAboutMeModel>;

    /**
     * @param {string} code
     * @returns {Promise<IAboutMeModel>}
     * @memberof IAboutMeService
     */
    findOne(code: string): Promise<IAboutMeModel>;

    /**
     * @param {IAboutMeModel} IAboutMeModel
     * @returns {Promise<IAboutMeModel>}
     * @memberof IAboutMeService
     */
    insert(IAboutMeModel: IAboutMeModel): Promise<IAboutMeModel>;

    /**
     * @param {string} id
     * @returns {Promise<IAboutMeModel>}
     * @memberof IAboutMeService
     */
    remove(id: string): Promise<IAboutMeModel>;
}
```

## Indice

Es el *punto de entrada* de nuestro modelo, contiene la implementación de la `interface` en unas *funciones manejadoras* que pasaremos a las rutas. Estas funciones aceptan una request, ejecutan la lógica de la aplicación y devuelven un resultado o un error dependiendo de la ejecución.

```tsx title="src/components/AboutMe/index.ts"
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const aboutMeArray: IAboutMeModel = await AboutMeService.findAll();

        res.status(200).json(aboutMeArray);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const aboutMe: IAboutMeModel = await AboutMeService.findOne(req.params.id);

        res.status(200).json(aboutMe);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
...
```

## Modelo

Aquí definimos la `interface` del modelo de datos, como ya vimos en el [curso de JavaScript](https://javascript-course-threepoints.netlify.app/typescript/1_introduccion/index.html#interfaces).

```tsx title="src/components/AboutMe/model.ts"
export interface IAboutMeModel{
    id: string;
    name: string;
    birthday: number;
    nationality: string;
    job: string;
    github: string;
}

export default IAboutMeModel;
```

## Servicio

El archivo `service.ts` de momento llamará al objeto *mock* que tengamos creado, pero existe para en un futuro cercano poder implementar la lógica de acceso a la base de datos.

```tsx title="src/components/AboutMe/service.ts"
const AboutMeService: IAboutMeService = {
    /**
     * @returns {Promise < IAboutMeModel >}
     * @memberof AboutMeService
     */
    async findAll(): Promise<IAboutMeModel> {
        try {
            const result = MockAboutMe;
            if(result.length > 0){
                return result[0];
            } else {
                throw new Error("empty search");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
...
```

## Mock

Por último el fichero `mock.ts` es un archivo temporal para esta sesión que guardará la información que en un futuro tendremos almacenada en la base de datos.

```tsx title="src/components/AboutMe/mock.ts"
export const  MockAboutMe = [
    {
        "id": "12389asdfasf8",
        "name": "Lucas Fernández Aragón",
        "birthday": 765817712000,
        "nationality": "Spain",
        "job": "Red Hat",
        "github": "https://github.com/lucferbux"
    }
]
```
