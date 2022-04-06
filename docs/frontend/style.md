---
sidebar_position: 7
---

# Estilo

Al igual que otras funcionalidades dentro de **Create React App**, hay múltiples maneras de implementar el estilo de nuestra webapp. En este caso, hemos utilizado una combinación de librerías y organización del código para hacer nuestros estilos lo más reusables y personalizables posibles.

## Estilos de componente

Para el estilo de los elementos de nuestros componentes vamos a usar [Styled Components](https://styled-components.com). Como ya hemos comentado, es una librería que permite usar template literals y css para crear estilos como componentes de JavaScript. La librería permite usar todas las funcionalidades de CSS moderno junto a características de React como props. Además, al crear componentes, es fácil aplicar convenciones de nombres para estructurar nuestro Virtual DOM.

Así es posible crear un estilo reutilizable a lo largo de componentes, altamente modificable gracias al uso de **props**, extensibles, al poder tener estilos generales que extendamos para añadir funcionalidad y dinámicos, al poder interpolar valores de *JavaScript* en los estilos.

```tsx title="src/components/layout/header.tsx"
interface MenuWrapperProps {
  count: number;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  gap: 30px;
`;

const LinkButton = styled.p`
  color: ${themes.dark.text1};
`;
```

Como se puede ver en el ejemplo, tenemos componentes que interpolan valores de JavaScript, como es el color del estilo de enlace, y luego tenemos el uso de props en en *Wrapper del Menu*, que creará dinámicamente n columnas dependiendo de los elementos.

## Colores

Al hacer uso de los **Styled Components**, podemos organizar nuestro código para tener ciertos valores como los colores de nuestra aplicación, recogidos en un solo archivo, pudiendo así cambiar rápidamente el estilo general de la aplicación, o reutilizar la estructura en otros proyectos. Esta aproximación sería parecida a usar [variables globales en SCSS](https://sass-lang.com/documentation/variables).

```tsx title="src/style/ColorStyles.tsx"
export const themes = {
  light: {
    text1: "black",
    text2: "rgba(0,0,0,0.7)",
    primary: `#7838e0`,
    secondary: "#87FDDE",
    backgroundColor: `#f2f6ff`,
    backgroundForm: `#e0e7f7`,
    disabled: `#6c8086`,
    warning: `#C22D2D`,
    loadingScreen: "rgba(0,0,0,0.7)",
    card: {
      backgroundColor: `rgba(255, 255, 255, 0.6)`,
      boxShadow: `0px 50px 100px rgba(34, 79, 169, 0.3),
      inset 0 0 0 0.5px rgba(255, 255, 255, 0.6)`,
      backgroundColorFull: `rgba(255, 255, 255, 1)`,
    },
...
```

Así podremos luego aplicarlo en nuestros componentes de forma muy sencilla, como podemos ver a continuación:

```tsx title="src/components/cards/AboutMeCardRow.tsx"
const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;
```

## Texto

Al igual que hemos visto con los colores, al poder extender estilos es posible tener un archivo con todos los estilos de texto que queramos usar y así poder importar y extender en nuestros componentes.

```tsx title="src/styles/TextStyles.tsx"
import styled from "styled-components"

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 50px;
  @media (max-width: 450px) {
    font-size: 48px;
  }
`

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 32px;
  @media (max-width: 450px) {
    font-size: 24px;
  }
`
```

Teniendo este fichero, ahora solo tenemos que importarlo en nuestro componente y extenderlo:

```tsx title="src/components/cards/AboutMeCardRow.tsx"
import { MediumText } from "../../styles/TextStyles";

...

const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;
```

## Modo Oscuro

En la sección de colores, hemos podido observar que tenemos variaciones para un modo oscuro, esto es así porque a lo largo del proyecto vamos a implementar un modo oscuro gracias al selector css `prefers-color-scheme: dark`, todos los componentes y estilos generales que queramos adapatar podrán añadir variar su estilo y componente aplicando el selector, como podemos ver a continuación:

```ts title="src/style/GlobalStyle.ts"
import { createGlobalStyle } from "styled-components"
import { themes } from "./ColorStyles"

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${themes.light.backgroundColor};
        @media (prefers-color-scheme: dark) {
          background: ${themes.dark.backgroundColor};
        }   
    }
`
```

```tsx title="src/components/layout/headr.tsx"
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1234px; */
  height: 30px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  padding: 30px 30px;
  z-index: 3;
  background-color: ${themes.light.primary};

  @media(prefers-color-scheme: dark) {
      background-color: ${themes.dark.primary};
  }
`;
```

Así nuestra página imitará el comportamiento del sistema en el que se ejecute.

![dark mode](../../static/img/tutorial/front/6_dark_mode.png)
