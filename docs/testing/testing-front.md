---
sidebar_position: 7
---

# Testing FrontEnd

Ahora vamos a hablar de *Jest* y *React Testing library*. Jest es una librería open source escrita en JavaScript, muy optimizada para apliaciones *React* que permite implementar *tests unitarios* y junto a *react-testing-library*, escribir test de integración en nuestro proyecto.

Ambas librerías vienen instaladas por defecto en nuestro proyecto, ya que lo creamos con la *toolchain* `create-react-app`. Ahora bien, si fuese necesario incluirlo, solo habría que ejecutar los siguientes comandos:

* `npm install --save-dev jest`
* `npm install --save-dev @testing-library/react`

## Tests Integración

Para empezar a crear tests en react, solo tenemos que empezar a crear ficheros con una convención específica para que *create-react-app* identifique que son tests:

* Archivos con extensión `.ts` dentro de carpetas `__tests__`. (Puede haber tantas carpetas `__tests__` como queramos).
* Archivos con extensión `.test.ts`.
* Archivos con extensión `.spec.js`.

Desde la documentación oficial de *create-react-app* recomiendan utilizar la primera opción, mantener carpetas `__tests__` en los directorios donde estemos testeando nuestro código, así las importaciones se mantienen cortas. Vamos a crear un par de ejemplos para probar algunos componentes.

```ts title="ui/src/components/layouts/__tests__/HeaderTest.tsx"
import React from "react";
import Header from "../header";
import {render, fireEvent, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

jest.mock('react-i18next')

test('check exact three links', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  
  )
  expect(screen.getAllByRole("link").length).toEqual(3);

  expect(screen.getByText("nav.home")).toBeInTheDocument();
  expect(screen.getByText("nav.dashboard")).toBeInTheDocument();
  expect(screen.getByText("nav.admin")).toBeInTheDocument();
})
```

Este ejemplo sencillo comprueba los tags que usamos con i18next para traducir nuestros textos. Comprueba que tengamos 3 links en la navbar y que cada uno tiene el tag que le corresponde. Al ejecutar `npm run test` tenemos lo siguiente.

![testing cli](../../static/img/tutorial/testing/4_testing_cli.png)

Ya tenemos nuestro primer test, vamos a añadir unos cuantos componentes más para aumentar el coverage de nuestro proyecto.

```ts title="ui/src/components/card/__tests__/ProjectCardTests.tsx"
const projectMock: Project = {
  _id: "8a9sdfasdf989fd",
  title: "React",
  description: "React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad",
  version: "17.0.1",
  link: "https://reactjs.org/docs/hello-world.html",
  tag: "JavaScript, Typescript, React",
  timestamp: 765817712000
};

const userLogggedMock: User = { active: true, _id: "a8sfd9sf", email: "johndoe@gmail.com" }


const mockFeatured = "FEATURED";

test('Card Title', () => {
  const { getByText } = render(<ProjectCard project={projectMock} user={undefined} closeButton={() => {}} updateButton={() => {}}/>)
  expect(getByText(projectMock.title)).toBeInTheDocument();
})

test('Card Description', () => {
  const { getByText } = render(<ProjectCard project={projectMock} user={undefined} closeButton={() => {}} updateButton={() => {}}/>)
  expect(getByText(projectMock.description)).toBeInTheDocument();
})

test('Card Version', () => {
  const { getByText } = render(<ProjectCard project={projectMock} user={undefined} closeButton={() => {}} updateButton={() => {}}/>)
  expect(getByText(projectMock.version)).toBeInTheDocument();
})

test('Featured filled', () => {
  const { getByText } = render(<ProjectCard project={projectMock} user={undefined} captionText={mockFeatured} closeButton={() => {}} updateButton={() => {}}/>)
  expect(getByText(mockFeatured)).toBeInTheDocument();
})

test('Featured empty', () => {
  render(<ProjectCard project={projectMock} user={undefined} closeButton={() => {}} updateButton={() => {}}/>)
  expect(screen.getByTestId("caption").textContent).toBe("");
})

test('User logged', () => {
  render(<ProjectCard project={projectMock} user={userLogggedMock} closeButton={() => {}} updateButton={() => {}}/>)
  expect(screen.getByTestId("menuButton")).toBeInTheDocument();
})

test('Caption empty', () => {
  render(<ProjectCard project={projectMock} user={undefined} closeButton={() => {}} updateButton={() => {}} />)
  expect(screen.getByTestId("caption").textContent).toBe("");
})

test('External link', () => {
  render(<ProjectCard project={projectMock} user={undefined} closeButton={() => {}} updateButton={() => {}}/>)
  expect(screen.getByRole("link")).toHaveAttribute("href", projectMock.link);
})
```

Como podemos ver aquí tenemos un test más complejo, estamos haciendo uso de *mockData* para comprobar el estado del componente y hacemos uso de métodos como `getByTestId` para referenciar un elemento al que hayamos incluido el tag `data-testid`.

```tsx
<CardCaption data-testid="caption">
    {props.captionText ? props.captionText : ""}
</CardCaption>
```


## Tests Unitarios

