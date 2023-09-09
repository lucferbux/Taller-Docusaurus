---
sidebar_position: 5
---

# Hooks

Ya llevamos varios años con **hooks**, desde su introducción en **React 16.8** y son funciones que permiten añadir funcionalidad extra a nuestros **componentes funcionales** como el control del estado con **useState**, el ciclo de vida del componente con **useEffect** o incluso funcionalidad personalizada con **custom hooks**. Nosotros hemos utilizado esta característica para poder utilizar nuestros *contextos* dentro de los *componentes funcionales* de la aplicación y hacer llamadas en la aplicación.

Los *Hooks* fueron un cambio bastante polémico dentro de la comunidad de React, pero al final del día ofrecen una capacidad de abstracción bastante útil para mejorar la legibilidad de nuestro código y parece que es el futuro de la librería. Vamos a ver un par de ejemplos, uno con el **hook** de *useState* y otro un **custom hook** muy sencillo para coger el contexto.

En el caso de `useState`, nos va a permitir controlar el estado de nuestro componente, en este caso, el estado de nuestro formulario de login, cada vez que cambiemos el valor a uno de los estados, el componente se volverá a renderizar con el nuevo valor. Podemos ver que el hook nos devuelve un array con el valor del estado y una función para cambiarlo. Es muy sencillo de utilizar, con una sintaxis bastante clara y concisa.

```tsx title="src/components/Login.tsx"
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
...
```

Por otro lado tenemos este `useAuth`, que nos permite coger el contexto de autenticación de nuestra aplicación y aplicarlo a cualquier componente de función.

```tsx title="src/hooks/useAuth.tsx"
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

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
          <App />
      </AuthProvider>  
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Custom hooks

Vamos a crear nuestro custom hook para **realizar las peticiones** en el componente `Dashboard`, para ello crearemos un nuevo archivo llamado `useFetchData`, que aceptará un input genérico, realizará una llamada fetch y devolverá los datos. Así, podemos pasar la llamada que queramos hacer de forma dinámica, bien sea un mock, como actualmente, como en el futuro una llamada desde nuestra API.

```tsx title="src/hooks/useFetchData.tsx"
type FetchDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => void;
};

export default function useFetchData<T>(fetchFunction: () => Promise<T>): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, reloadCount]);

  const reload = useCallback(() => {
    setReloadCount((prevCount) => prevCount + 1);
  }, []);

  return { data, isLoading, error, reload };
}
```
