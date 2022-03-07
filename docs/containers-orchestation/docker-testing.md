---
sidebar_position: 5
---

# Docker en Testing

![Docker testing](../../static/img/tutorial/container/2_container_test.svg)

## Arquitectura

```yaml title="docker.compose.test.yml"
version: '3.9'

services:

  node:
    build:
      context: .
      dockerfile: delivery/Dockerfile
    command: ["true"]
    restart: "no"
    environment:
      NODE_ENV: test
      SECRET: e42d8dd28adf34fc489044d5aa21e5166f22a6ef
      MONGODB_URI: mongodb://mongodb:27017/
      MONGODB_DB_MAIN: portfolio_db_test
      CI: true
      PORT: 4000
    networks:
      - mynet

  mongodb:
    container_name: mongodb
    image: mongo:latest
    restart: always
    environment:
        MONGO_INITDB_DATABASE: portfolio_db_test
    ports:
      - 27017
    volumes:
      - ./scripts/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - mynet


networks:
  mynet:
```

## Node build

```makefile title="Makefile"
.PHONY: docker-ci-up
docker-ci-up:
    $(DOCKER_COMPOSE_PROD) up --build -d

.PHONY: docker-ci-api
docker-ci-api:
    $(DOCKER_COMPOSE_TEST) run node npm run test
    $(DOCKER_COMPOSE_TEST) run node npm run lint
```
