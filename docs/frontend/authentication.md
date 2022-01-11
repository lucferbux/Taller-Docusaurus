---
sidebar_position: 9
---

# Autenticación

Para ir acabando esta sesión vamos a hablar de uno de los aspectos más importantes de nuestar *webapp*: la la lógica de la autenticación. Es muy importante tener una lógica robusta para el acceso de contenido en nuestros proyectos. Es un esfuerzo combinado entre el servidor, que solo proveerá la información requerida para cada rol, y el frontal, que mantendrá el estado de la autenticación en cada momento e implementará determinadas lógicas dependiendo de si estamos autenticados o no.

En el caso de nuestra aplicación, de momento impediremos entrar a ciertas rutas protegidas como ya vimos en la sección de [navegación](./navigation), pero en un futuro podremos editar o eliminar proyectos solo si estamos autenticados.

La implementación actual de autenticación en nuestro frontal se encuentra principalmente en dos ficheros, `auth.ts` y  `AuthContext.tsx`.

## Auth code

```tsx title="src/utils/auth.ts"
export function setAuthToken(accessToken: string) {
  const tokenPayload = getPayload(accessToken);
  const token: Token = {
    accessToken: accessToken,
    notBeforeTimestampInMillis: tokenPayload.iat * 1000,
    expirationTimestampInMillis: tokenPayload.exp * 1000,
  };
  localStorage.setItem(tokenKey, JSON.stringify(token));
}

export function removeAuthToken() {
  localStorage.removeItem(tokenKey);
}
```

```tsx title="src/utils/auth.ts"
function getPayload(token: string): JWTPayload {
  return jwt_decode(token);
}

function getToken(): Token | null {
  let token: Token;
  const tokenJson = localStorage.getItem(tokenKey);
  if (tokenJson) {
    token = JSON.parse(tokenJson);
    return token;
  }
  return null;
}

function getAccessToken(): string {
  const token = getToken();
  if (token) {
    return token.accessToken;
  }
  return "";
}

export function getCurrentUser(): User | undefined {
  const token = getToken();
  if (token) {
    if (!isTokenActive()) {
      logout();
      return undefined;
    }
    const tokenPayload = getPayload(token.accessToken);
    return {
      id: tokenPayload.id,
      active: true,
      email: tokenPayload.email
    };
  } else {
    return undefined;
  }
}

function isTokenActive(): boolean {
  const token = getToken();
  // TODO: check token expiration
  return !!(
    token 
  );
}
```

```tsx title="src/utils/auth.ts"
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

  // TODO: change dynamically in next session
  logoutIfExpiredHandlerId = setTimeout(
    () => setUser(undefined),
    1800000
  );
}
```

## Auth context

```tsx title="src/context/AuthContext.tsx"
const login = useCallback(
    async (username: string, password: string) => {
      try {
        const result = await mockLogin(username, password);
        console.log(result);
        setAuthToken(result.token);
        setLogoutIfExpiredHandler(setUser);
        loadUser();
      } catch (apiError) {
        throw new Error();
      }
    },
    [setUser, loadUser]
);

const logout = useCallback(() => {
    logoutService();
    setUser(undefined);
}, []);
```

```tsx title="src/context/AuthContext.tsx"
const [user, setUser] = useState<User | undefined>(getCurrentUser());

const loadUser = useCallback(() => {
const currentUser = getCurrentUser();
setUser(currentUser);
}, []);

useEffect(() => {
if (isTokenActive()) {
    setLogoutIfExpiredHandler(setUser);
    loadUser();
} else {
    logoutService();
    setUser(undefined);
}
}, [loadUser]);
```

