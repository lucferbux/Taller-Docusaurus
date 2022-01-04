---
sidebar_position: 2
---

# Crear una página

Añade archivos **Markdown o React** a la ruta `src/pages` para crear una **página independiente**:

- `src/pages/index.js` -> `localhost:3000/`
- `src/pages/foo.md` -> `localhost:3000/foo`
- `src/pages/foo/bar.js` -> `localhost:3000/foo/bar`

## Crea tu primera página en React

Crea un nuevo archivo en `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

Esta nueva página estará disponible en `http://localhost:3000/my-react-page`.

## Crea tu nueva página en Markdown

Crea un nuevo archivo en `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

Esta nueva página estará disponible en `http://localhost:3000/my-markdown-page`.
