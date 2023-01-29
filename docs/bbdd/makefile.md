---
sidebar_position: 6
---

# Makefile

Vamos a hablar ahora de los cambios en nuestro `Makefile`. Como ya comentamos en la [clase anterior](../backend/makefile), este fichero nos permitía unificar todos los comandos de nuestro proyecto monorepo en un solo lugar. Con la inclusión de la base de datos hemos ampliado estos comandos, que vamos a describir ahora.

## Scripts de inicialización

Ya habíamos hablado de cómo levantar tanto el *backend* como el *frontend* mediante comandos en **makefile**. En esta ocasión hemos añadido una nueva opción, que con el flag [-j o --jobs](https://www.gnu.org/software/make/manual/html_node/Parallel.html) permite ejecutar en paralelo varios comandos, así podremos inicializar la *base de datos*, el *frontend* y el *backend* al mismo tiempo.

```makefile title="Init Scripts"
# Init Scripts
.PHONY: dev-api
dev-api:
    cd backend && npm run dev

.PHONY: dev-ui
dev-ui:
    cd ui && npm run start

.PHONY: dev-start
dev-start: 
    make -j 3 mongo-start dev-api dev-ui
```

## Scripts de BBDD

Ahora vamos a ver los scripts de la base de datos. La lógica de los mismos la explicaremos en la [siguiente sesión](./scripts), pero hay unas cuentas cosas que mencionar aquí. Lo primero es que hemos añadido algunas variables para parametrizar nuestros comandos. La forma de asignar valores a estas variables es con el flag `-e`, así, para generar un nuevo usuario y contraseña en nuestra base de datos ejecutaremos el siguiente comando: `make generate-password -e USERNAME=[CORREO] -e PASS=[CONTRASEÑA]`. Al igual que para el momento que [incorporemos mongodb atlass](../deployment/backendbbdd#atlas) podremos importar la conexión a nuestro backend ejecutando el siguiente comando: `make import-atlass -e MONGODB_ATLAS=mongodb+srv://<username>:<password>@<cluster>.mongodb.net`.

```makefile title="DB Scripts"
USER  ?= user@gmail.com
PASS  ?= patata
MONGODB_ATLAS ?= mongodb+srv://<username>:<password>@<cluster>.mongodb.net

...

# DB Scripts
.PHONY: dev-populate-data
dev-populate-data:
    cd scripts && ./mongoimport.sh

.PHONY: dev-delete-data
dev-delete-data:
    cd scripts && ./mongodelete.sh

.PHONY: mongo-start
mongo-start:
    cd scripts && ./mongostart.sh

.PHONY: mongo-export
mongo-export:
    cd scripts && ./mongoexport.sh

.PHONY: dev-bbdd-start-populate
dev-bbdd-start-populate: mongo-start dev-populate-data

.PHONY: generate-password
generate-password:
    cd scripts && ./generatepass.sh $(USER) $(PASS)

.PHONY: import-atlass
import-atlass:
    cd scripts && ./mongoimportatlass.sh $(MONGODB_ATLAS)
```

## Scripts de instalación

Por último, para hacer la tarea más fácil, hemos incluido scripts de instalación, que básicamente instalan las dependencias tanto del *frontend* como del *backend*, muy útil al inicializar por primera vez el proyecto.

```makefile title="Installation Scripts"
...

# Installation scripts
.PHONY: install-ui
install-ui:
    cd ui && npm install

.PHONY: install-backend
install-backend:
    cd backend && npm install

.PHONY: install-dependencies
install-dependencies: install-ui install-backend
```
