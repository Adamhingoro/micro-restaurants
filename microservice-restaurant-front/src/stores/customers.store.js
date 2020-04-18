import { writable } from 'svelte/store';
import { api_hostname } from './auth.store';
import axios from "axios";

const Customer = writable(JSON.parse(localStorage.getItem("MCCUSTOMER")) || []);


const UpdatedStore = (store) => {
    localStorage.setItem("MCCUSTOMER", JSON.stringify(store));
}

const RegisterCustomer = async ( CustomerObject ) => {
    const CustomerInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/customers`,
        timeout: 10000,
    });
    try {
        let NewCustomerObject = {
            fullName: CustomerObject.fullName,
            email: CustomerObject.email,
            address: CustomerObject.address,
            city: CustomerObject.city,
            country: CustomerObject.country,
            state: CustomerObject.state,
        }
        const response = await CustomerInstance.post(`/` , NewCustomerObject);
        if(response.status === 201){
            console.log("Customer Registered");
            let SessionData = { ...response.data , registered:1};
            UpdatedStore(SessionData);
            return response;
        } else{
            console.log("Something went wrong");
        }
    } catch (error) {
        console.error(error);
    }
}


export { Customer , RegisterCustomer };