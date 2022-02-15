---
sidebar_position: 1
---

# Introducción

[Enlace del proyecto en Github](https://github.com/lucferbux/Taller-Testing-Security)

En esta nueva sección vamos a hablar de dos aspectos muy importantes y muy buenos indicativos de la robustez de un proyecto: el testing y la seguridad. Ya hemos pasado la primera mitad de nuestro taller, en el que nos focalizamos en desarrollar la arquitectura y el código para dotar a nuestra webapp de la funcionalidad que requería. En esta sesión iremos modificando pequeños detalles para hacer nuestro código más seguro y a la vez iremos añadiendo tests para cubrir la lógica principal de nuestra aplicación. Si seguimos utilizando el diagrama de la arquitectura, nuestro proyecto quedaría de la siguiente manera.

![Security & Testing Architecture](../../static/img/tutorial/security/0_testing_sec_architecture.png)

Como podemos observar, vamos a añadir módulos de testing tanto al *frontend* como al *backend*. Otro de los cambios que podemos observar es que moveremos el JWT a una cookie de sesión para mejorar la seguridad de las conexiones de nuestra aplicación. Antes de comenzar con la sesión, estaría bien repasar algunos conceptos para poder aplicarlos correctamente en las siguientes secciones.

## Conceptos importantes

### XSS

![XSS](../../static/img/tutorial/security/0_1_XSS.png)

Ataque a aplicaciones web en el que *scripts* maliciosos son inyectados a una página con la intención de ejecutar código arbitrario para alterar el funcionamiento inicial.

[Video explicativo](https://youtu.be/EoaDgUgS6QA)

### CSRF

![CSRF](../../static/img/tutorial/security/0_2_CSRF.png)

El Cross-Site REquest Forgery es un ataque que fuerza a usuarios autenticado a realizar peticiones a una aplicación web a la que están autenticados. Estos ataques explotan la confianza que tiene esta web en sus usuarios autenticados permitiendo realizar tareas que de otra forma necesitan privilegios.

[Video explicativo](https://www.youtube.com/watch?v=eWEgUcHPle0)

### SQL Injection

![SQL](../../static/img/tutorial/security/0_3_SQL.png)

Vector de ataque que intenta manipular una base de datos para acceder a información que en principio no debería ser extraída. Suele producirse al no sanetizar las consultas a la base de datos a través de formularios o parámetros url, pudiendo formar consultas maliciosas que devuelven información sensible.

[Video explicativo](https://www.youtube.com/watch?v=ciNHn38EyRc&t=646s)
