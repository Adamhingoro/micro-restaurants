# Adminpanel - Frontend - Svelte

This is the admin panel for the micro-restaurants. it is designed using bootstrap-4. currently I have used the CDN URL's for the project. 

It uses Axios for making API's calls with other microservices. 

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Microservice Build 
I have used `nginx:mainline-alpine` as a http server to serve the svelt build. One more thing I have configured is the SPA nature of the nginx. 

3 things are done to make it work as expected. 
1. Redirect all the trafic to a single html page
2. Redirect all other traffic to /admin 
3. GZIP's and other caching mechanisms for performance


# Note

before building the docker image you must run 
````bash
npm run build
````
becuase the docker is configured to put the `./public/` inside the container. 

We can build and deploy inside the container but I tested it and the size of the container-image was much bigger than the current. So I stick with this approach. 

## Docker build 
Use the command below to build using docker. 
````bash
docker build --tag [your-username]/microservice-frontend:latest .
````

To run on docker simple execute 
````bash
docker run [your-username]/microservice-frontend:latest --publish 8080:8080
````

To push to the docker hub

````bash
docker push [your-username]/microservice-frontend:latest 
````

