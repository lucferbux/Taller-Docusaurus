---
sidebar_position: 6
---

# Despliegue Continuo

De la misma manera que hemos implementado la [integración continua](./ci) en nuestro proyecto vamos a crear un flujo para el *Despliegue Continuo*. Ya debéis saber que el *despliegue continuo* es una estrategia de desarrollo de software en la que los cambios de código de una aplicación se publican automáticamente en el entorno de producción. Esta automatización se basa en una serie de pruebas predefinidas. Una vez que las nuevas actualizaciones pasan esas pruebas, el sistema envía las actualizaciones directamente a los usuarios del software.

Como no vamos a usar los mismos flujos de [Gihub Actions](https://docs.github.com/en/actions) para realizar el despliegue en la plataforma de [Okteto](https://www.okteto.com).
** Nota: actualmente la plataforma no permite realizar despliegues en producción de forma gratuita, quedan aquí las instrucciones para realizar un despliegue una vez registrados.**

## Action Script

La estructura del script es muy parecida al anterior, vamos a repasar todos los pasos:

1. La directiva `on` indica cuando se va a ejecutar el *script*. En este caso hemos indicado que se ejecute una vez se ha hecho push en la rama `main`, esto ocurre también cuando se realiza un `merge` de una `pull request`.
2. El comando `workflow_dispatch` también permite ejecutar el script manualmente con un botón que aparece en la intefaz de *GitHub*.
3. Ahora vamos a definir los `jobs`, que son los flujos que se ejecutarán secuencialmente o en paralelo cuando lanzamos el *script*.
4. Vamos a indicar que la imagen donde vamos a ejecutar el *script* es `ubuntu-latest`.
5. Ahora vamos a ejecutar los pasos de nuestro `job`:
   1. `actions/checkout@v2` permite acceder al código de nuestro repositorio y usarlo.
   2. Vamos a usar las acciones predefinidas de [okteto](https://www.okteto.com/docs/cloud/github-actions/), `okteto/context@latest` permite indicar el secreto para conectarse con nuestro despliegue.
   3. `okteto/pipeline@latest` indica que vamos a realizar un despliegue con `pipeline`, así aprovecharemos lo que ya habíamos configurado en la sección de [kubernetes](./kustomize_okteto), elegiremos el nombre `okteto-pipeline-yaml` como nuestro despliegue.

Con esto veremos que al *mergear* una *pull request* nuestro código se despliega automáticamente en el entorno de *okteto*. Pero para ello debemos realizar primero unas configuraciones en *GitHub*.

```yaml title=".github/workflows/cd.yml"
# Linter work 
name: CD

# Controls when the workflow will run
on:
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:


# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  deploy:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v3
     
      - name: context
        uses: okteto/context@latest
        with:
          token: ${{ secrets.OKTETO_TOKEN }}
     
      - name: Trigger Pipeline
        uses: okteto/pipeline@latest
        with:
          name: my-personal-portfolio
          timeout: 8m
```

## Configuración Secreto

Si no pasamos el secreto `OKTETO_TOKEN`, a nuestro *script*, el flujo fallará ya que no podrá logearse con la plataforma, para ello necesitamos ir a [Okteto](https://www.okteto.com/), logearse con nuestra cuenta, dirigirse a *ajustes* o *settings*, y configurar un nuevo `Personal Access Token`.

![okteto login](../../static/img/tutorial/cicd/7_cd_okteto.png)

Ahora solo tendremos que copiar el valor de este token en el siguiente apartado de *GitHub*: `Settings > Secrets > Actions`. Creamos un nuevo secreto llamado `OKTETO_TOKEN` y copiamos el valor. Ahora nuestro Script puede acceder a ese valor.

![Github Action Secret](../../static/img/tutorial/cicd/8_github_action_secret.png)

Ejecutamos un despliegue y *GitHub Actions* debería desplegar nuestro código a producción automáticamente.

![okteto deployed](../../static/img/tutorial/cicd/4_okteto.png)