Para los tests unitarios sí que vamos a hacer uso de *Jest*, tanto para las *aserciones* en las respuestas de nuestro código como para *mockear* ciertos módulos, como por ejemplo toda nuestra API. La estructura es bastante clara, primero declaramos todos los elementos que queremos *mockear*, y declaramos nuestro *ApiClient* como un [jest Mock Functions](https://jestjs.io/docs/mock-functions). Esto hará que cada vez que sea llamada por nuestro código, *Jest* lo interceptará y podrá definir el valor de retorno que nosotros queramos.

Ahora solo tenemos que declarar los *test suites*, podremos al igual que con otras librerías invocar *hooks* para que se ejecuten antes o después de cada test, en nuestro caso lo haremos para limpiar el *localstorage* y eliminar todos los *timers* que tengamos. Una vez hecho eso, ejecutamos cada test y realizamos una *aserción* con el método `expect`.

```ts title="ui/src/utils/config.test.ts"
jest.mock("../api/api-client-factory");

const mockedCreateApiClient = createApiClient as jest.Mock<ApiClient>;



const ANY_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTJiNGRmYjUxODlmMzVlZGExZjBhOSIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjQ1NDM2MTQ4LCJleHAiOjE2NDU0MzYyMDh9.HmqhMQIHMbTvCM-Ay46xTJAkazz84Ft8198t8AtwsuM";
const ANY_EXPIRES_IN = 80;
const CURRENT_TIMESTAMP = 1645436150000;
const ANY_EMAIL = "lucasfernandezaragon@gmail.com";
const ANY_ID = "6212b4dfb5189f35eda1f0a9";
const ANY_USERNAME = "lucasfernandezaragon@gmail.com";
const ANY_PASSWORD = "any-password";
const USER_TOKEN = userKey;
const ANY_USER_TOKEN: UserToken = {
  id: ANY_ID,
  email: ANY_EMAIL,
  notBeforeTimestampInMillis: CURRENT_TIMESTAMP,
  expirationTimestampInMillis: ANY_EXPIRES_IN * 1000 + CURRENT_TIMESTAMP,
};

const ANY_USER: User = {
  active: true,
  id: ANY_ID,
  email: ANY_EMAIL,
}

const ANY_TOKEN_RESPONSE: TokenResponse = {
  token: ANY_ACCESS_TOKEN,
};

beforeEach(() => {
  jest.useFakeTimers();
  Date.now = jest.fn(() => CURRENT_TIMESTAMP);
});

afterEach(async () => {
  jest.clearAllTimers();
  jest.resetAllMocks();
  localStorage.removeItem(USER_TOKEN);
  await logout();
});

test("login happy case", async () => {
  // Given

  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockResolvedValue(ANY_TOKEN_RESPONSE);
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  await login(ANY_USERNAME, ANY_PASSWORD);

  // Then
  expect(isUserActive()).toBeTruthy();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(getCurrentUser()).toEqual(ANY_USER);
});

test("login - success and then logs out when token expires", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockResolvedValue(ANY_TOKEN_RESPONSE);
  apiClient.logout = jest.fn().mockResolvedValue("");
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  await login(ANY_USERNAME, ANY_PASSWORD);

  // Then
  expect(isUserActive()).toBeTruthy();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(getCurrentUser()).toEqual(ANY_USER);

  // When (set the token to expire)
  jest.advanceTimersByTime(ANY_EXPIRES_IN * 1000);

  setLogoutIfExpiredHandler();

  // Then
  expect(isUserActive()).toBeFalsy();
});

test("login failed - unauthorized", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockRejectedValue(new Unauthorized());
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  try {
    await login(ANY_USERNAME, ANY_PASSWORD);
  } catch (e) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(e).toBeInstanceOf(WrongCredentialsException);
  }

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

test("login failed - generic error", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockRejectedValue(new GenericError(500, "err"));
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  try {
    await login(ANY_USERNAME, ANY_PASSWORD);
  } catch (e) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(e).toBeInstanceOf(Error);
  }

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

test("logout happy case", async () => {
  // Given
  setUserToken();

  // When
  await logout();

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(clearTimeout).toHaveBeenCalledTimes(1);
});


test("init when token exists but it is expired", () => {
  // Given
  setUserToken();
  dateMakesTokenExpired();

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

test("getAccessToken without token set", () => {
  // When
  const actual = getCurrentUser();

  // Then
  expect(actual).toBeUndefined();
});

test("isTokenActive on non existing token", () => {
  // When
  const actual = isUserActive();

  // Then
  expect(actual).toBeFalsy();
});

describe.each([
  ["current", true, CURRENT_TIMESTAMP],
  [
    "edge before expiration",
    true,
    CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000 - 1,
  ],
  ["date before", false, CURRENT_TIMESTAMP - 1],
  ["exact expiration", false, CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000],
])("isTokenActive", (desc, expected, testTimestamp) => {
  test(`is ${expected} on ${desc}`, () => {
    // Given
    Date.now = jest.fn(() => testTimestamp);

    // And
    setUserToken();

    // When
    const actual = isUserActive();

    // Then
    expect(actual).toBe(expected);
  });
});

interface UserToken {
  id: string;
  email: string;
  notBeforeTimestampInMillis: number;
  expirationTimestampInMillis: number;
}

function setUserToken() {
  const userToken: UserToken = {
    id: ANY_ID,
    email: ANY_EMAIL,
    notBeforeTimestampInMillis: CURRENT_TIMESTAMP,
    expirationTimestampInMillis: ANY_EXPIRES_IN * 1000 + CURRENT_TIMESTAMP,
  };
  localStorage.setItem(USER_TOKEN, JSON.stringify(userToken));
}

function dateMakesTokenExpired() {
  Date.now = jest.fn(() => CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000);
}

```