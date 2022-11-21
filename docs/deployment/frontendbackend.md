---
sidebar_position: 4
---

# Frontend - Netlify + Render

En esta ocasión, vamos a conectar el **frontend** de nuestro proyecto **monorepo** con el **backend**. Para ello vamos a subir la carpeta **ui** a [Netlify](https://www.netlify.com) mientras que la carpeta **backend** a [Render](https://render.com).

![Backend Architecture](/img/tutorial/deployment/architecture-deployment-backend-render.svg)

## Netlify - Conectando la BBDD

Este despliegue está orientado para el proyecto de [bbdd](https://github.com/lucferbux/Taller-BBDD) o siguientes.

1. Registra una cuenta o accede al servicio. Personalmente he elegido crearla con mi cuenta de **Github**.
2. En el dashboard principal, en el botón de **Add new site**, selecciona la opción **Import an existing project**.
3. Ahora vamos a tener que conectar Netlify con nuestro **repositorio de GitHub**, aquí podéis elegir dar acceso a todos los respositorios o elegir a cuáles de ellos puede tener acceso.
4. En la siguiente página elegimos el proyecto que queremos desplegar.
5. Este es el primer paso diferente, aquí seleccionaremos la rama, en nuestro caso `main`, el **base directory** que para nuestro proyecto monorepositorio será `ui`, **build command**, en este caso ``npm run build`` y el directorio resultante, que en este caso será ``ui/build``.
![6 selection config](/img/tutorial/deployment/netlify/7_configuration.png)
6. Una vez pulsemos el botón de **Deploy site** Netlify accederá a nuestro repositorio, compilará el código y desplegará la web estática en su servicio de hosting.
7. Esperamos unos minutos hasta que el proyecto esté desplegado.
8. Ahora pulsaremos el botón de **Domain Settings**, y dentro de **Custom Domains** podremos cambiar el nombre del dominio de nuestro proyecto a lo que queramos pulsando el botón **Options**.
9. Por último, vamos a añadir una variable de entorno para que nuestra webapp pueda contactar con nuestro backend, para ello dentro de **Build & Deploy**, navega hasta encontrar la opción de **Environment Variables**
![13 Env Variable](/img/tutorial/deployment/netlify/13_environment.png)
10. Ahora vamos a añadir una nueva variable llamada `REACT_APP_API_URI`, y el valor va a ser la url que hayamos obtenido [configurando render](./backendrender).
![13 Coinfig](/img/tutorial/deployment/netlify/14_variable.png)
11. Ya solo tenemos que forzar una nueva compilación para añadir la variable de entorno a nuestra webapp y que pueda conectarse con nuestro **backend**
![14 Redeploy](/img/tutorial/deployment/netlify/15_redeploy.png)

Ahora al inspeccionar las conexiones dentro de la sección de **proyectos** veremos que nuestra webapp conecta con render.

![Project Deployed](/img/tutorial/deployment/netlify/16_heroku_integration.png)
*Proyecto conectado con Heroku*
