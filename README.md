# pgFaas-UI

Front-end interface for pgFaas


## Requirements
* Node (8.11.4)
* Yarn (1.9.4)


## Installation
```bash
  yarn install
```

## Usage

### Run dev server
```bash
  NODE_ENV=development yarn run start
```


### Run production server
```bash
  NODE_ENV=production yarn run start
```


#### Build dist
The application can also be built to the dist folder if the user
wants to server the files a different way.
```bash
  yarn run build-dev
```


## Configuration
Server configuration file resides in ````config/config.js````


## Building and deployment of a Docker image (optional)
Docker registry username and password can be set in the `secrets.sh` script,
which, for obvious reasons, is not pushed to the repository.

```bash
  export DOCKER_USERNAME="<docker registry username>"
  export DOCKER_PASSWORD="<docker registry password>"
```

```bash
  source ./configuration.sh
  docker build --tag ${DOCKER_REGISTRY}/pgfaas-ui:${PGFAAS_UI_VERSION}\
    ./docker/pgfaas-ui
```

Push to registry:
```bash
  source ./configuration.sh; source ./secrets.sh
  docker login --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}
  docker push ${DOCKER_REGISTRY}/pgfaas-ui:${PGFAAS_UI_VERSION}
```

Create and run a Docker container, by default the latest version. (It relies on the pgFaas service):
```bash
  docker create\
    --env NODE_ENV=production\
    --env PGFAAS_API_URL='http://pgfaas.aurin.org.au/api'\
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


## Feature switches

#### DISABLE_DELETE

The deletion of functions and namespaces can be switched by using the env variable `DISABLE_DELETE=true`
For example, to start a production server with deletion disabled:
```bash
  DISABLE_DELETE=true NODE_ENV=production yarn run start `
```

#### PROTECTED_NAMESPACE

Specify which namespaces are marked as protected. Functions within these namespaces won't have an update
option. For example:

```bash
  PROTECTED_NAMESPACE="[\"sample\"]" NODE_ENV=production yarn run start`
```

## Changelog
