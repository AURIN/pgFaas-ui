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

#### Run local server

Watch the src files: ````yarn run build-dev```` <br>
Start the server:    ````yarn run start````

#### Build production and run production server

yarn run build <br>
NODE_ENV=production yarn run start

#### Configuration

Server configuration files reside in ````config/default.js```` <br>
Parameters that can be set :

##### ```` EXPRESS.PORT ````<br>

port express run ons

##### ```` EXPRESS.BIND_ADDRESS````

Ip address express binds to

##### ```` PGFAAS.URL_BASE ````

Location of the API server

## Changelog

