---
sidebar_position: 5
---

# Hooks

Los Hooks son una incorporación relativamente nueva, introducidos en **React 16.8** y son funciones que permiten *"enganchar"* nuestros componentes funcionales a caraceterísticas de un componente de clase. Además de poder controlar el estado con **useState**, el ciclo de vida del componente con **useEffect** y demás funcionalidades, es posible construir nuestros propios **Hooks**. Nosotros hemos utilizado esta característica para poder utilizar nuestros *contextos* dentro de los *componentes funcionales* de la aplicación.

Los *Hooks* han sido un cambio bastante polémico dentro de la comunidad de React, pero al final del día ofrecen una capacidad de abstracción bastante útil para mejorar la legibilidad de nuestro código. Podemos utilizarlos de diversas formas, en nuestro proyecto lo utilizaremos para poder llamar a los contextos dentro de nuestros **componentes funcionales**.

La forma de hacerlo es muy sencilla, solo tenemos que crear una nueva función, llamar al contexto y devolverlo. Lo podemos ver claramente con los ejemplos de abajo:

```tsx title="src/hooks/useApp.tsx"
import { useContext } from "react";
import AppContext from "../context/AppContext/AppContext";


export default function useApp() {
  const context = useContext(AppContext);

  return context;
}
```

```tsx title="src/hooks/useAuth.tsx"
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
```

:::danger Uso de Hooks para contextos

Cada vez que usamos un hook para llamar un contexto dentro de un componente, tenemos que comprobar que el componente esté dentro del **Provider** del contexto, en nuestro caso hemos definido al inicio de nuestro proyecto los providers que utilizará.

:::

```tsx title="src/index.tsx"
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>  
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
