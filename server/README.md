# MentorCRM Server

This is a fully functioning server, with config and dotenv configured and connecting to a database as specified in the .env file

## The .env file

* DB_PROTOCOL=put the protocol here.  the whole system is set up to use MongoDB and mongoose,
but this can be changed easily
* DB_USERNAME=put your username here for accessing the database
* DB_PASSWORD=put your password here for accessing the database
* DB_URL=put the url here for accessing the database
* DB_PORT=put the port here for accessing the database
* DB_NAME=put the name of the database here
* APP_SECRET=put the secret here you wish to use for sessions
* PORT=put the port here for the app (ie, what port you will use to connect to it)
* APP_NAME=put the name you want displayed for your app here

## an example .env:
```
DB_PROTOCOL=mongodb
DB_USERNAME=admin
DB_PASSWORD=password
DB_URL=localhost
DB_PORT=27017
DB_NAME=database
APP_SECRET=alongstringofcharactersusuallyrandomlygenerated
PORT=32768
APP_NAME=your app name
```

by default, this boilerplate is set up for port 32768

## config/config.js

this file allows access to the environment variables.

to call to the variables you would use:

| config.js variable   | process.env variable    |
|----------------------|-------------------------|
| config.db.protocol   | process.env.DB_PROTOCOL |
| config.db.username   | process.env.DB_USERNAME |
| config.db.password   | process.env.DB_PASSWORD |
| config.db.url        | process.env.DB_URL      |
| config.db.port       | process.env.DB_PORT     |
| config.db.name       | process.env.DB_NAME     |
| config.sessionsecret | process.env.APP_SECRET  |
| config.port          | process.env.PORT        |
| config.appname       | process.env.APP_NAME    |

there is no specific need to set appname as an environment variable, but using this method means that you can edit one file, and within a few short moments have a working server in full from this boilerplate.

## NPM Scripts

there are four scripts:

`npm run testwatcher` will run full testing every time a file is altered, with coverage enabled

`npm run test` will run a one off full test with coverage enabled.

I have included tests for all the pre-written files, that offer coverage of 100% and pass of 100%

`npm run start` will start the server using standard Node

`npm run devstart` will run the server using NodeMon, so when files are changed the server will restart
