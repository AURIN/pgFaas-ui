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

#### Run local dev server

Start the server:    ```` yarn run start ````

#### Run production server

NODE_ENV=production yarn run start

#### Build dist

The application can also be built to the dist folder if the user
wants to server the files a different way.

### Configuration

Server configuration file resides in ````config/default.js```` <br>
Parameters that can be set in the file. Alternatively set them <br>
in the environment, for example :  `EXPRESS_PORT=3000`

##### ```` EXPRESS.PORT ````<br>

port express runs on

##### ```` EXPRESS.BIND_ADDRESS````

Ip address express binds to

##### ```` PGFAAS.URL_BASE ````

Location of the API server

### Feature switches

The deletion of functions and namespaces can be switched by using the
env variable `DISABLE_DELETION=true` For example to start a production
server with deletion disabled

` DISABLE_DELETION=true EXPRESS_PORT=8000 NODE_ENV=production yarn run start `

## Changelog

