---
sidebar_position: 3
---

# Makefile

Como hemos comentado en la [introducción](./intro#monorepo), vamos a usar una estructura [monorepo](https://www.atlassian.com/git/tutorials/monorepos) para nuestro proyecto. Esto presenta una serie de problemas que se pueden solventar de diferentes maneras, por ejemplo la necesidad de mantener un mecanismo centralizado para controlar todos los sub-proyectos. Otro de los grandes problemas es tener que escalar un proyecto con múltiples servicios, miles de lineas de código y diferentes mecanísmos para automatizar la integración y el despliegue continuos. De momento no nos vamos a preocupar de esto, y la decisión principal por la que usar monorepos es por tener nuestro código centralizado y enseñar un mecanísmo como este.

Para controlar todo nuestro proyecto podríamos utilizar diferentes estrategias. Al ser todo proyectos basados en node, podemos utilizar una combinación de [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) o [turborepo](https://turborepo.org) para controlar las dependencias, tener módulos compartidos y poder ejecutar instrucciones desde la raíz del proyecto por ejemplo pero hoy vamos a ver una técnica mucho más *"rudimentaria"*.

## Make para desarrollo actual

[Make](https://www.gnu.org/software/make/manual/make.html) es una utilidad que determina que "componentes" de un programa más grande necesitan ser compiladas, y ejecuta comandos para re-compilarlos. Históricamente se ha usado dentro del desarrollo de lenguajes como C o C++ junto a los ficheros *makefile*. Estos ficheros siguen una estructura que determina como compilar y enlazar un programa.

```makefile title="Ejemplo de Makefile"
edit : main.o kbd.o command.o display.o \
       insert.o search.o files.o utils.o
        cc -o edit main.o kbd.o command.o display.o \
                   insert.o search.o files.o utils.o

main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
command.o : command.c defs.h command.h
        cc -c command.c
display.o : display.c defs.h buffer.h
        cc -c display.c
insert.o : insert.c defs.h buffer.h
        cc -c insert.c
search.o : search.c defs.h buffer.h
        cc -c search.c
files.o : files.c defs.h buffer.h command.h
        cc -c files.c
utils.o : utils.c defs.h
        cc -c utils.c
clean :
        rm edit main.o kbd.o command.o display.o \
           insert.o search.o files.o utils.o
```

Aquí podemos ver un ejemplo simple de Makefile que describe un archivo ejecutable llamado *edit* que depende de ocho objetos que, a su vez, dependen de 8 ficheros C y 3 cabeceras. Para ejecutar este archivo solo tendríamos que lanzar el comando `make` desde nuestro terminal. Para eliminar el ejecutable resultante podemos lanzar el comando clean mediante `make clean`.

Al final, mediante el uso de una utilidad llamada [phony targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets) para evitar no ejecutar un target si existe un fichero con el nombre de ese comando, podremos lanzar cualquier tipo de comando al llamar a alguno de esos *targets*.

Como bien presenta [esta web](https://makefile.site/#subscribe), podemos utilizar **Make** para crear *"atajos"* para ciertos comandos de nuestro repositorio, y así poder lanzar desde la raíz de nuestro *mono-repositorio* acciones para los proyectos hijos.

```makefile title="Makefile"
.PHONY: dev-api
dev-api:
    cd api && npm run start:dev

.PHONY: dev-ui
dev-ui:
    cd ui && npm run start:dev

.PHONY: install-ui
install-ui:
    cd ui && npm install

.PHONY: install-api
install-api:
    cd api && npm install
```

Para esta sesión, crearemos dos comandos, uno llamado `dev-api`, que ejecutará en modo desarrollador nuestro *backend* y otro llamado `dev-ui`, que hará lo propio con el *frontend*. Solo tendremos que ejecutarlos con `make dev-api` o `make dev-ui` y lanzaremos nuestro proyecto.
