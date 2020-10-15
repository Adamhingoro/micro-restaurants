# Micro Restaurants
[![Build Status](https://travis-ci.com/Adamhingoro/micro-restaurants.svg?branch=master)](https://travis-ci.com/Adamhingoro/micro-restaurants)

![Micro Restaurants](https://i.ibb.co/4pKwNM2/adamhingora-01.jpg)


Micro Restaurants is a multi-restaurant management system developed using the **Microservice Skeleton** which uses the
1. Typescript - for development.
2. Sequelize JS - for database and modeling
3. Hapi/Joi - for requests validation and model verification
4. Axios - for inter-communications and object requests
5. ExpressJs - for handling the http-calls, routing and controlling. 

[click here to learn more about Microservice skeleteon](https://github.com/Adamhingoro/microservice-skeleton)

The frontend of this system is based on [Svelte.](https://svelte.dev/) 

## Architecture is divided into 6 microservices. 
1. Frontend - Admin panel for the multi-restaurant management. [SVELTE]
2. Restaurant Front - Ordering and Restaurant listings for the customers [SVELTE]
3. Customers API - for handling all the customers calls. 
4. Orders API - for handling all the Orders and Orderitems calls. 
5. Restaurants API - for handling all the Restaurants, Menus and MenuItems calls. 
6. Users API - for handling all the Users and Authentication calls. 

## Restaurant Reverse Proxy
All the requests are called upon the restaurant-reverse-proxy which handles all the routing between the microservices. it can be found on `./deployment/docker/`. I have used Nginx as a reverse proxy and the configuration can be found on `./deployment/docker/nginx.conf`

## Frontend 
for serving the static content I have used Nginx http server. both of the svelte parts are build and then packaged into the docker container. so before running the `docker_build` command you must run the `npm run build` in both of the svelte apps. so it would generate the distributable for the docker. 

## Docker Images

https://hub.docker.com/repository/docker/adamhingoro/restaurant-reverseproxy
https://hub.docker.com/repository/docker/adamhingoro/microservice-restaurant-front
https://hub.docker.com/repository/docker/adamhingoro/microservicefrontend
https://hub.docker.com/repository/docker/adamhingoro/restaurant-microservice-users-api
https://hub.docker.com/repository/docker/adamhingoro/restaurant-microservice-restaurants-api
https://hub.docker.com/repository/docker/adamhingoro/restaurant-microservice-orders-api
https://hub.docker.com/repository/docker/adamhingoro/restaurant-microservice-customers-api

## Setup 
1. run `./install` and if you find any security issues or if you want to udpate the packages then you can run `./update`.

2. configure the envoriment variables for docker in `./deployment/docker/docker-compose-build.yaml`
    you can set different database for each service or you can use one database for all of the services. 
    make sure to use same `JWT_SECRET` because the user token will be verified on all of the services. 
    
3. run the files `./docker_build` and then `./docker_run`

## for deployment on kubernetes 

use the directory `./deployment/k8s/`

before loading any files to the kubernetes make sure to configure the envoriment variables in `env-secret.yaml` and `env-configmap.yaml`

## Running the Application
once you deploy the application you can access the frontend : http://[your-reverse-proxy-address]:8100/admin/ for admin and http://[your-reverse-proxy-address]:8100/front/ for ordering and viewing the menu. 

## Default Admin credentails
```` 
email : adam@gmail.com
password : computer
````
you can change this in file `microservice-users-api/src/index.ts`

## Testing 
All the API's services have configured `chai` and `mocha`. currently there are no tests availible but in future we will have tests for each service.
All the tests can be found on `[API's-services]/src/tests/` directory. 

## Kubernetes Deployment
this application is completely containerized and tested kubernetes deployments on GCD, AWS and okteto. 
All the k8s configurations can be found in `./deployments/k8s/`

**Before deployment** please configure your local kubernetes as per platform and set the envoriment credentails in `env-configmaps`

then simply run 
````bash
chmod +x ./kubectl_deploy # execute permission
./kubectl_deploy
````
 JUST IN CASE IF ANYTHING GOES WRONG
 ````bash
chmod +x ./kubectl_rest # execute permission
./kubectl_rest
````
this will delete all the configuration in your kubernetes cluster - please use this with cautious. 

**Kubernetes CI/CD** using travis and okteto. [click here](https://github.com/Adamhingoro/okteto-kubernetes-cd) to read on how I setup the complete CI/CD pipeline with just few easy steps. 

## RESTf'ul Structure
All the services follow the restful structure as shown in the diagram below to keep things understandable and manageable however we did created some other endpoints which are required for the business logic.
[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbkFbUmVxdWVzdF0gLS0-IEIoKEV4cHJlc3M8YnIgLz5Sb3V0ZXIpKVxuQiAtLSBHRVQgL29iamVjdHMgIC0tPiAgQ1tSZXR1cm5zIGFsbCBvYmplY3RzXVxuQiAtLSBHRVQgL29iamVjdHMvOmlkICAtLT4gIERbUmV0dXJucyBvYmplY3Qgd2l0aCBpZCA9IDppZF1cbkIgLS0gUE9TVCAvb2JqZWN0cyAgLS0-ICBFW0NyZWF0ZXMgYSBuZXcgb2JqZWN0XVxuQiAtLSBQQVRDSCAvb2JqZWN0cy86aWQgIC0tPiAgRltVcGRhdGVzIGEgb2JqZWN0XVxuQiAtLSBERUxFVEUgL29iamVjdHMvOmlkICAtLT4gIEdbRGVsZXRlcyBhIG9iamVjdF1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkFbUmVxdWVzdF0gLS0-IEIoKEV4cHJlc3M8YnIgLz5Sb3V0ZXIpKVxuQiAtLSBHRVQgL29iamVjdHMgIC0tPiAgQ1tSZXR1cm5zIGFsbCBvYmplY3RzXVxuQiAtLSBHRVQgL29iamVjdHMvOmlkICAtLT4gIERbUmV0dXJucyBvYmplY3Qgd2l0aCBpZCA9IDppZF1cbkIgLS0gUE9TVCAvb2JqZWN0cyAgLS0-ICBFW0NyZWF0ZXMgYSBuZXcgb2JqZWN0XVxuQiAtLSBQQVRDSCAvb2JqZWN0cy86aWQgIC0tPiAgRltVcGRhdGVzIGEgb2JqZWN0XVxuQiAtLSBERUxFVEUgL29iamVjdHMvOmlkICAtLT4gIEdbRGVsZXRlcyBhIG9iamVjdF1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


## Customer API Service
 It handles all the customer data and it verifies the data with the orders service. Please do check the detailed information about this service. 
 [READ MORE](https://github.com/Adamhingoro/micro-restaurants/tree/master/microservice-customers-api)

## Users API Service
 It handles all the users data and its relation to the restaurant. It also handles the authentication and generates a JSON-WEB-TOKEN for the frontend. the token is signed with a secret which is shared amoung all the services. by using shared token all services are able to verify the user without hitting the users micro-service ever again.
 [READ MORE](https://github.com/Adamhingoro/micro-restaurants/tree/master/microservice-users-api)

 ## Restaurant API Service
 It handles all the restaurants, their menus and menuItems. It is like a catalog service for the restaurants. this service has a lot of endpoints and it does use object-requester to fetch the user. 
 [READ MORE](https://github.com/Adamhingoro/micro-restaurants/tree/master/microservice-restaurants-api)

 ## Orders API Service
 It handles all the orders and their items. this service also uses the object-requester to fetch the menuitems for prices. currently the order procedure is little rough and it has few loop-holes which I am planning to fix in the future. 
 [READ MORE](https://github.com/Adamhingoro/micro-restaurants/tree/master/microservice-orders-api) 


## UML Diagram 
[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbkFbSW50ZXJuZXRdIC0tPiBCW2t1YmVybmV0ZXMgY2x1c3Rlcl1cbkIgLS0-IEMoKHJldmVyc2UtcHJveHkpKVxuQyAtLSAvZnJvbnQgLS0-IERbU3ZlbHRlIEZyb250ZW5kXVxuQyAtLSAvYWRtaW4gLS0-IEVbU3ZlbHRlIEFkbWluLXBhbmVsXVxuQyAtLSAvdXNlcnMgLS0-IEZbU2VydmljZSBmb3IgVVNFUlNdXG5GIC0tPiBLKChBdXRoZW50aWNhdGlvbikpXG5DIC0tIC9yZXN0YXVyYW50cyAtLT4gR1xuQyAtLSAvbWVudXMgLS0-IEdcbkMgLS0gL21lbnVpdGVtcyAtLT4gR1tTZXJ2aWNlIGZvciBSRVNUQVVSQU5UUyBhbmQgaXRzIGNoaWxkcmVuc11cbkcgLS0gSW1hZ2UgVXBsb2FkcyAtLT5MKChBbWF6b25lIFMzKSlcbkMgLS0gL29yZGVycyAtLT4gSVtTZXJ2aWNlIGZvciBPUkRFUlNdXG5DIC0tIC9jdXN0b21lcnMgLS0-IEpbU2VydmljZSBmb3IgQ1VTVE9NRVJTXSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkFbSW50ZXJuZXRdIC0tPiBCW2t1YmVybmV0ZXMgY2x1c3Rlcl1cbkIgLS0-IEMoKHJldmVyc2UtcHJveHkpKVxuQyAtLSAvZnJvbnQgLS0-IERbU3ZlbHRlIEZyb250ZW5kXVxuQyAtLSAvYWRtaW4gLS0-IEVbU3ZlbHRlIEFkbWluLXBhbmVsXVxuQyAtLSAvdXNlcnMgLS0-IEZbU2VydmljZSBmb3IgVVNFUlNdXG5GIC0tPiBLKChBdXRoZW50aWNhdGlvbikpXG5DIC0tIC9yZXN0YXVyYW50cyAtLT4gR1xuQyAtLSAvbWVudXMgLS0-IEdcbkMgLS0gL21lbnVpdGVtcyAtLT4gR1tTZXJ2aWNlIGZvciBSRVNUQVVSQU5UUyBhbmQgaXRzIGNoaWxkcmVuc11cbkcgLS0gSW1hZ2UgVXBsb2FkcyAtLT5MKChBbWF6b25lIFMzKSlcbkMgLS0gL29yZGVycyAtLT4gSVtTZXJ2aWNlIGZvciBPUkRFUlNdXG5DIC0tIC9jdXN0b21lcnMgLS0-IEpbU2VydmljZSBmb3IgQ1VTVE9NRVJTXSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

# Issues, Bugs and Reqeusts
Please I highly encourage you to submit any issue, bug or feature-request. I will try my full-best to make it posible. 


# Support
If you really think this is a good project. please dont just think. Let people know that this is the good project. :D


