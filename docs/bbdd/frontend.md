---
sidebar_position: 8
---

# Frontend Updates

Ya que tenemos montado nuestro proyecto con una base de datos que nos permite por fin modificar dinámicamente la información de nuestra webapp vamosa a aprovechar para hacer los últimos cambios a nuestro FrontEnd. Hasta ahora teníamos habilitado el backend para poder realizar cualquier operación con nuestro modelo de datos, pero a través de nuestro backend solo podíamos crear nuevos proyectos, pero ¿Qué pasa si queremos modificar o eliminar los datos?. Vamos a arreglar ese problema.

Antes de entrar a analizar el código, quiero dedicar unos minutos a responder una duda que pudierais tener a estas alturas, ¿En qué momento tengo que utilizar librerías de control de estados como [redux](https://redux.js.org) frente a [context](https://reactjs.org/docs/context.html)?. Pues bien, la respuesta es complicada, os dejo aquí una entrevista a su co-creador explicando [cuando hay que utilizar redux](https://youtu.be/XEt09iK8IXs?t=198), y como bien dice, actualmente hay una línea muy difusa, y para muchas funcionalidades *context* cubre todo los usos. Personalmente creo que si el proyecto ya usa *redux*, o el código está estructurado de una forma específica, por ejemplo separando completamente la lógica de estado de los componentes, es recomendable usar *redux*, si el objetivo es pasar información entre componentes y mantener ciertos estados, la combinación de **useContext** y **useState** debería ser suficiente.

## Contexto para proyectos

Ahora vamos a crear un contexto tal y como comentamos en la sección de [context](../frontend/context), este contexto nos permitirá pasar un proyecto desde la página del *dashboard* a la sección de creación de proyectos. Tenemos la función `setProjectOrUndefined`, que mediante un [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) para evitar re-renders en los componentes hijos, permite asignar o desasignar un proyecto al contexto. Veremos al final de la sección como lo usamos para pasar proyectos entre secciones.

```tsx title="ui/src/context/ProjectContext.tsx"
import { createContext, ReactNode, useCallback, useState } from "react";
import { Project } from "../model/project";

const ProjectContext = createContext<any>({
  project: undefined,
});

interface Props {
  children: ReactNode;
}

export function ProjectProvider({ children }: Props) {
  const [project, setProject] = useState<Project | undefined>(undefined);

  const setProjectOrUndefined = useCallback(
    (project: Project | undefined) => {
      setProject(project);
    },
    [setProject]
  );

  return (
    <ProjectContext.Provider value={{ project, setProjectOrUndefined }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
```

Ahora tendremos que añadir el `provider` de este contexto a nuestro proyecto:

```tsx title="ui/src/main.tsx"
import { ProjectProvider } from './context/ProjectContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <AppProvider>
          // highlight-start
          <ProjectProvider>
            <App />
          </ProjectProvider>
          // highlight-end
        </AppProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
```

## Nuevos Custom Hooks

Como no, el *contexto* para el proyecto tiene que venir acompañado de un *hook* para poder usarse en componentes funcionales. Por otro lado, vamos a crear un nuevo contexto, esta vez para el control del estado de los menús flotantes de la aplicación. Una vez más vamos a usar `useCallback` para mantener una versión `optimizada` de nuestra función, manteniendo el estado y evitando renderizados extra. En el caso concreto de nuestro proyecto no sería necesario crear un *contexto* extra con esta lógica, pero con el fin de mostrar un ejemplo de abstracción de lógica vamos a utilizar este código.

```tsx title="ui/src/hooks/useProject"
import { useContext } from 'react';
import ProjectContext from '../context/ProjectContext';

export default function useProject() {
    const project = useContext(ProjectContext);
    return project;
}
```

```tsx title="ui/src/hooks/useToggle"
import {useState, useCallback} from 'react';

const useToggle = (initialState: Boolean) => {
    // Use this react hook to avoid re renders when togglin a react state
    const [isToggled, setIsToggled] = useState<Boolean>(initialState);
  
    const toggle = useCallback(
      () => setIsToggled(state => !state),
      [setIsToggled],
    );
  
    return [isToggled, toggle] as const;
};

export default useToggle;
```

:::tip Uso de abstracciones

En ocasiones crear abstracciones como en el contexto anterior, pueden aportar legibilidad al código, pero también pueden crear problemas de falta de contexto o funcionalidad ambigua al aplicarla en nuestro código, sed conscientes de esos problemas al implementar vuestros propios wrappers de funcionalidad.

:::

## Botón de Actualizar

No hay mucho más que añadir con respecto al front, salvo que hemos creado dos nuevos componentes, el botón para activar el menú y el menú flotante. De este segundo componente añadir que usa la función `toggle` del contexto de arriba y que al pulsar el botón de *actualizar* llamamos al método `updateButton()` junto a la referencia del objeto para actualizarlo.

```tsx title="ProjectCard.tsx Button Component"
<CardInfo>
    <CardVersion>
    <CardVersionText>{project.version}</CardVersionText>
    </CardVersion>
    {user && (
    <KebabButton
        onClick={(e: React.MouseEvent<HTMLElement>) => toggleMenu(e)}
    >
        <KebabDot />
        <KebabDot />
        <KebabDot />
    </KebabButton>
    )}
</CardInfo>
```

```tsx title="ProjectCard.tsx Menu"
{user && isVisible && (
    <>
    <MenuDropDownOverlay onClick={toggleMenu} />
    <MenuDropDown>
        <MenuDropDownItem
        isWarning={false}
        onClick={(e: React.MouseEvent<HTMLElement>) =>
            props.updateButton(e, project)
        }
        >
        Update
        </MenuDropDownItem>
        <MenuDropDownItem
        isWarning={true}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
            props.closeButton(e, project._id ?? "");
            toggle();
        }}
        >
        Delete
        </MenuDropDownItem>
    </MenuDropDown>
    </>
)}
```

## Cambios en el Dashboard

En el propio dashboard controlamos la lógica de *actualización/eliminación* del proyecto que acciona el componente de la *ProjectCard*. La función `deleteProject()` simplemente realiza la llamada para eliminar el proyecto según su *id* y vuelve a pedir la lista entera de proyectos, mientras que `updateProject()` añade el proyecto al contexto `projectContext` y navega hasta la pantalla de `Ademin.tsx`. También hay que añadir que los métodos `element.preventDefault()` y `element.stopPropagation()` hace que solo se ejecute el click de los botones del menú y no el *clickListener* de la propia *ProjectCard*.

```tsx title="Dashboard.tsx Update and Delete project"
  async function deleteProject(element: React.MouseEvent<HTMLElement>, id: string) {
    element.preventDefault()
    element.stopPropagation()
    const api = createApiClient();
    try {
      await api.deleteProject(id);
      const projects: Project[] = await api.getProjects();
      const aboutme: AboutMe = await api.getAboutMe();
      setResponse({ aboutme, projects });
    } catch (e) {
      console.log("Error deleting project", e);
    }
  }   

  function updateProject(element: React.MouseEvent<HTMLElement>, project: Project) {
    element.preventDefault()
    element.stopPropagation()
    setProjectOrUndefined(project);
    history.push("/admin");
  }   
```

```tsx title="Dashboard.tsx Project Card component"
<ProjectWrapper>
    {response?.projects?.map((project, index) => (
    <ProjectCard project={project} key={index} closeButton={(e, id) => deleteProject(e, id)} updateButton={(e, id) => updateProject(e, id)} />
    ))}
</ProjectWrapper>
```

## Cambios en Admin

Ya por último vamos a ver la lógica de la routa *Admin*. Es muy sencillo el cambio, básicamente vamos a usar `useEffect()` para controlar el ciclo de vida del componente, comprobar si existe algún proyecto en el *contexto* de proyectos y si es así rellenar el formulario. Además, mediante el `return()` del `useEffect()` controlamos el momento que el componente se desmonta (cuando vamos a navegar a otro componente) y elimina el proyecto de la pila del *contexto*.

```tsx title="Admin.tsx"
  const emptyProjectInput: Partial<Project> = {
    title: '',
    description: '',
    link: '',
    tag: '',
    version: ''
  };

  const navigate = useNavigate();
  const apiClient = useMemo(() => createApiClient(), []);

  const { createOrUpdate, status, error } = useCreateOrUpdate(apiClient.createOrUpdateProject);
  const { project, removeProject } = useProject();

  const [projectInput, setProjectInput] = useState<Partial<Project>>(project || emptyProjectInput);

  ...

  useEffect(() => {
    if (status === 'success') {
      removeProject();
      navigate('/dashboard');
    }
    return () => {
      removeProject();
    };
  }, [status, removeProject, navigate]);
```
