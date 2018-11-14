# pgFaas-Ui

Front-end interface for FaaS on PostGIS

## Table of Contents

* [Requiremets](#install)
* [Install](#install)
* [Usage](#usage)
* [Config](#config)
* [Changelog](#changelog)

## Requirements

* Node (8.11.3)
* Yarn (1.9.4)


## Install

yarn install <br>


## Usage

### Run local server

Watch the src files: ```yarn run build-dev```
Start the server:    ```yarn run start```


### Build production and run production server

```bash
  yarn run build <br>
  NODE_ENV=production yarn run start
```


### Configuration

Server configuration file resides in ````config/config.js```` 


## Building and deployment of a Docker image (optional)

Docker registry username and password can be set in the `secrets.sh` script,
which, for obvious reasons, is not push to the repository.

```bash
  export DOCKER_USERNAME="<docker registry username>"
  export DOCKER_PASSWORD="<docker registry password>"
```

```bash
  source ./configuration.sh; source ./secrets.sh
  docker build --tag ${DOCKER_REGISTRY}/pgfaas-api:${PGFAAS_UI_VERSION}\
    ./docker/pgfaas-ui
```

Push to registry:
```bash
  source ./configuration.sh; source ./secrets.sh
  docker login --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}
  docker push ${DOCKER_REGISTRY}/pgfaas-api:${PGFAAS_API_VERSION}
```

Create and run a Docker container (it relies on the pgFaas service):
```bash
  docker create\
    --env NODE_ENV=production\
    --env PGFAAS_API_URL='http://pgfaas.aurin.org.au'\
    --env BIND_ADDRESS='0.0.0.0'\
    --env EXPRESS_PORT=3020\
    --name pgfaas-ui\
    lmorandini/pgfaas-ui:latest
      
   docker start $(docker ps --quiet --all --filter name=pgfaas-ui)
   docker logs -f $(docker ps --quiet --filter name=pgfaas-ui)
```

To test it, just point your browser to: `http://172.17.0.3:3020/`
(provided the IP address of the Docker container is `172.17.0.3`.)

To deploy a sandbox version of the UI, `NODE_ENV` has to be set to `sandbox`.




