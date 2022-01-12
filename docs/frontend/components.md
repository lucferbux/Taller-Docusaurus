---
sidebar_position: 10
---

# Componentes

Vamos a finalizar la sesión hablando por encima de los componentes de nuestro proyecto. Como ya sabemos los **componentes** son un elmento esencial de **React** y es por ello que la mayoría de elementos de nuestra web app van a ser componentes reutilizables. Como ya indicamos **Create React App** tiene cierta flexibilidad a la hora de organizar nuestro repositorio, es por ello que hay diversas maneras de categorizar nuestros componentes, ahora vamos a hablar de la que hemos seguido en este proyecto.

Antes de nada, vamos a hablar de `App.tsx` nuestro primer [componente funcional](https://reactjs.org/docs/components-and-props.html#function-and-class-components) de la carpeta y el punto de inicio de nuestra aplicación. Este componente se llama en la base de `index.ts` y básicamente se encarga de la renderización de las páginas de nuestra webapp, controladas por el [componente de navegación](./navigation). Así, podemos ver que primero renderizamos el componente `<Router>` encargado de la navegación, luego `<Layout>`, encargado de la estructura de la página y del que hablaremos ahora, y luego en orden los componentes `LandingPage`, `Login`, `Dashboard` y `Admin`, las diferentes "páginas" de nuestro proyecto.

```tsx title="src/components/App.tsx"
const App = () => {
  
  // TODO: Change redirect to Dashboard
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <Redirect from="*" to="/" />
        </Switch>
        <Loader/>
      </Layout>
    </Router>
  );
}
```

## Layout

En esta carpeta encontramos los componentes encargados de darle la estrucutra al proyecto, básicamente estructurando el proyecto con una **Barra de navegación** y unos atributos en la **descripción meta** de la cabecera.

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

Tal y como podemos ver tenemos el componente `<Helmet>` que aporta la descripción de la cabecer, `<GlobalStyle>` que carga los estilos globales en la webapp, `<Header>` contiene el componente de la barra de navegación y tenemos comentado un componente `<Footer>` por si queremos agregar un pie de página en nuestra web.

## Routes

Dentro de *Routes* tenemos cada uno de los componentes que renderizan las páginas de nuestra *Single Page App*. Vamos a repasar cada una de ellas rápidamente:

* `Admin.tsx`: Es la ruta de administración, donde podremos editar o crear nuevos proyectos.
* `Dashboard.tsx`: Página donde mostraremos las cartas de información de *AboutMe* y la cuadricula o *grid* de todos los proyectos que tengamos almacenados.
* `LandingPage.tsx`: Página de inicio, con la animación de [Lottie](./dependencies.md#lottie).
* `Login.tsx`: Formulario que controla el acceso a la página.
* `PrivateRoute.tsx`: Ya hablamos de este componente en la sección de [navegacion](./navigation), sirve para tener componentes privados a los que solo se puede acceder autenticado.

## Background

Carpeta donde se encuentran los componentes que van a formar parte del *background* o fondo de nuestra aplicación. En nuestro caso solo lo usaremos dentro de la `Landing Page` para dar ese efecto de fondo continuo con la barra de navegación, pero podemos crear más para las distintas secciones.

## Elements

Carpeta donde almacenar los distintos componentes de *UX/UI* del sistema. De momento tendremos nuestro componente de carga, un *spinner* que se mostrará al realizar peticiones asíncronas y esperar su resultado.

## Cards

`Cards` podría estar perfectamente dentro de la carpeta `Elements`, pero hemos decidido mantenerlo fuera ya que es uno de los recursos más utilizados a lo largo de todo el proyecto.
