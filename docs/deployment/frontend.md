---
sidebar_position: 1
---

# Frontend - Netlify

Netlify es una compañía que ofrece servicios de **hosting** y **backend serverless** para aplicaciones web y sitios estáticos. El servicio permite controlar los despliegues de nuestro código mediante **control de versiones** con **Git** para generar contenido web estático que sirve mediante su propio **CDN** o Content Delivery Network.

![Hero](/img/tutorial/deployment/netlify/1_netlify.png)
*Netlify Landing Page*

## Netlify - Proyecto principal

Este despliegue está pensado para el proyecto [frontend](https://github.com/lucferbux/Taller-FrontEnd) del taller.

1. Registra una cuenta o accede al servicio. Personalmente he elegido crearla con mi cuenta de **Github**.
![2 Login Netlify](/img/tutorial/deployment/netlify/2_login.png)
2. En el dashboard principal, en el botón de **Add new site**, selecciona la opción **Import an existing project**.
![3 Import project](/img/tutorial/deployment/netlify/3_import_project.png)
3. Ahora vamos a tener que conectar Netlify con nuestro **repositorio de GitHub**, aquí podéis elegir dar acceso a todos los respositorios o elegir a cuáles de ellos puede tener acceso.
![4 Git Provider](/img/tutorial/deployment/netlify/4_git_provider.png)
4. En la siguiente página elegimos el proyecto que queremos desplegar.
![5 Git Projects](/img/tutorial/deployment/netlify/5_git_projects.png)
5. Ahora vamos a elegir la rama que queremos desplegar, en nuestro caso `main`, el **base directory** que lo dejaremos vacío de momento, **build command**, en este caso ``npm run build`` y el directorio resultante, ``dist``.
![6 selection](/img/tutorial/deployment/netlify/11_selection_base.png)
6. Una vez pulsemos el botón de **Deploy site** Netlify accederá a nuestro repositorio, compilará el código y desplegará la web estática en su servicio de hosting.
![8 Deployment](/img/tutorial/deployment/netlify/8_deployment.png)
7. Esperamos unos minutos hasta que el proyecto esté desplegado, resultando en el mensaje que vemos abajo.
![8 Deployment](/img/tutorial/deployment/netlify/9_domain_settings.png)
8. Ahora pulsaremos el botón de **Domain Settings**, y dentro de **Custom Domains** podremos cambiar el nombre del dominio de nuestro proyecto a lo que queramos pulsando el botón **Options**.
![8 Deployment](/img/tutorial/deployment/netlify/10_change_domain.png)

Y con eso tendríamos nuestro proyecto desplegado en la url que hayamos elegido, ahora puedes acceder a la web desde cualquier dispositivo a través del navegador.

![Project Deployed](/img/tutorial/deployment/netlify/12_project_deployed.png)
*Proyecto desplegado*
