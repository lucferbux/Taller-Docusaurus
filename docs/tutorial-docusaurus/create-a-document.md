---
sidebar_position: 3
---

# Crear un Documento

Los documentos son **páginas agrupadas** conectadas mediante:

- Una **barra lateral**
- **navegación anterior/siguiente**
- **versionado**

## Crea tu primer Documento

Crea un fichero markdown dentro de `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

Este nuevoo documento estará disponible en `http://localhost:3000/docs/hello`.

## Configura la Barra Lateral

Docusaurus **crea una Barra Lateral** automáticamente dentro de la carpeta `docs`.

Añade metadata para personalizar la descripción y posición de la barra lateral:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

También es posible crear la barra lateral de forma explicita dentro de `sidebars.js`:

```diff title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
-     items: [...],
+     items: ['hello'],
    },
  ],
};
```
