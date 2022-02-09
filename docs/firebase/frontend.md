---
sidebar_position: 3
---

# Cambios en el Frontend

## Arquitectura general

* Mantener el proyecto simple
* Eliminación de la bbdd y el backend
* Eliminación de la api en el frontend
* Eliminación de todo lo referente a la autenticación

## Variables de entorno

```env title=".env"
REACT_APP_LOCALE=es-ES

REACT_APP_FIREBASE_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

```ts title="src/utils/firebase.ts"
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
```

## Inicialización

```tsx title="src/indext.tsx"
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AppProvider>
              <App />
          </AppProvider>
      </FirebaseAppProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

```tsx title="src/app.tsx"
const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {

    console.log(firebaseConfig);
  }, []);
  
  // TODO: Change redirect to Dashboard
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
          <Loader/>
        </Layout>
      </Router>
    </FirestoreProvider>
  );
};

export default App;
```

## Dashboard

```tsx title="src/components/routes/Dashboard.tsx"
const Dashboard = () => {
  const { t } = useTranslation();

  const aboutMeCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    "aboutme"
  );
  const projectsCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    "project"
  );

  const { status: statusAboutme, data: dataAboutMe }: AboutMeResponse =
    useFirestoreCollectionData(aboutMeCollectionRef);
  const { status: statusProjects, data: dataProjects }: ProjectResponse =
    useFirestoreCollectionData(projectsCollectionRef);

  return (
    <Wrapper>
      <ContentWrapper>
        <ResponseWrapper>
          <AboutMeWrapper>
            {statusAboutme === "error" && <ErrorMsg>{t("dashboard.error")}</ErrorMsg>}
            {statusAboutme === "success" && (
              dataAboutMe?.map((aboutMe, index) => (
                <AboutMeCard aboutMe={aboutMe as AboutMe} key={index} />
              ))
            )}
          </AboutMeWrapper>
          <ProjectWrapper>
            {statusProjects === "error" && <ErrorMsg>{t("dashboard.error")}</ErrorMsg>}
            {statusAboutme === "success" &&
              dataProjects?.map((project, index) => (
                <ProjectCard project={project as Project} key={index} />
              ))}
            {}
          </ProjectWrapper>
        </ResponseWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
```
