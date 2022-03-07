---
sidebar_position: 4
---

# Docker en Producción

![Docker en produccion](../../static/img/tutorial/container/0_container_pro.svg)

## Arquitectura

```yaml title="docker-compose.prod.yaml"
version: '3.9'

services:

  nginx:
    container_name: ui_nginx
    restart: always
    volumes:
      - ./ui/build:/usr/share/nginx/html
      # Uncomment for certbot
      #- ./data/nginx:/etc/nginx/conf.d
      # - ./data/certbot/conf:/etc/letsencrypt
      # - ./data/certbot/www:/var/www/certbot
    build:
      context: .
      dockerfile: nginx/Dockerfile
    ports:
      - 80:80
      - 443:443
    depends_on:
      - api
    networks:
      - mynet

  api:
    container_name: api_express
    build:
      context: ./api
      dockerfile: Dockerfile
    depends_on:
      - mongodb
    ports:
      - 4000
    restart: always
    environment:
      NODE_ENV: production
      SECRET: e42d8dd28adf34fc489044d5aa21e5166f22a6ef
      MONGODB_URI: mongodb://mongodb:27017/
      MONGODB_DB_MAIN: portfolio_db
      PORT: 4000
    networks:
      - mynet

  mongodb:
    container_name: mongodb
    image: mongo:latest
    restart: always
    environment:
        MONGO_INITDB_DATABASE: portfolio_db
    ports:
      - 27017
    volumes:
      - ./scripts/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - mynet


networks:
  mynet:
```

## Proxy Inverso

![reverse proxy](../../static/img/tutorial/container/3_forward_proxy.png)

```dockerfile title="nginx/Dockerfile"
FROM node:17-alpine3.14 AS builder
WORKDIR /usr/src/app
RUN npm install react-scripts@4.0.3 -g
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
# Copy custom nginx config
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Copy certificates
COPY ./nginx/certificates/ /var/certificates
# Copy deployment
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
```

```nginx title="nginx/nginx.conf"
worker_processes 1;

events {
    worker_connections 1024;
}

http {

    include mime.types;
    sendfile on;

    gzip on;
    gzip_http_version 1.0;
    gzip_proxied any;
    gzip_min_length 500;
    gzip_disable "MSIE [1-6]\.";
    gzip_types text/plain text/xml text/css
    text/comma-separated-values
    text/javascript
    application/x-javascript
    application/atom+xml;

    # Configuration for the server
    server {
        listen 443 default_server ssl;
        listen 80;
        listen [::]:80;
        #server_name example.org;
        ssl_certificate /var/certificates/localhost.crt;
        ssl_certificate_key /var/certificates/localhost.key;

        # Force https redirection
        # if ($scheme = http) {
        #     return 301 https://$server_name$request_uri;
        # }

        location / {
            root /usr/share/nginx/html;
            index index.html;
            expires -1;
            add_header Pragma "no-cache";
            add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";

            try_files $uri$args $uri$args/ $uri $uri/ /index.html =404;
        }

        location /v1 {
            proxy_pass http://api:4000;
            #proxy_set_header Host $host;
        }

        location /auth {
            proxy_pass http://api:4000;
            #proxy_set_header Host $host;
        }
    }

}
```

## Backend

```dockerfile title="api/prod.Dockerfile"
FROM node:17-alpine3.14 AS builder
WORKDIR /usr/src/app 
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install
COPY . .
RUN npm run build


FROM node:17-alpine3.14
WORKDIR /usr/src/app 
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install
COPY --from=builder /usr/src/app/build  ./build
CMD ["npm", "run", "start"];
```

La base de datos en mongo sigue teniendo el mismo comportamiento, inicializándose con los datos del script, aunque en esta ocasión por motivos de seguridad no dejamos expuesto el puerto `27017` dentro del host.
