---
sidebar_position: 7
---

# Testing FrontEnd

Ahora vamos a hablar de *Jest* y *React Testing library*. Jest es una librería open source escrita en JavaScript, muy optimizada para apliaciones *React* que permite implementar *tests unitarios* y junto a *react-testing-library*, escribir test de integración en nuestro proyecto.

Ambas librerías vienen instaladas por defecto en nuestro proyecto, ya que lo creamos con la *toolchain* `vite`. Ahora bien, si fuese necesario incluirlo, solo habría que ejecutar los siguientes comandos:

* `npm install --save-dev vitest`
* `npm install --save-dev jsdom @testing-library/react @testing-library/jest-dom`

Ahora hay que añadir un comando para habilitar el testing:

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "coverage": "vitest run --coverage",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
```

Después de esto tendremos que adaptar el fichero `vite.config.ts` para habilitar el testing:

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import react from '@vitejs/plugin-react'

const vitestConfig: VitestUserConfigInterface = {
  test: {
    deps: {
      inline: [/@just-web/, /just-web-react/]
    },
    setupFiles: ['src/setupTest.ts'],
    environment: 'jsdom',
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  test: vitestConfig.test,
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/auth -> http://localhost:4000/auth
      '/auth': 'http://localhost:4000',
      // string shorthand: http://localhost:5173/v1 -> http://localhost:4000/v1
      '/v1': 'http://localhost:4000',
    },
  },
});
```

Y añadir el fichero `setupTest.ts` dentro de la carpeta `src` para configurar `react testing library` con `vitest`:

```ts title="ui/src/setupTest.ts
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, afterEach } from "vitest";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

## Tests Integración

Para empezar a crear tests en react, solo tenemos que empezar a crear ficheros con una convención específica para que *vite* identifique que son tests:

* Archivos con extensión `.test.ts`.
* Archivos con extensión `.spec.js`.

Desde la documentación oficial de *vite* recomiendan utilizar la primera opción, mantener carpetas `__tests__` en los directorios donde estemos testeando nuestro código, así las importaciones se mantienen cortas. Vamos a crear un par de ejemplos para probar algunos componentes.

```ts title="ui/src/components/layouts/__tests__/HeaderTest.ts.tsx"
import React from "react";
import Header from "../header";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi, test, expect } from "vitest";

vi.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

test("check exact three links", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getAllByRole("link").length).toEqual(3);

  expect(screen.getByText("nav.home")).toBeInTheDocument();
  expect(screen.getByText("nav.dashboard")).toBeInTheDocument();
  expect(screen.getByText("nav.admin")).toBeInTheDocument();
});
```

Este ejemplo sencillo comprueba los tags que usamos con i18next para traducir nuestros textos. Comprueba que tengamos 3 links en la navbar y que cada uno tiene el tag que le corresponde. Al ejecutar `npm run test` tenemos lo siguiente.

![testing cli](../../static/img/tutorial/testing/4_testing_cli.png)

Ya tenemos nuestro primer test, vamos a añadir unos cuantos componentes más para aumentar el coverage de nuestro proyecto.

```ts title="ui/src/components/card/__tests__/ProjectCardTests.ts.tsx"
const projectMock: Project = {
  _id: "8a9sdfasdf989fd",
  title: "React",
  description:
    "React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad",
  version: "17.0.1",
  link: "https://reactjs.org/docs/hello-world.html",
  tag: "JavaScript, Typescript, React",
  timestamp: 765817712000,
};

const userLogggedMock: User = {
  active: true,
  id: "a8sfd9sf",
  email: "johndoe@gmail.com",
};

const mockFeatured = "FEATURED";

test("Card Title", () => {
  const { getByText } = render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(getByText(projectMock.title)).toBeInTheDocument();
});

test("Card Description", () => {
  const { getByText } = render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(getByText(projectMock.description)).toBeInTheDocument();
});

test("Card Version", () => {
  const { getByText } = render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(getByText(projectMock.version)).toBeInTheDocument();
});

test("Featured filled", () => {
  const { getByText } = render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      captionText={mockFeatured}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(getByText(mockFeatured)).toBeInTheDocument();
});

test("Featured empty", () => {
  render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(screen.getByTestId("caption").textContent).toBe("");
});

