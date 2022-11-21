---
sidebar_position: 5
---

# Backend - Heroku + BBDD

En este segundo despliegue, conectaremos nuestro backend de [Heroku](https://www.heroku.com) con una base de datos MongoDB que reside en [Atlass](https://www.mongodb.com/cloud/atlas). Así, nuestro esquema del despliegue se quedaría en algo parecido a esto:

![General Architecture](/img/tutorial/deployment/architecture-deployment-general.svg)

## Despliegue con Heroku - BBDD

Este despliegue está orientado para el proyecto de [bbdd](https://github.com/lucferbux/Taller-BBDD) o siguientes.

### Atlas

[Mongo DB Atlas](https://www.mongodb.com/atlas/database) es un servicio de base de datos en la nube que permite almacenar documentos basados en MongoDB incorporando optimización de recursos, cargas de trabajo y mucho más. Tiene un servicio gratuito que podemos utilizar para nuestro proyecto.

1. Crea una nueva cuenta o accede a tu cuenta desde [esta página](https://www.mongodb.com/cloud/atlas/register).
![1 Welcome](/img/tutorial/deployment/atlass/1_welcome_atlass.png)
2. Elige la opción gratuita llamada **shared** pulsando en el botón `create`.
![2 free Tier](/img/tutorial/deployment/atlass/2_free_tier.png)
3. En la siguiente página, elige la región de tu `cluster gratuito` en este caso he seleecionado `eu-west-1` en Irlanda.
![3 Cluster Selection](/img/tutorial/deployment/atlass/3_select_cluster.png)
4. Ahora pasaremos a la configuración de seguridad, primero seleccionaremos **Username and Password** y crearemos un nuevo usuario, recuerda las credenciales porque las usaremos próximamente.
![4 User Creation](/img/tutorial/deployment/atlass/4_user.png)
5. En la sección de abajo elegiremos como conectarnos, en este caso seleccionaremos **Cloud Engironment** ya que querremos conectarnos desde Heroku, por conveniencia añadiremos la siguiente ip `0.0.0.0/0` que permitirá conectarnos desde cualquier IP aunque esto es un **problema de seguridad**.
![5 Connection](/img/tutorial/deployment/atlass/5_ip.png)
6. Una vez hayamos configurado nuestro cluster, dentro del **Dashboard principal** seleccionaremos nuestro cluster (Cluster0) y pulsaremos el botón `Connect`. En la ventana modal siguiente pulsaremos **Connect your application**.
![6 App](/img/tutorial/deployment/atlass/6_connect_app.png)
7. Por último, vamos a seleccionar de Driver **Node.js** y como Version **4.0 or later**, nos aparecerá una cadena de conexión.
![7 String connection](/img/tutorial/deployment/atlass/7_app.png)

De esta cadena nos interesa coger la siguiente parte:

```mongodb+srv://lucferbux:<password>@cluster0.a7ym7.mongodb.net/```

Recuerda que hay que sustituir `<password>` por tu contraseña y que en el campo `lucferbux` tiene que aparecer el **username** que has creado antes. Además **recuerda que hay que mantener la barra lateral "/" al final de la cadena**

Ahora, dentro del proyecto de [bbdd](https://github.com/lucferbux/Taller-BBDD) o posteriores, vamos a ejecutar el siguiente comando para poblar la bbdd:

```make import-atlass -e MONGODB_ATLAS=mongodb+srv://lucferbux:<password>@cluster0.a7ym7.mongodb.net```

Sustityuendo la cadena de conexión por la tuya. En este caso la cadena **no tendrá la barra lateral "/" al final de la cadena, eso será necesario para la conexión de Heroku**. Ahora navegando a la sección de **Collections** veremos la información en la bbdd.

![8 Collections](/img/tutorial/deployment/atlass/8_collections.png)

### Heroku

Los pasos de Heroku son similares a los vistos en el [anterior despliegue](./backend)

1. Dirígete a la [web de heroku](https://www.heroku.com) y registra una nueva cuenta o accede con alguna creada.
2. Crea un nuevo proyecto, con el nombre `node-personal-portfolio-bbdd` o similar.
3. Descarga la herramienta [heroku cli](https://devcenter.heroku.com/articles/heroku-cli) e instalala en tu ordenador.
4. Ejecuta la inicialización de heroku con `heroku login`
5. Añade el repostiorio al espacio de heroku `heroku git:remote -a node-personal-portfolio-bbdd` (el nombre es el mismo que hayamos elegido antes).
6. Ejecuta el comando para usar node en modo desarrollo `heroku config:set NODE_ENV=development`
7. Ejecuta el comando para seleccionar **Atlas** como uri para el backend `heroku config:set MONGODB_URI=mongodb+srv://lucferbux:<password>@cluster0.a7ym7.mongodb.net/`. Cambia el **username** y el **password** y **recuerda mantener la barra lateral "/"**.
8. Ejecuta el comando para seleccionar la bbdd principal `heroku config:set MONGODB_DB_MAIN=portfolio_db`
![Env Variables](/img/tutorial/deployment/heroku/6-config-vars.png)
9.  Crea un nuevo git path para el repositorio ejecutando `git subtree push --prefix backend heroku master`
