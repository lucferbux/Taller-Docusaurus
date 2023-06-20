---
sidebar_position: 6
---

# Firebase

Esta sección está pensada para el proyecto de [firebase](https://github.com/lucferbux/Taller-Firebase)

Como complemento adicional al despliegue en [Netlify, Render y Atlass](./backendbbddrender), vamos a comentar rápidamente otras alternativas a estos servicios antes mencionados. En este caso vamos a hablar de [Firebase](https://firebase.google.com/) por la simple razón de ser una plataforma muy completa que he usado extensamente a lo largo de muchos años en diversos proyectos.

**Firebase** se podría definir de muchas maneras. La más general podría ser que es una plataforma que ofrece servicios para acelerar el desarrollo de aplicaciones. Tiene un enfoque **BaaS** o **Backend as a Service**, ofreciendo servicios como **autenticación**, **bbdd en tiempo real**, **hosting**, **funciones de ML**, **analíticas**, **mensajería**, **notificationes** y mucho más.

Además, una de las grandes ventajas es que cuenta con **SDKs** para múltiples plataformas, por lo que es posible integrarlo en **proyectos web**, **apps móviles**, **programas de escritorio** abarcando todo el abanico multiplataforma.

En este caso vamos a ver como podemos adaptar el proyecto que estamos construyendo para integrarlo con Firebase. En realidad es bastante fácil, sólo necesitaremos integrar los servicios de [firestore](https://firebase.google.com/docs/firestore), la base de datos en tiempo real y su sdk en nuestro proyecto. Así, la arquitectura del proyecto quedaría de la siguiente forma.

![Arquitectura Firebase](../../static/img/tutorial/deployment/architecture-deployment-firebase.svg)

## Despliegue

### Dashboard

1. Registrate o accede a la web de [Firebase](https://firebase.google.com/), lo puedes hacer perfectamente con tu cuenta de Google y en la consola pulsa **Add project**
![1 Creación de proyecto](../../static/img/tutorial/deployment/firebase/1_create_project.png)
2. En el primer paso del *Wizard* añade el nombre que quieres darle al proyecto, si no se genrará uno por defecto.
![2 Nombre del proyecto](../../static/img/tutorial/deployment/firebase/2_name_project.png)
3. En la siguiente ventana te preguntarán si quieres añadir [Google Analytics](https://analytics.google.com/) a tu proyecto. Por simplicidad deshabilitaremos esta opción de momento.
![3 Deshabilitar google Analytics](../../static/img/tutorial/deployment/firebase/3_disable_analytics.png)
4. Una vez completado el *Wizard*, llegaremos a la página principal de nuestro proyecto. Ahora toca hablitar el proyecto para nuestra webapp, así, pulsaremos el botón para conectar un proyecto web indicado en la imagen de abajo.
![4 Dashboard principal](../../static/img/tutorial/deployment/firebase/4_main_dashboard.png)
5. Ahora nos presentará con otro *Wizard*, al que podremos indicar que queremos habilitar **Firebase Hosting** y ponerle el nombre que queramos a la integración.
![5 Integración Webapp](../../static/img/tutorial/deployment/firebase/5_add_webapp.png)
6. En el paso de **Add Firebase SDK** copiaremos las credenciales para luego integrarlas en el proyecto, también aprovecharemos e instalaremos las *firebase-tools* en nuestra máquina ejecutando en una terminal `npm install -g firebase-tools`. El paso final podemos ignorarlo de momento.
![6 Instalar firebase tools](../../static/img/tutorial/deployment/firebase/6_install_cli.png)
7. Ahora nos dirigiremos a la sección de **Firestore Database** y crearemos una nueva instancia en el cluster que queramos.
![7 Instalación de Firestore](../../static/img/tutorial/deployment/firebase/7_firestore_creation.png)
8. Ahora solo tendremos que añadir información desde el Dashboard, al menos tendremos que crear una colección llamada **aboutme** con los mismos datos que tengáis en el objeto *aboutme* y una colección **project** con el mismo formato que el objeto *project*
![8 Creación de documentos](../../static/img/tutorial/deployment/firebase/8_add_data.png)
9. En la sección de reglas, podremos añadir lo que aparece en la imagen de abajo o esperar a importarlo desde el proyecto en la siguiente sección.
![9 Firestore rules](../../static/img/tutorial/deployment/firebase/9_change_rules.png)
10. Por último nos dirigiremos a la sección de **Hosting** y pulsaremos el botón **Get started** para habilitar el servicio.
![10 Hosting](../../static/img/tutorial/deployment/firebase/10_hosting.png)

Ahora tendremos que realizar algunos cambios en el proyecto para tener el despliegue completo.

### Proyecto

Ahora nos iremos a nuestro [proyecto firebase](https://github.com/lucferbux/Taller-Firebase) para terminar el despliegue.

1. Primero nos dirigiremos al fichero `.env.local` y añadiremos cada atributo de la clave en la variable de entorno correspondiente, cada variable tiene el nombre de la clave con el prefijo **REACT_APP**.
![11 Variables de entorno](../../static/img/tutorial/deployment/firebase/12_edit_env.png)
1. Ahora logearemos nuestra terminal con firebase mediante el comando `firebase login` y una vez accedamos ejecutamos el comando `firebase init`. Nos pedirá seleccionar las funcionalidades que queremos activar. De momento habilitaremos **Firestore** y **Hosting** presionando la barra espaciadora.
![12 Firebase](../../static/img/tutorial/deployment/firebase/13_firebase_init.png)
3. Ahora nos pedirá seleccionar el proyecto que queremos conectar. Elegimos el proyecto que acabamos de crear en el paso anterior.
![13 Selección proyecto](../../static/img/tutorial/deployment/firebase/14_project_selection.png)
4. Lo siguiente será la configuración de **Firestore**. Como el proyecto ya incluye los archivos [firestore.rules](https://firebase.google.com/docs/firestore/security/get-started) y [firestore.indexes.json](https://firebase.google.com/docs/firestore/query-data/indexing) solo tendremos que presionar **Enter** para dejar por defecto el fichero y luego elegir **No** cuando pregunten si queremos sobreescribirlo, tal y como aparece en la foto.
![14 Configuración Firestore](../../static/img/tutorial/deployment/firebase/15_firestore_setup.png)
5. Ahora configuraremos el servicio de **Hosting**. Pondremos como carpeta principal **build**, que es la carpeta resultante de la compilación de nuestro proyecto, diremos que queremos configurar una **Single-page-app** y diremos que **no** queremos usar la integración de **Github** ni sobreescribir nuestro **build/index.html**.
![15 Hosting configuration](../../static/img/tutorial/deployment/firebase/16_hosting_setup.png)
6. Por último, solo tendremos que compilar nuestro proyecto ejecutando `npm run build` y luego ejecutar `firebase deploy` para desplegar nuestro proyecto en **Firebase**
![16 deploy](../../static/img/tutorial/deployment/firebase/17_firebase_deploy.png)

Ahora podremos acceder a la url que indica la ejecución anterior para ver nuestro proyecto desplegado.

## Implementación

### Arquitectura general

Vamos a comparar el [proyecto de firebase](https://github.com/lucferbux/Taller-Firebase) con el proyecto de la [sesión de bbdd](https://github.com/lucferbux/Taller-BBDD) para darnos cuenta de una serie de cambios fundamentales:

* **Eliminación de la bbdd y el backend**: Firebase se va a ocupar de la lógica de nuestros proyectos, así que podemos perfectamente eliminar tanto las dependencias del backend como de la base de datos al no hacernos falta.
* **Eliminación de la api en el frontend**: Firebase tiene un *sdk* para casi cualquier plataforma, y *React* no es menos. En vez de mantener una API conjunta para la comunicacón entre *backend/frontend* y un objeto para manejar las peticiones, haremos uso del *sdk* interno de Firebase.
* **Eliminación de todo lo referente a la autenticación**: Para mantener simple el proyecto, y no inundar de funcionalidades el proyecto, hemos rebajado algunas de las características de nuestra webapp como la autenticación y la capacidad de editar los proyectos. Todo esto se podría conseguir de forma relativamente fácil con servicios como [firebase auth](https://firebase.google.com/docs/auth).

![Firebase Scaffolding](../../static/img/tutorial/firebase/1_scaffolding_firebase.png)

### Variables de entorno

Ahora vamos a tener nuevos valores dentro de nuestros ficheros de entorno, todo esto son las credenciales de firebase que hemos obtenido en la [sección de despliegue en firebase](../deployment/firebase#proyecto) y que servirá para iniciar la librería de [firebase reactfire](https://github.com/FirebaseExtended/reactfire).

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

### Inicialización

Ahora inicializaremos la librería [reactfire](https://github.com/FirebaseExtended/reactfire) añadiendo nuestras credenticales al contexto de *FirebaseAppProvider* primero y luego al contexto de *FirestoreProvider*. El primero sirve para inicializar la conexión de **Firebase** global y el segundo para conectarse a la base de datos de **firestore**.

```tsx title="src/indext.tsx"
...
import { firebaseConfig } from './utils/firebase';
...

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </HelmetProvider>
  </React.StrictMode>
);
```

```tsx title="src/app.tsx"
const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </Layout>
      </Router>
    </FirestoreProvider>
  );
};

export default App;
```

### Custom Hook Firebase

Ahora vamos a crear un custom hook para poder acceder a la base de datos de **Firestore** de forma sencilla. Vamos a eliminar la conexión al backend y en su lugar vamos a referenciar directamente las colecciones de datos de **Firestore**. Estas conexiones son reactivas, por lo que  las pasaremos automáticamente a nuestro componente. Los valores irán cambiando en tiempo real, por lo que no tendremos que preocuparnos de actualizar los datos.

```tsx title="src/hooks/useFetchDataFirestore.ts"
type FetchDataResult = {
  data: DashboardInfo | null;
  isLoading: boolean;
  error: boolean;
};

interface AboutMeResponse {
  status: string;
  data: DocumentData[];
}

interface ProjectResponse {
  status: string;
  data: DocumentData[];
}

export interface DashboardInfo {
  aboutMe: AboutMe[];
  projects: Project[];
}

export default function useFetchDataFirestore(): FetchDataResult {
  const aboutMeCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    'aboutme'
  );
  const projectsCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    'project'
  );

  const { status: statusAboutme, data: dataAboutMe }: AboutMeResponse =
    useFirestoreCollectionData(aboutMeCollectionRef);
  const { status: statusProjects, data: dataProjects }: ProjectResponse =
    useFirestoreCollectionData(projectsCollectionRef);

  const isLoading = statusAboutme === 'loading' || statusProjects === 'loading';
  const error = statusAboutme === 'error' || statusProjects === 'error';
  const data =
    statusAboutme === 'success' && statusProjects === 'success'
      ? { aboutMe: dataAboutMe as AboutMe[], projects: dataProjects as Project[] }
      : null;

  return { data, isLoading, error };
}
```

### Componente Dashboard

No mucho cambia en el Dashboard gracias al uso de **customHooks**. Simplemente referenciaremos el  nuevo hook que hemos creado sin cambiar la lógica del componente.

```tsx title="src/components/routes/Dashboard.tsx"
const Dashboard = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useFetchDataFirestore();

  if (isLoading) {
    return <Loader message="Loading data" />;
  }

  if (error) {
    return (
      <Wrapper>
        <ContentWrapper>
          <ErrorMsg>{t('dashboard.error')}</ErrorMsg>
        </ContentWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ContentWrapper>
        {data && (
          <ResponseWrapper>
            <AboutMeWrapper>
              {data?.aboutMe?.[0] && <AboutMeCard aboutMe={data?.aboutMe[0]} />}
            </AboutMeWrapper>
            <ProjectWrapper>
              {data?.projects
                ?.sort((a, b) => b.timestamp - a.timestamp)
                .map((project, index) => (
                  <ProjectCard project={project} key={index} />
                ))}
            </ProjectWrapper>
          </ResponseWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};
```
