---
sidebar_position: 8
---

# Cambios en Front-End

Ya hemos hablado acerca de casi todas las características de nuestro *backend*. Antes de terminar esta sesión con los detalles de implementación de la [autenticación](./authentication), vamos a hablar un poco de los cambios en nuestro proyecto *frontend* para adecuar su funcionamiento e integrarlo con nuestro *servicio*.

## Api

El primer cambio más evidente al abrir el *frontend* es la inclusión de la carpeta `api`. Aquí vamos a tener implementada toda la lógica de *networking* de nuestro cliente. El primer archivo, `api-client-factory.ts` contiene una implementación del patrón de diseño [factory method](https://refactoring.guru/design-patterns/factory-method) para poder instanciar un tipo diferente de *Objeto API* dependiendo del *target de ejecución*. Esto será muy útil cuando implementemos el testing y tengamos que simular las conexiones de red.

```ts title="ui/src/api/api-client-factory.ts"
export default function createApiClient(): ApiClient {
  if (process.env.NODE_ENV === "production") {
    if (API_BASE_URI !== undefined) {
      return new HttpApiClient(API_BASE_URI);
    } else {
      throw Error("Unable to fetch API url in production");
    }
  } else {
    if (API_BASE_URI !== undefined) {
      return new HttpApiClient(API_BASE_URI);
    } else {
      return new HttpApiClient("http://localhost:4000");
    }
  }
}
```

Dentro de `api-client.ts` declararemos las *clases* e *interfaces* que deberemos implementar. Igual que la factoría anterior, de momento solo implementaremos la instancia *HTTP*, pero en un futuro vendrá bien para tener la instancia dedicada a simular conexiones de red.

```ts title="ui/src/api/api-client.ts"
...
export class PreconditionFailed implements ApiError {}
export class PreconditionRequired implements ApiError {}

export interface TokenResponse {
  token: string;
}

export interface ProjectResponse {
  message: string
}

export default interface ApiClient {
  token(email: string, password: string): Promise<TokenResponse>;
  getAboutMe(): Promise<AboutMe>;
  getProjects(): Promise<Project[]>;
  postProject(project: Project): Promise<ProjectResponse>;
}
```

Por último tenemos `http-api-client.ts`, la implementación actual de la clase con todos los métodos de *networking* que utilizará nuestra aplicación, que usará la librería [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) para realizar las llamadas al *backend* y gestionar la lógica al procesar la respuesta.

```ts title="ui/src/api/api-client.ts"
...
// TODO: Uncomment to use it with auth
// const getAuthorizationHeader = () => {
//   const accessToken = getAccessToken();
//   if (accessToken) {
//     return "Bearer " + accessToken;
//   } else {
//     throw new Unauthorized();
//   }
// };

export default class HttpApiClient implements ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async token(email: string, password: string): Promise<TokenResponse> {
    const body = new URLSearchParams({
      email: email,
      password: password
    })
    const response = await fetch(this.baseUrl + "/auth/login", {
      method: "POST",
      body: body,
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  }


  getAboutMe = (): Promise<AboutMe> =>
    handleResponse(async () => {
      const response = await fetch(
        this.baseUrl + `/v1/aboutme/`,
        {
          method: "GET",
          headers: {
            //Authorization: getAuthorizationHeader()
          }
        }
      );
      if (!response.ok) {
        throw await createApiError(response);
      }
      return response.json();
    });

  getProjects = (): Promise<Project[]> =>
    handleResponse(async () => {
      const response = await fetch(
        this.baseUrl + `/v1/projects/`,
        {
          method: "GET",
          headers: {
            //Authorization: getAuthorizationHeader()
          }
        }
      );
      if (!response.ok) {
        throw await createApiError(response);
      }
      return response.json();
    });
...
```

## Auth

Dentro de la autenticación, vamos a cambiar dos pequeños detalles de gran importancia. Primero en el archivo `auth.ts` cambiaremos la función `logoutIfExpiredHandlerId` para que **expire el token automáticamente* haciendo el cálculo con su timestamp de expiración. Y segundo comprobaremos dentro de la función `isTokenActive()`, si el timestamp sigue siendo válido.

```ts title="ui/src/utils/auth.ts"
...
export function setLogoutIfExpiredHandler(
    setUser: (user: any) => void
) {
  if (!isTokenActive()) {
    return;
  }
  const token = getToken();
  if (!token) {
    return;
  }

  logoutIfExpiredHandlerId = setTimeout(
    () => setUser(undefined),
    token.expirationTimestampInMillis - Date.now()
  );
}
...
function isTokenActive(): boolean {
  const token = getToken();
  const currentTimestamp = Date.now();

  return !!(
    token &&
    token.expirationTimestampInMillis - currentTimestamp > 0 &&
    token.notBeforeTimestampInMillis <= currentTimestamp
  );
}
```

Por otro lado, en `AuthContext.tsx` pasaremos de llamar al objeto *Mock* para el login a la función de nuestra *API* para realizar el login.

```tsx title="ui/src/context/AuthContext.tsx"
const login = useCallback(
    async (username: string, password: string) => {
        const api = createApiClient();
        try {
            const result = await api.token(username, password);
            setAuthToken(result.token);
            setLogoutIfExpiredHandler(setUser);
            loadUser();
        } catch (apiError) {
            throw new Error();
        }
    }, 
[setUser, loadUser])
```

## Dashboard

Por último vamos a ver la implementación de nuestro objeto *API* en uno de los componentes en los que estábamos llamando al objeto *mock*. Como podemos ver en `Dasboard.tsx` cambiamos las llamadas a mock a una instanciación del objeto api mediante la función de factoría `createApliClient()` y después de manera bastante sencilla llamamos a las funciones para obtener los *proyectos* y *about me* de forma asíncrona con **await**.

```tsx title="ui/src/components/routes/Dashboard.tsx"
async function retrieveInfo() {
    const api = createApiClient();
    try {
    startSearch(t("loader.text"));
    const projects: Project[] = await api.getProjects();
    const aboutme: AboutMe = await api.getAboutMe();
    setResponse({ aboutme, projects });
    } catch(Error) {
    setError("Info not found");
    } finally {
    stopSearch();
    }
}
```
