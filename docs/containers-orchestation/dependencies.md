---
sidebar_position: 2
---

# Dependencias

Las dependencias más importantes ahora están relacionadas con herramientas de contenedores y orquestación

## Docker

*Docker* es una plataforma abierta para desarrollar, desplegar y ejecutar aplicaciones. En un plano general, permite separar la aplicación de la infraestructura para así generar despliegues muy rápido. Utilizando la metodología de Docker podemos reducir el tiempo entre el desarrollo de código y el despliegue en producción.

[Enlace a documentación](https://www.docker.com/)

## Docker Compose

Herramienta que permite definir y ejecutar aplicaciones multi-contenedores en Docker. Configurando una arquitectura mediante un fichero *YAML* podemos definir nuestra aplicación y servicios y desplegar nuestro proyecto con un solo comando.

[Enlace a documentación](https://docs.docker.com/compose/)

## Kubernetes

Sístema open-source que automatiza el despliegue, escalado y gestión de aplicaciones *contenerizadas*. Básicamente *Kubernetes* aporta descubrimiento de servicios, *balanceo de carga*, orquestación de almacenamiento, despliegues y *retiradas* automatizadas, auto-saneamiento y gestión de *secretos* y *configuraciones*.

[Enlace a documentación](https://kubernetes.io/)

## Minikube

Minikube permite ejecutar kubernetes en local, simulando un *cluster* de Kubernetes, con su *master node* y sus *worker nodes* dentro de nuestra máquina. Es multiplataforma, sencillo de instalar y de ejecutar y soporta muchas de las *funcionalidades avanzadas* de kubernetes como *balanceo de carga*, carga de directorios, políticas de red...

[Enlace a documentación](https://minikube.sigs.k8s.io/docs/start/)

## NGINX

Nginx es un *proxy inverso*, un *proxy para correos* y un *servidor proxy TCP/UUDP* genérico. Permite realizar distintas funciones como servir ficheros estáticos, acelerar el *proxy inverso* con *"caché"*, *"balanceo de carga"*, *"tolerancia a fallos"*, construir una arquitectura modular, mediante filtros y condiciones, y dar soporte a tráfico cifrado y al nuevo HTTP/2.

[Enlace a documentación](https://nginx.org/en/docs/)
