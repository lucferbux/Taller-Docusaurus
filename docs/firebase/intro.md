---
sidebar_position: 1
---

# Introducción

[Enlace del proyecto en Github](https://github.com/lucferbux/Taller-Firebase)

En esta sesión extra vamos a ver como mover toda nuestra lógica del backend a un servicio en la nube que nos permita replicar toda la funcionalidad sin apenas complegidad. Como ya vimos en la [sección de despliegues](../deployment/backend), existen diferentes servicios en la nube, dependiendo del grado de abstracción (*IaaS*, *PaaS*, *SaaS*). En el caso de **Firebase**, nos encontramos con un *BaaS* o *Backend as a Service*. Esto significa que tendremos una capa de abstracción enorme en nuestro servicio, y no nos tendremos que preocupar de cosas como la gestión de la base de datos, de la infraestructura o del aumento de la demanda ya que directamente Firebase nos gestionará todo eso automáticamente.

Además, uno de los puntos diferenciadores de *Firebase* como plataforma es que cuenta con librerías para casi todas las plataformas, permitiendo hacer uso de todos sus servicios de una forma sencilla e intuitiva. Así, podremos hacer uso de *autenticación*, *conexión a bases de datos*, *conexión a archivos*, *sistemas de mensajería*, *servicios de IA* sin apenas configuración y en pocas líneas de código.

![Firebase Architecture](../../static/img/tutorial/deployment/architecture-deployment-firebase.svg)

Vamos a ver cómo hemos adaptado nuestro código para adaptarlo a esta plataforma. Ya veréis como simplificamos el proyecto de una forma espectacular manteniendo toda su funcionalidad. Personalmente Firebase es un recurso útil a la hora de crear *PoC* rápidas y dinámicas, ya que nos ayuda como desarrolladores a abstraernos de muchas complejidades en nuestra infraestructura.
