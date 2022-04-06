---
sidebar_position: 4
---

# Contexto

Como habréis visto en el **Módulo de Front-end**, en una aplicación en React, la información se pasa de arriba a abajo (de padre a hijo) mediante *props*. Este flujo está bien para determinados casos de uso, pero para ciertas funcionalidades se puede quedar corto. Es por eso que *Context* proporciona una forma de compartir información entre componentes sin tener que pasarla explícitamente  a través de un prop de forma descendiente.

Antes de entrar a analizar el código, quiero dedicar unos minutos a responder una duda que pudierais tener a estas alturas, ¿En qué momento tengo que utilizar librerías de control de estados como [redux](https://redux.js.org) frente a [context](https://reactjs.org/docs/context.html)?. Pues bien, la respuesta es complicada, os dejo aquí una entrevista a su co-creador explicando [cuando hay que utilizar redux](https://youtu.be/XEt09iK8IXs?t=198), y como bien dice, actualmente hay una línea muy difusa, y para muchas funcionalidades *context* cubre todo los usos. Personalmente creo que si el proyecto ya usa *redux*, o el código está estructurado de una forma específica, por ejemplo separando completamente la lógica de estado de los componentes, es recomendable usar *redux*, si el objetivo es pasar información entre componentes y mantener ciertos estados, la combinación de **useContext** y **useState** debería ser suficiente.

:::tip Uso de redux

Redux sigue siendo una librería fundamental dentro del control de estado en React, pero salvo que el proyecto ya la utilice o haya un caso de uso muy concreto, es posible recrear su funcionalidad con **context**

:::

## AuthContext

```tsx title="src/context/AuthContext.tsx"
export function AuthProvider({ children }: Props) {
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

  return (
    // highlight-start
    <AuthContext.Provider value={{ user, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
    // highlight-end
  );
}
```

Compo podemos ver, este contexto usa algunos de los métodos declarados en `src/utils/auth.ts` para controlar la autenticación en nuestra aplicación. Al iniciar el componente, comprobará si tenemos un [JWT](../backend/jwt.md) válido almacenado en el navegador, si es así, cargará en el *estado interno* el usuario, y si no eliminará el JWT invalido y pondrá un usuario indefinido en el *estado interno*.

Además, tenemos los métodos **login** y **logout** para intentar autenticarnos con nuestro *usuario* y *contraseña* o cerrar sesión.

## AppContext

```tsx title="src/context/AppContext/AppContext.tsx"
export function AppProvider({ children }: Props) {
  const [notifications, setNotification] = useReducer(notificationsReducer, []);

  const addNotification = useCallback((message: string) => {
    setNotification({ type: PUSH_NOTIFICATION, payload: message });
  }, []);

  const removeLastNotification = useCallback(() => {
    setNotification({ type: POP_NOTIFICATION });
  }, []);

  return (
    <AppContext.Provider
      value={{
        notifications,
        addNotification,
        removeLastNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
```

Este contexto sirve para mandar notificaciones enter componentes, en este caso una notificación con un mensaje (*payload*). Lo utilizaremos principalmente para mostrar un spinner cuando carguemos datos en el dashboard principal, como podéis ver a continuación.

```tsx title="src/components/elements/Loader.tsx"
export default function Loader() {
  const { notifications } = useApp();
  const loaderMessage = () => notifications[notifications.length - 1];

  if (notifications.length > 0) {
    return (
      <LoaderWrapper>
        <LoaderCard>
          <LoaderImg src={icnLoader} alt={loaderMessage()} />
          <LoaderMsg>{loaderMessage()}</LoaderMsg>
        </LoaderCard>
      </LoaderWrapper>
    );
  } else {
    return <></>;
  }
}
```

El estado de las notificaciones se controla mediante *reducers*. Los [reducers](https://es.reactjs.org/docs/hooks-reference.html#usereducer) son funciones que toman el estado actual y una acción como argumentos, y devuelven un nuevo estado como resultados. Algo parecido a `(state, action) => newState`.
El concepto de **reducer** se volvió popular en con su introducción en la librería [Redux](https://redux.js.org). No hace falta que sepas *Redux* para implementar este concepto, ya que básicamente los **reducers** sirven para controlar el estado de la aplicación sin *efectos secundarios*, es decir, que dado un *parámetro* en una función reductora, el resultado siempre será el mismo si en argumento es igual.

```tsx title="src/context/AppContext/notificationsReducer.tsx"
const createReducer = (reducer: any) => (
  state: any,
  action: actionType
) => reducer[action.type](state, action);


const pushNotification = (state: any, action: actionType) => {
  const newState = state.slice(); // Clone the array with new memory space
  newState.push(action.payload);
  return newState;
};

const popNotification = (state: any) => {
  const newState = state.slice(); // Clone the array with new memory space
  newState.pop();
  return newState;
};

const notificationsReducer = {
  [PUSH_NOTIFICATION]: pushNotification,
  [POP_NOTIFICATION]: popNotification,
};
```

En el caso de nuestro código, tenemos la función `createReducer` que creará un nuevo *reducer* dado un objeto con unas acciones. Este objeto en nuestro caso será `notificationsReducer` que tendrá dos acciones, **PUSH_NOTIFICATIONS**, que llamará a la función `pushNotifications`, para añadir una nueva notificación al sistema con un *payload* y **POP_NOTIFICATION**, para eliminar la notificación.

Como hemos dicho, nosotros vamos a usar este contexto para mostrar el spinner al cargar datos, mostrando el payload del mensaje como mensaje en la carga, esto lo podemos comprobar en el propio componente `Loader.tsx`, que estará cargado en todo momento y solo se mostrará al haber una nueva notificación.

```tsx title="src/components/elements/Loader.tsx"
export default function Loader() {
  const { notifications } = useApp();
  const loaderMessage = () => notifications[notifications.length - 1];

  if (notifications.length > 0) {
    return (
      <LoaderWrapper>
        <LoaderCard>
          <LoaderImg src={icnLoader} alt={loaderMessage()} />
          <LoaderMsg>{loaderMessage()}</LoaderMsg>
        </LoaderCard>
      </LoaderWrapper>
    );
  } else {
    return <></>;
  }
}
```

## HelmContext

Contexto de la librería [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) que permite añadir información en la cabecera de la página. El contexto lo cargamos en `indext.tsx` pero la configuración la realizamos en `layout.tsx`.

```tsx title="src/components/layout/layout.tsx"
const Layout = (props: LayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content={themes.light.primary} media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content={themes.dark.primary} media="(prefers-color-scheme: dark)"/>
      </Helmet>
      <GlobalStyle />
      <Header />
      <main>{props.children}</main>
      {/* <Footer/> */}
    </>
  );
};
```

En este caso hemos añadido un **título** y una **descripción** que cambiará dinámicamente dependiendo de la localización de la página. También añadiremos el flag `apple-mobile-web-app-status-bar-style` para colorear la barra de navegación de nuestro navegador del colo que queramos, en este caso del color primario.
