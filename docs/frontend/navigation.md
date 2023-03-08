---
sidebar_position: 6
---

# Navegación

La navegación entre rutas en **React** se puede solventar de diversas maneras. Como ya hemos comentado, tanto **React** como **Vite** son muy poco estrictos a la hora de implementar funcionalidades, es por ello que hay que apoyarse normalmente en librerías de terceros para desarrollar ciertas características y contemos con diversas maneras de implementar una misma funcionalidad. Algunas toolchains como [Gatsby](https://www.gatsbyjs.org/) o [Next.js](https://nextjs.org/) cuentan con soluciones propias para la navegación (*o routing*). Pero en este caso hemos utilizado **Vite** y es por ello que vamos a usar una de las librerías más populares para nuestra navegación, [React Router](https://v5.reactrouter.com/web/guides/quick-start).

Esta librería, que ya se encuentra por [su sexta iteración](https://reactrouter.com), permite realizar enrutamiento en nuestras webapp (tanto en cliente como en server-side) y en apps nativas (con *React Native*). Dentro de sus funcionalidades, tenemos características como configuración de rutas, navegación con enlaces, paso de información mediante parámetros URL, uso de rutas anidadas...

Vamos a ver como hemos nuestro proyecto para soportar esta librería.
## Rutas Públicas

Dentro de la [documentación de react router](https://v5.reactrouter.com/native/example/Basic) podemos encontrar múltiples ejemplos de como implementar la librería. Nosotros vamos a hacer uso de rutas simples, sin ninguna ruta anidada de momento, con la simple particularidad que implementaremos nuestras propias **rutas privadas** aprovechando el contexto de autenticación. Viendo el fichero `App.tsx` podemos entender su implementación.

```tsx title="src/components/App.tsx"
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
        <Loader />
      </Layout>
    </Router>
  );
};

export default App;
```

Básicamente creamos  una estructura con los componentes [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter) (que hemos renombrado a *Router*), y [Switch](https://v5.reactrouter.com/web/api/Switch), donde tendremos todas las rutas en coponentes [Route](https://v5.reactrouter.com/web/api/Route), con el *path* de cada página que vamos a renderizar, una ruta privada que vamos a mencionar ahora y luego el compoenente [Redirect](https://v5.reactrouter.com/web/api/Redirect) al final del todo por si no encuentra la ruta entre todas las de arriba. Al poner una nueva ruta en el navegador, *React router* irá consultando en modo cascada todas las rutas hasta dar con la indicada o llegar al *redirect*.

Por otro lado tenemos el componente [Link](https://v5.reactrouter.com/web/api/Link) y [NavLink](https://v5.reactrouter.com/web/api/NavLink) que nos permitirá agregar la funcionalidad de navegación interna a enlaces de nuestro proyecto, tal y compo podemos ver en la *barra de navegación*:

```tsx title="src/components/layout/header.tsx"
export const home = {
  title: "nav.home",
  link: "/",
};

export const menuData = [
  {
    title: "nav.dashboard",
    link: "/dashboard",
  },
  {
    title: "nav.admin",
    link: "/admin",
  },
];

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Link to={home.link}>
        {/* TODO: Change title to logo */}
        <LinkButton>{t(home.title)}</LinkButton>
      </Link>
      <MenuWrapper count={menuData.length}>
        {menuData.map((item, index) => (
          <Link to={item.link} key={index}>
            <LinkButton>{t(item.title)}</LinkButton>
          </Link>
        ))}
      </MenuWrapper>
    </Wrapper>
  );
};
```

## Rutas Privadas

Siguiendo el ejemplo que proporcionan en su documentación de [Redirects (Auth)](https://github.com/remix-run/react-router/tree/dev/examples/auth), podemos implmentar nuestros componentes de navegación para controlar las rutas privadas. Vamos a ver como lo hemos implementado en el archivo `PrivateRoute.tsx`

```tsx title="src/components/routes/PrivateRoute.tsx"
function PrivateRoute({ children }: any) {
  const { user, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return user ? children : <Navigate to="/login" replace={true} />;
}

export default PrivateRoute;
```

En realidad lo que está pasando aquí es bastante sencillo, importamos user del hook **useAuth** para comprobar si tenemos a un usuario autenticado. Si es así podemos renderizar el compoenente que hayamos pasado en el prop, y si no, usamos [Navigate](https://reactrouter.com/en/main/components/navigate) para volver a la pantalla de login.
