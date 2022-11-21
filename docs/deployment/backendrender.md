---
sidebar_position: 3
---

# Backend - Render

Para el despliegue del BackEnd en producción podemos usar diferentes servicios y plataformas. Nuestro objetivo final es tener el frontend en el servicio de [Netlify](https://www.netlify.com) que conecte con nuestro backend en [Render](https://render.com). El esquema final sería el siguiente.

![Backend Architecture](/img/tutorial/deployment/architecture-deployment-backend-render.svg)

 Antes de nada hay que hacer una diferenciación entre **IaaS** y **PaaS**.

* **IaaS**: Infraestructure-as-a-Service o Infraestructura como servicio es el paso más próximo al **on-premise**, donde solo se te ofrece la infraestructura como servicio (máquina virtual, networking...), mientras que todo lo demás lo desplegamos nosotros. Algunos ejemplos son [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/en-us/) o [Google Cloud](https://cloud.google.com/).

* **PaaS**: Platform-as-a-Service o Plataforma como servicio es el siguiente paso a la infraestructura. Aquí el proveedor mantiene el hardware y el software principal. PaaS permite ejecutar y manejar las apps desplegando exclusivamente el código. Ejemplos de esto pueden ser [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/), [Heroku](https://www.heroku.com/), y [Red Hat OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift).

No vamos a hablar detenidamente de **SaaS**, ya que se sale del ámbito del despliegue de código, pero sí podremos mencionar otros servicios como [Firebase](https://firebase.google.com/), más parecido a **BaaS** o **Backend as a Service** que ya veremos más adelante.

![IaaS vs PaaS](/img/tutorial/deployment/iaas.png)
*Red Hat IaaS vs PaaS*

En este caso, para nuestro despliegue usaremos [Render](https://render.com), que al ser un **PaaS** no tendremos que gestionar el entorno, con indicar qué tipo de tecnología estamos usando y enlazarlo con nuestro proyecto, el despliegue de la aplicación se realizará automáticamente sin necesidad de gestión por nuestra parte.

## Despliegue con Render

![Heroku Dashboard](/img/tutorial/deployment/render/render.png)
*Render Landing Page*

Este despliegue está orientado para el proyecto de [backend](https://github.com/lucferbux/Taller-Backend). Render permite configurar en su dashboard el despliegue de nuestro proyecto en unos sencillos pasos:

1. [Dirígete a la web](https://dashboard.render.com) y en la página de login usa un método de registro (por ejemplo login con GitHub)
![Render login](/img/tutorial/deployment/render/1-login.png)
2. Una vez logeado, selecciona **Web Services** para crear un nuevo servicio Web.
![Render Overview](/img/tutorial/deployment/render/2-select-option.png)
3. Para crear un nuevo servicio, conecta tu cuenta de Github.
![Render Connect Repo](/img/tutorial/deployment/render/3-connect-repository.png)
4. Una vez conectado, elige el repositorio que quieras desplegar, (en nuestro caso es el **Taller-Backend**).
![Render Select Repo](/img/tutorial/deployment/render/4-select-repository.png)
5. Añade los datos que ves en la captura, en este caso el nombre puedes personalizarlo, **root repository** lo indicamos con `backend` ya que es la carpeta donde se encuentra nuestro backend, el **entorno** es `Node`, la región puede ser cualquiera, elegimos la **rama** que queremos desplegar, en nuestro caso `final_version` y luego ponemos el **compando de compilación**, para compilar el proyecto y el **comando de ejecución**.
![Render Add Info](/img/tutorial/deployment/render/5-add-info.png)
6. Ahora comprueba an los eventos que se despliega el repositorio, que estará disponible en la url que aparece debajo del nombre, para probarla escribe en tu navegador `https://<ruta-generada>/v1/aboutme`.
![Render Deploy](/img/tutorial/deployment/render/6-deploy.png)