test("User logged", () => {
  render(
    <ProjectCard
      project={projectMock}
      user={userLogggedMock}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(screen.getByTestId("menuButton")).toBeInTheDocument();
});

test("Caption empty", () => {
  render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(screen.getByTestId("caption").textContent).toBe("");
});

test("External link", () => {
  render(
    <ProjectCard
      project={projectMock}
      user={undefined}
      closeButton={() => {}}
      updateButton={() => {}}
    />
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", projectMock.link);
});
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

```ts title="ui/src/utils/config.test.ts
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, expect, vi, describe, it } from "vitest";
import { getDefaultBaseUrl } from "./config";

describe("config testing", () => {
  let baseUrl = "";

  beforeEach(() => {
    vi.resetModules();
    delete import.meta.env.VITE_BASE_URI;
    delete import.meta.env.VITE_API_URI;
  });

  it("config with api base url from environment variable", () => {
    // Given
    const anyBaseUrl = "any-base-url";
    import.meta.env.VITE_BASE_URI = anyBaseUrl;

    // And
    baseUrl = getDefaultBaseUrl(
      import.meta.env.VITE_BASE_URI,
      import.meta.env.VITE_API_URI
    );

    // Then
    expect(baseUrl).toBe(anyBaseUrl);
  });

  it("config with api base url with another path", () => {
    // Given
    const anyBaseUrl = "any-base-url";
    import.meta.env.VITE_BASE_URI = anyBaseUrl;

    // And
    const extraPath = "/extraPath";
    import.meta.env.VITE_API_URI = extraPath;

    baseUrl = getDefaultBaseUrl(
      import.meta.env.VITE_BASE_URI,
      import.meta.env.VITE_API_URI
    );

    // Then
    expect(baseUrl).toBe(anyBaseUrl + extraPath);
  });

  it("config with no api base url", () => {
    baseUrl = getDefaultBaseUrl(
      import.meta.env.VITE_BASE_URI,
      import.meta.env.VITE_API_URI
    );

    // Then
    expect(baseUrl).toBe("");
  });
});

export {};
```

```ts title="ui/src/utils/auth.test.ts"
vi.mock("../api/api-client-factory");

const mockedCreateApiClient = createApiClient as any;

const ANY_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTJiNGRmYjUxODlmMzVlZGExZjBhOSIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjQ1NDM2MTQ4LCJleHAiOjE2NDU0MzYyMDh9.HmqhMQIHMbTvCM-Ay46xTJAkazz84Ft8198t8AtwsuM";
const ANY_EXPIRES_IN = 80;
const CURRENT_TIMESTAMP = 1645436150000;
const ANY_EMAIL = "lucasfernandezaragon@gmail.com";
const ANY_ID = "6212b4dfb5189f35eda1f0a9";
const ANY_USERNAME = "lucasfernandezaragon@gmail.com";
const ANY_PASSWORD = "any-password";
const USER_TOKEN = userKey;
// const ANY_USER_TOKEN: UserToken = {
//   id: ANY_ID,
//   email: ANY_EMAIL,
//   notBeforeTimestampInMillis: CURRENT_TIMESTAMP,
//   expirationTimestampInMillis: ANY_EXPIRES_IN * 1000 + CURRENT_TIMESTAMP,
// };

const ANY_USER: User = {
  active: true,
  id: ANY_ID,
  email: ANY_EMAIL,
};

const ANY_TOKEN_RESPONSE: TokenResponse = {
  token: ANY_ACCESS_TOKEN,
};

let setTimeoutSpy: any;

beforeEach(() => {
  vi.useFakeTimers();
  Date.now = vi.fn(() => CURRENT_TIMESTAMP);
  setTimeoutSpy = vi.spyOn(global, "setTimeout");
});

afterEach(async () => {
  vi.clearAllTimers();
  vi.clearAllMocks();
  localStorage.removeItem(USER_TOKEN);
});

test("login happy case", async () => {
  // Given

  const apiClient = <ApiClient>{};
  apiClient.token = vi.fn().mockResolvedValue(ANY_TOKEN_RESPONSE);
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  await login(ANY_USERNAME, ANY_PASSWORD);

  // Then
  expect(isUserActive()).toBeTruthy();
  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(getCurrentUser()).toEqual(ANY_USER);
});

test("login - success and then logs out when token expires", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = vi.fn().mockResolvedValue(ANY_TOKEN_RESPONSE);
  apiClient.logout = vi.fn().mockResolvedValue("");
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  await login(ANY_USERNAME, ANY_PASSWORD);

  // Then
  expect(isUserActive()).toBeTruthy();
  expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
  expect(getCurrentUser()).toEqual(ANY_USER);

  // When (set the token to expire)
  vi.advanceTimersByTime(ANY_EXPIRES_IN * 1000);

  setLogoutIfExpiredHandler();

  // Then
  expect(isUserActive()).toBeFalsy();
});

test("login failed - unauthorized", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = vi.fn().mockRejectedValue(new Unauthorized());
  apiClient.logout = vi.fn().mockResolvedValue("");
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  try {
    await login(ANY_USERNAME, ANY_PASSWORD);
  } catch (e) {
    expect(e).toBeInstanceOf(WrongCredentialsException);
  }

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeoutSpy).toHaveBeenCalledTimes(0);
});

test("login failed - generic error", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = vi.fn().mockRejectedValue(new GenericError(500, "err"));
  apiClient.logout = vi.fn().mockResolvedValue("");
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  try {
    await login(ANY_USERNAME, ANY_PASSWORD);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeoutSpy).toHaveBeenCalledTimes(0);
});

test("logout happy case", async () => {
  // Given
  const setClearTimeout = vi.spyOn(global, "clearTimeout");
  const apiClient = <ApiClient>{};
  apiClient.logout = vi.fn().mockResolvedValue("");
  mockedCreateApiClient.mockReturnValue(apiClient);
  setUserToken();

  // When
  await logout();

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setClearTimeout).toHaveBeenCalledTimes(1);
});

test("init when token exists but it is expired", () => {
  // Given
  setUserToken();
  dateMakesTokenExpired();

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
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
    Date.now = vi.fn(() => testTimestamp);

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
  Date.now = vi.fn(() => CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000);
}
```
