import { writable } from 'svelte/store';
import { api_hostname , token } from './auth.store';
import axios from "axios";

const GetAllCustomers = async (token) => {
    const CustomersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/customers/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await CustomersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetCustomerById = async (token , id) => {
    const CustomersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/customers/${id}`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await CustomersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const SaveCustomer = async (token , id , Customer) => {
    const CustomersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/customers/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        if(id != "new"){
            const newCustomer = {
                fullName : Customer.fullName,
                email : Customer.email,
                ownership: Customer.ownership,
                type: Customer.type,
            }
            const response = await CustomersInstance.patch(`/${id}` , newCustomer);
            return response;
        } else {
            const response = await CustomersInstance.post(`/` , Customer);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

const DeleteCustomerById = async (token , id) => {
    const CustomersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/customers`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await CustomersInstance.delete(`/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



export { GetAllCustomers , GetCustomerById , SaveCustomer , DeleteCustomerById}