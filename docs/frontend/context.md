---
sidebar_position: 4
---

# Contexto

Como habréis visto en el **Módulo de Front-end**, en una aplicación en React, la información se pasa de **arriba a abajo** (de padre a hijo) mediante *props*. Este flujo está bien para determinados casos de uso, pero para ciertas funcionalidades se puede quedar corto. Es por eso que los **contextos** proporcionan una forma de compartir información entre componentes sin tener que pasarla explícitamente  a través de un prop de forma descendiente.

## Redux vs Context

Antes de entrar a analizar el código, quiero dedicar unos minutos a responder una duda que pudierais tener a estas alturas, **¿En qué momento tengo que utilizar librerías de control de estados como [redux](https://redux.js.org) frente a [context](https://reactjs.org/docs/context.html)?**. Pues bien, la respuesta es complicada, os dejo aquí una entrevista a su co-creador explicando [cuando hay que utilizar redux](https://youtu.be/XEt09iK8IXs?t=198), y como bien dice, actualmente hay una línea muy difusa, y para muchas funcionalidades *context* cubre todo los usos. Personalmente creo que si el proyecto ya usa *redux*, o el código está estructurado de una forma específica, por ejemplo separando completamente la lógica de estado de los componentes, es recomendable usar *redux*, si el objetivo es pasar información entre componentes y mantener ciertos estados, la combinación de **useContext** y **useState** debería ser suficiente.

:::tip Uso de redux

Redux sigue siendo una librería fundamental dentro del control de estado en React, pero salvo que el proyecto ya la utilice o haya un caso de uso muy concreto, es posible recrear su funcionalidad con **context**

:::

Si queréis aprender más sobre redux, hay [una entrada en el blog](../../blog/first-steps-redux) profundizando en el tema.

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
    <AuthContext.Provider value={{ user, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
```

Compo podemos ver, este contexto usa algunos de los métodos declarados en `src/utils/auth.ts` para controlar la autenticación en nuestra aplicación. Al iniciar el componente, comprobará si tenemos un [JWT](../backend/jwt.md) válido almacenado en el navegador, si es así, cargará en el *estado interno* el usuario, y si no eliminará el JWT invalido y pondrá un usuario indefinido en el *estado interno*.

Además, tenemos los métodos **login** y **logout** para intentar autenticarnos con nuestro *usuario* y *contraseña* o cerrar sesión.

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
