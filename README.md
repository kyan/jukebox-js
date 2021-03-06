![jukebox-build-and-test](https://github.com/kyan/jukebox-js/workflows/jukebox-build-and-test/badge.svg)

# Jukebox 2.0

An WebSocket/[Mopidy](https://github.com/mopidy) event powered JukeBox client and API

![](docs/jb1.png)

## Background

This is a work-in-progress replacement for our [existing office JukeBox](https://github.com/kyan/jukebox) that was started back on *9th Jan 2009*. That was/is a [Rails](https://github.com/rails) application with many moving parts and orginally connected to [MPD](https://github.com/MusicPlayerDaemon/MPD) directly via a socket. It has been through many modernising iterations, and now uses `Mopidy` but still has the moving parts and uses a socket connection (which now needs buffering). Things have moved fast in nearly 10 years, so it's time to make a fresh start using some new better fitting technologies.

## Overview

The Jukebox re-imagined still uses `Mopidy` but has been split into parts, Client and API. The API is written in [TypeScript](https://www.typescriptlang.org/) and the Client currently a mix of [JavaScript](https://www.javascript.com/) and TypeScript. It also uses smaller events messages passed back and forth over a websocket. Currently both the client and API live in this one repo, but in the future it will likely split into it's component parts.

## Why not use an existing Mopidy frontend

We have extra requirements for our office Jukebox to make it more interactive and office friendly, Mopidy just handles playing music. This projects adds some of these extra features:

* Information about who added a track to the playlist
* Ability for other users to rate the current track playling
* An auto track chooser that adds music when the playlist runs out
* Auto switch off
* Search for music ordered by previous vote popularity

## Requirements

A machine that can run `nodejs`, a `Google` account and a premium `Spotify` account.

```
$ git clone https://github.com/kyan/jukebox-js
$ cd jukebox-js
```

## Environment

Runing the app locally requires some enviroment variables in order to be able to connect to Spotify and also to allow user authentication with Google.

First, copy the [`.env.example`](.env.example) file into a new `.env` file and fill in the missing information. Links are provided in the file.

## Development

The app uses `make`, so if you run `make help` you will see all the commands you can run against the app with a simple explaination.

### Running the tests

There is currently 100% test coverage throughout the app as well as linting and prettier via ESLint.

Run all the tests for the Client and the API (This is what will be run on Github) using:
```
$ make test
```

Run just the tests for the client using:
```
$ make client-test
```

Run just the tests for the api using:
```
$ make api-test
```

You can also run:
```
$ make api-client
$ make api-console
```
If you just want a console that you can run commands yourself.

### Running the app

There are two ways to run the app in `Docker`. You either run it using a Docker version of Mopidy. You don't get any sound but it's by far the easiest way. You just need to run:

```
$ make build-all
$ make serve-all
```

or you can run it using Mopidy running somewhere else. In this case you will need to change the `WS_MOPIDY_URL` to point to your own running version. You can then start things with:

```
$ make build
$ make serve
```

Either way. this will give you a working client and API plus the persistence layer. The client is available
at http://localhost:3001 running in dev mode, meaning any changes will cause the server to restart.


### Mopidy

If you so want to run your own version of Mopidy for running in production, you can buy yourself a Raspberry Pi and follow [these instructions](docs/mopidy_install.md).

### Client

A ReactJS application that communicates with the JukeBox API.

### API

A NodeJS + Express application written in TypeScript that communicates with `Mongodb` and the `Mopidy` Websocket interface.

##### TypeScript

In order to use Intellisense and TypeChecking in VSCode you will need to connect VSCode to the source running in the container as that's where all the node modules are installed. To do this you need to have the `VSCode Remote - Containers` extension installed.

You can do this in various ways. Either whilst you're serving the app locally, or just via having the `*-console` script running. You run `Remote Containers - Attach to running container...` and choose the jukebox container that you started and want to connect to. This should then start a new window connecting to the container where you can edit your code. You should now get all the Intellisense and TypeChecking working in that window.

Once you have done this once, the next time when you start the container, you should see an entry in the `Remote Exporer` containers section where you can attach again from there. You can also edit the configuration so you can install in extension you want when you are editing.

### MongoDB

The API used `Mongodb` for it's perisistence layer. In development it will fire up a docker container running `Mongodb` and will point the API at it.

### Adding a new package to `package.json`

The easiest way to do this is using `make api-console` or `make client-console`

Once you have a command line you can just run `$ npm install <package>`. This will install the package and update the `package.*` files. You will be able to continue development. When you shutdown the container though the package will be missing. You need to re-build the image to make it available. So remember to run `make build-all` when you start up next time.

## Deployment

Deployment requires a couple of npm's to be installed on your local machine.
```
$ npm install -g gh-pages
$ npm install -g shipit-cli
$ npm install -g shipit-deploy
```

### client

To push out a new release of the [client](frontend/) you first need just need to run:
```
$ ./scripts/deploy-client
```
This will create a `build` directory in your local `frontend` folder and then push it to Github (where the frontend is hosted). You may have to wait a min for things to propergate, but you should now have pushed a new release. You can check at https://github.com/kyan/jukebox-js/tree/gh-pages. There are ENVs you can update in the deploy scripts if you need to customise.

### api

To push out a new release of the [api](backend/) you need to run:
```
$ ./scripts/deploy-api
```
This will currently deploy a local branch named `release` so make sure it contains what you expect.

### mongodb

In production the api uses a EC2 server running mongodb and lives at `mongo.kyanmedia.net`.
