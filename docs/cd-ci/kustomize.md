---
sidebar_position: 4
---

# Kubernetes

## Kustomize

Ahora toca el turno de modificar el despliegue orquestado que creamos en la [sesión anterior](../containers-orchestation/kubernetes.md). Nuestro problema ahora es que vamos a querer tener varios entornos de despliegue, más o menos igual que lo que nos pasó con docker, y por tanto algunos componentes variarán dependiendo del entorno.

Es por ello que vamos a utilizar [kustomize](https://kustomize.io), una herramienta de gestión de la configuración, directamente integrada en *kubernetes*, que permite crear diferentes despliegues de forma *declarativa*. Básicamente tendremos una configuración **base**, que mantendrá el mismo formato al que estamos acostumbrados y uno o varios **overlays**, donde incluiremos los archivos que extiendan, o reemplacen los valores y componentes de la instalación base. Cabe destacar que *kustomize* solo es capaz de **reemplazar** o **ampliar** componentes, no de eliminar archivos ni valores, por lo que la estrategia es que si en algún entorno no existe determinado archivo, este no se debe incluir en la base.

![kustomize scaffolding](../../static/img/tutorial/cicd/3_kustomize_scaffolding.png)

El archivo más importantes es `kustomization.yaml`, que se encontrará tanto en la carpeta *base* como en los *overlays* e indicará a *kustomize* que archivos va a incluir en el despliegue y las diferentes estrategias de extensión o inclusión de nuevos valores.

```yaml title="delivery/kubernetes/base/kustomization.yaml"
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - backend-configmap.yaml
  - backend-secret.yaml
  - backend.yaml
  - frontend-configmap.yaml
  - frontend-secret.yaml
  - frontend.yaml
  - mongo-configmap.yaml
  - mongo.yaml
```

Como podemos ver en el fichero `kutomize.yaml` del *overlay* para el despliegue en local, incluiremos todos los ficheros que encontrábamos en la *base*, añadiendo tres componentes más: `mongo-pv.yaml`, `ingress.yaml` y `mongo-pvc.yaml`. Estos archivos servirán para crear el [presistence volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) local, asignar a mongo espacio con [persistence volume claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim) y crear un punto de acceso con [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/).

```yaml title="delivery/kubernetes/overlays/local/kustomization.yaml"
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base
  - mongo-pv.yaml
  - ingress.yaml
  - mongo-pvc.yaml

namespace: portfolio-app-local
```

Ahora solo tendremos que cambiar los comando en nuestro `makefile`, para que soporte *kustomize*, simplemente tendremos que añadir el flag *-k* y apuntar al *overlay* que queramos desplegar, por ejemplo `kubectl apply -k delivery/kubernetes/overlays/local`.

```makefile title="Makefile"
.PHONY: k8s-create-ns
k8s-create-ns:
  kubectl create namespace portfolio-app-local

.PHONY: k8s-deploy
k8s-deploy:
  // highlight-next-line
  kubectl apply -k delivery/kubernetes/overlays/local

.PHONY: k8s-status
k8s-status:
  kubectl get all -n portfolio-app-local

.PHONE: k8s-status-pods
k8s-status-pods:
  kubectl get pods -n portfolio-app-local

.PHONE: k8s-delete-all
k8s-delete-all:
  // highlight-next-line
  kubectl delete -k delivery/kubernetes/overlays/local

.PHONY: k8s-expose-service
k8s-expose-service:
  minikube service frontend-nginx-service --url -n portfolio-app-local 

.PHONY: k8s-ingress
k8s-ingress:
  minikube addons enable ingress && minikube tunnel

.PHONY: k8s-dashboard
k8s-dashboard:
  minikube dashboard
```
