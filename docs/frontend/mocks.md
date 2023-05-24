---
sidebar_position: 10
---

# Mocks

Como hemos comentado al principio, todavía no tenemos un *backend* al que hacer peticiones para extraer la información con la que vamos a poblar nuestro *Dashboard*. Es por ello que para esta primera sección vamos a crear un fichero de *datos mock* para simular estas peticiones y poder reemplazarlas fácilmente al integrar nuestro *backend*.

La estructura es esncilla, vamos a hacer uso de funciones que devuelvan **promesas** con el resultado de la petición. Para aportar un poco más de realismo, vamos a incluir un *timeout* de unos segundos para simular el tiempo de espera al lanzar las peticiones. De momento vamos a tener las siguientes llamadas.

## Login

La primera petición va a ser la de **login**. En este caso, vamos a tener una función que acepte un *username* y un *password*, y, mediante una promesa, dictamine que si los datos son correctos envíe un **JWT** mientras que si son incorrectos devuelva el *rejected* de la promesa.

```tsx title="src/utils/mock-response.ts"
export const mockLogin = (userName: string, password: string) =>
  new Promise<TokenResponse>(function (resolve, rejected) {
    setTimeout(() => {
      if (userName === 'user@threepoints.com' && password === 'patata') {
        resolve(
          JSON.parse(
            `{"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg0YmJiM2Q0YTRkNDk1ZDYyNGJhYyIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjM2MzIyMzA3LCJleHAiOjE2MzYzMjU5MDd9.yxy7uKWXJx5rY8znRBTg5182llyH8Rs9R8C6_SM4LIg" }`
          )
        );
      } else {
        rejected(new Unauthorized());
      }
    }, 2000);
  });
export interface TokenResponse {
  token: string;
}
export interface ApiError {
  description?: string;
}
export class Unauthorized implements ApiError {}
```

## AboutMe y Projects

Por otro lado, de los modelos que hemos definido anteriormente, vamos a crear la información que va a poblar nuestro *Dashboard*, siguiendo la misma estructura que en el *login*. Vamos a tener dos funciones, `mockAboutme` y `mockProjects`, que van a devolver promesas con un *timeout*, y van a contener la información en formato JSON que conformará los tipos definidos en la sección de los [modelos](./models).

Vamos a agrupar las llamadas mediante `Promise.all` para pasarselo al `Dashboard`.

```tsx title="src/utils/mock-response.ts"
export interface DashboardInfo {
  aboutMe: AboutMe;
  projects: Project[];
}

export const mockFetchDashboard = () =>
  Promise.all([mockAboutme(), mockProjects()]).then(([aboutMe, projects]) => {
    return {
      aboutMe,
      projects
    };
  });

export const mockAboutme = () => new Promise<AboutMe>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `{
            "id":"12389asdfasf8",
            "name":"Lucas Fernández Aragón",
            "birthday":765817712000,
            "nationality":"Spain",
            "job":"Red Hat",
            "github":"https://github.com/lucferbux"
            }`
        ));
    }, 500);

});

export const mockProjects = () => new Promise<Project[]>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `[
                {
                "id":"12349as8df90",
                "title":"React",
                "description":"React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad",
                "version":"17.0.1",
                "link":"https://reactjs.org/docs/hello-world.html",
                "tag":"JavaScript, Typescript, React",
                "timestamp":"765817712000"
                },
                {
                "id":"789asdfas89",
                "title":"Vite",
                "description":"Toolchain para la creación de proyectos basados en React, contiene lo báisco para crear proyectos basados en single-page apps",
                "version":"4.0.3",
                "link":"https://vitejs.dev",
                "tag":"Toolchain, React, Bootstraping",
                "timestamp":"765817712001"
                },
                {
                "id":"56765asdfasdf8",
                "title":"Styled components",
                "description":"Librería que permite usar template literals y css para crear estilos en componente con JavaScript",
                "version":"5.2.1",
                "link":"https://styled-components.com/docs",
                "tag":"CSS, JavaScript, Babel",
                "timestamp":"765817712002"
                },
                {
                "id":"56765asdfasdf8",
                "title":"React i18next",
                "description":"Internacionalización de nuestro proyecto en React.",
                "version":"19.9.2",
                "link":"https://react.i18next.com",
                "tag":"JavaScript, i18n, React",
                "timestamp":"765817712003"
                },
                {
                "id":"25634iuoasdf8",
                "title":"React Lottie",
                "description":"Animaciones en alta calidad que cuentan con distintos tipos de reproducción.",
                "version":"1.2.3",
                "link":"https://airbnb.design/lottie/",
                "tag":"Animation, React, Aribnb",
                "timestamp":"765817712004"
                },
                {
                "id":"7890asdf890",
                "title":"React Router",
                "description":"Navegación entre páginas dentro de nuestra web app.",
                "version":"5.2.0",
                "link":"https://reactrouter.com/web/guides/quick-start",
                "tag":"Navigation, routing",
                "timestamp":"765817712005"
                },
                {
                "id":"7890asdf890",
                "title":"Swagger",
                "description":"Herramienta para creación de especificaciones OpenAPI",
                "version":"3.0,2",
                "link":"https://swagger.io",
                "tag":"API, OpenAPI",
                "timestamp":"765817712006"
                },
                {
                "id":"7890asdf890",
                "title":"Figma",
                "description":"Herramienta de diseño vectorial y prototipado",
                "version":"-",
                "link":"https://www.figma.com/proto/3e43h8TrzwpjfKwXvFxZoP/Taller?page-id=144%3A51&node-id=308%3A1187&viewport=254%2C48%2C0.12&scaling=min-zoom&starting-point-node-id=147%3A3",
                "tag":"Vector, UX, UI",
                "timestamp":"765817712007"
                }
            ]`
        ));
    }, 500);

});
```
