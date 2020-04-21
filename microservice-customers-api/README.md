
# Restaurants Customers API
[![Build Status](https://travis-ci.com/Adamhingoro/micro-restaurants.svg?branch=master)](https://travis-ci.com/Adamhingoro/micro-restaurants)

## About This Service

Initially it was a monolith application and now it is divided into the smaller parts which can be deployed on docker or any kubernetes cluster. 

## Endpoints

 1. **GET** /customers/ 
 2. **GET** /customers/:id
 3. **POST** /customers/ 
 4. **PATCH** /customers/:id
 5. **DELETE** /customers/:id
REST'ful standards are followed with appropiate response codes. 

## Model
The application uses the `@hapi/joi` `ValidatedRequestSchema` and it expects the following object while creating and patching. 

    {
	    fullName: string,
	    email: string,
	    address: string,
	    city: string,
	    country: string,
	    state: string,
	}

## Steps for running locally 
1. cd [to this directory]
2. modify the `./src/config/config.ts`
    if you want to run locally I suggest you should use the local postgres database credentails in the `prod` or `dev`
3. modify the envoriment in file `./src/database/sequelize.ts` 
    use the `config.prod` or `config.dev` as per your needs. 
4. `npm install`
5. `npm run dev`

Application will run on port `8080`

## Steps for running on container

Please check the readme in the root direcory.

## Additional notes. 
1. it uses sequelize and creates tables based on the models defined in the `./src/models/`
2. You can use mysql for local as I have used. You have to change the dialect to `"mysql"` in file `./src/database/sequelize.ts` 
3. It uses `chai` and `mocha` for testing but for now I haven't created any tests yet. 

