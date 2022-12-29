---
sidebar_position: 6
---

# Backend - Render + BBDD

En este segundo despliegue, conectaremos nuestro backend de [Render](https://render.com) con una base de datos MongoDB que reside en [Atlass](https://www.mongodb.com/cloud/atlas). Así, nuestro esquema del despliegue se quedaría en algo parecido a esto:

![General Architecture](/img/tutorial/deployment/architecture-deployment-general.svg)

## Despliegue con Render - BBDD

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
5. En la sección de abajo elegiremos como conectarnos, en este caso seleccionaremos **Cloud Engironment** ya que querremos conectarnos desde Render, por conveniencia añadiremos la siguiente ip `0.0.0.0/0` que permitirá conectarnos desde cualquier IP aunque esto es un **problema de seguridad**.
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

Sustityuendo la cadena de conexión por la tuya. En este caso la cadena **no tendrá la barra lateral "/" al final de la cadena, eso será necesario para la conexión de Render**. Ahora navegando a la sección de **Collections** veremos la información en la bbdd.

![8 Collections](/img/tutorial/deployment/atlass/8_collections.png)

### Render

1. Sigue los mismos pasos de la sección de [render](./backendrender.md) y sube [la sección de bbdd del taller](https://github.com/lucferbux/Taller-BBDD).
2. Antes de desplegar, haz click en la sección "Avanzado", para añadir las variables de entorno.
![Env Variables](/img/tutorial/deployment/renderatlass/1-advance.png)
3. Ahora, vamos a añadir las siguientes variables:
   * `NODE_ENV` - `development`
   * `MONGODB_URI` - `mongodb+srv://lucferbux:<password>@cluster0.a7ym7.mongodb.net/` (sustituir valores por los obtenidos en Atlass)
   * `MONGODB_DB_MAIN` - `portfolio_db`
![Env Varaiables Fill](/img/tutorial/deployment/renderatlass/2-env-variables.png)
4. Despliega la aplicación como en la sección pasada, verás un mensaje parecido a `info: [MongoDB] connection opened`.
![Render Deployed](/img/tutorial/deployment/renderatlass/3-deployment.png)
5. Como extra, puedes subir el front de la [la sección de bbdd del taller](https://github.com/lucferbux/Taller-BBDD) a Netlify como se indica en [la sección de Netlify + Render](./frontendbackend.md).