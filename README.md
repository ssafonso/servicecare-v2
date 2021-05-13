# Service Care on Road | Sérgio Afonso

This project consists on the implementation of the Service Care challenge by VW, where ReactJS and Typescript was used for frontend, Spring Boot for the server side and PostGresSQL as the database to store the Truck data 

Prerequisites: 
* Docker 




## Getting Started
---

To run this project, simply run on git bash

```bash
sh start.sh
```

This command will build and start the 3 cointainers necessary to run the whole application: 
* postgres
* client (react)
* server (spring boot)

No need to perform any extra configurations to start using the application. To start using the application just access the url bellow after all services are up and running

```
http://localhost:3001/
```

The available licenses to search are 
* 88CB88
* 88CA88


## DB
---

The choosen DB for this project was postgres. Whenever you start the application, a pre-configurated sql script will populate the DB with some data in order to be able to test the aplication. 

Currently, the DB has information regarding two trucks, beeing in 2 different locations for testing purposes. 

![dbdata](https://github.com/ssafonso/servicecare-v2/blob/main/postgres/dbdata.PNG?raw=true "Optional Title")


## Server
---

The server was built on Spring Boot, using a model to map the DB data and a controller to allow acess to the data. Altough more methods were created, only one is currently being used by the frontend 

```java
findByLicenseOrderByTsDesc
```

All connections have been configured, being the db routing and the crossorigin so that the frontend is able to make the requests.

If one wants to make changes, to use it after, one must package first the applications and only then build and restart the containers.




## Client
---

The client was built on react, using typescript. In order to allow further developments, the following structure was built:

```text
+---assets              -> Contains all icons
+---components          -> Home of all components
|   \---map             -> Map component
+---pages               -> Home of all pages
|   \---MapPage         -> Map page
+---services            -> Home of all scripts to connect with the server
\---utils               -> Home of all the utilities necessary to run the app (for instance Google API scripts)
```

For the purpose of this challenge, a billing account on google was configurated in order to leverage all services from Google Maps API. Associated with that account, a credential was generated in order to use the API. This credential can be found under `client/src/env`. If necessary, one need only to change the credential in this file in order to use the Google Maps API. 
