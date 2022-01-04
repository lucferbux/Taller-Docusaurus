---
sidebar_position: 2
---

# Backend - Heroku

Para el despliegue del BackEnd en producción podemos usar diferentes servicios y plataformas. Antes de nada hay que hacer una diferenciación entre **IaaS** y **PaaS**.

* **IaaS**: Infraestructure-as-a-Service o Infraestructura como servicio es el paso más próximo al **on-premise**, donde solo se te ofrece la infraestructura como servicio (máquina virtual, networking...), mientras que todo lo demás lo desplegamos nosotros. Algunos ejemplos son [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/en-us/) o [Google Cloud](https://cloud.google.com/).

* **PaaS**: Platform-as-a-Service o Plataforma como servicio es el siguiente paso a la infraestructura. Aquí el proveedor mantiene el hardware y el software principal. PaaS permite ejecutar y manejar las apps desplegando exclusivamente el código. Ejemplos de esto pueden ser [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/), [Heroku](https://www.heroku.com/), y [Red Hat OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift).

No vamos a hablar detenidamente de **SaaS**, ya que se sale del ámbito del despliegue de código, pero sí podremos mencionar otros servicios como [Firebase](https://firebase.google.com/), más parecido a **BaaS** o **Backend as a Service** que ya veremos más adelante.

![IaaS vs PaaS](/img/tutorial/deployment/iaas.png)
*Red Hat IaaS vs PaaS*

En este caso, para nuestro despliegue usaremos [Heroku](https://www.heroku.com/), que al ser un **PaaS** no tendremos que gestionar el entorno, con indicar qué tipo de tecnología estamos usando y enlazarlo con nuestro proyecto, el despliegue de la aplicación se realizará automáticamente sin necesidad de gestión por nuestra parte.

## Despliegue con Heroku

![Heroku Dashboard](/img/tutorial/deployment/heroku.png)
*Heroku Dashboard*

Este despliegue está orientado para el proyecto de [backend](https://github.com/lucferbux/Taller-Backend).

1. Dirígete a la [web de heroku](https://www.heroku.com) y registra una nueva cuenta o accede con alguna creada.
2. Crea un nuevo proyecto, con el nombre `node-personal-portfolio-bbdd` o similar.
3. Descarga la herramienta [heroku cli](https://devcenter.heroku.com/articles/heroku-cli) e instalala en tu ordenador.
4. Ejecuta la inicialización de heroku con `heroku login`
5. Añade el repostiorio al espacio de heroku `heroku git:remote -a node-personal-portfolio`
6. Ejecuta el comando para usar node en modo desarrollo `heroku config:set NODE_ENV=development`
7. Crea un nuevo git path para el repositorio ejecutando --> git push heroku `git subtree split --prefix backend main`:master --force


## Despliegue con Heroku - BBDD

Este despliegue está orientado para el proyecto de [bbdd](https://github.com/lucferbux/Taller-BBDD) o siguientes.

### Atlas

https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/

### Heroku

1. Dirígete a la [web de heroku](https://www.heroku.com) y registra una nueva cuenta o accede con alguna creada.
2. Crea un nuevo proyecto, con el nombre `node-personal-portfolio-bbdd` o similar.
3. Descarga la herramienta [heroku cli](https://devcenter.heroku.com/articles/heroku-cli) e instalala en tu ordenador.
4. Ejecuta la inicialización de heroku con `heroku login`
5. Añade el repostiorio al espacio de heroku `heroku git:remote -a node-personal-portfolio`
6. Crea una instancia de mongodb `heroku addons:create mongolab:sandbox`
7. Ejecuta el comando para usar node en modo desarrollo `heroku config:set NODE_ENV=development`
8. Ejecuta el comando para seleccionar **Atlas** como uri para el backend `heroku config:set DATABASE_URI=atlas_uri`
9. Ejecuta el comando para seleccionar la bbdd principal `heroku config:set MONGODB_DB_MAIN=portfolio_db`
10. Crea un nuevo git path para el repositorio ejecutando --> git push heroku `git subtree split --prefix backend main`:master --force
