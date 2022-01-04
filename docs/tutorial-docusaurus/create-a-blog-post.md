---
sidebar_position: 4
---

# Crear un Post para Blog

Docusaurus crea una **página por cada post de blog**, pero también genera una **página dentro del índice de blogs**, un **sistema de tags** y un feed **RSS**...

## Crea tu primer Post para el Blog

Crea un archivo llamado `blog/2021-02-28-greetings.md`:

```md title="blog/2021-02-28-greetings.md"
---
slug: greetings
title: Greetings!
authors:
  - name: Joel Marcey
    title: Co-creator of Docusaurus 1
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
  - name: Sébastien Lorber
    title: Docusaurus maintainer
    url: https://sebastienlorber.com
    image_url: https://github.com/slorber.png
tags: [greetings]
---

Congratulations, you have made your first post!

Feel free to play around and edit this post as much you like.
```

Con esto, un nuevo blog estará disponible en `http://localhost:3000/blog/greetings`.
