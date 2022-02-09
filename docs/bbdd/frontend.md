---
sidebar_position: 7
---

# Frontend Updates

## Contexto para proyectos

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

## Nuevos Hooks

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

## Botón de Actualizar

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