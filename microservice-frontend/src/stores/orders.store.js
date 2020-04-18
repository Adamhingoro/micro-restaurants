import { writable } from 'svelte/store';
import { api_hostname , token } from './auth.store';
import axios from "axios";





const GetAllOrders = async (token) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await OrdersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetOrderStatuses = async (token) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await OrdersInstance.get('/statuses');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetOrderById = async (token , id) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders/${id}`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await OrdersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetOrderItemsByOrderId = async (token , id) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orderitems/order/${id}`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await OrdersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const SaveOrder = async (token , id , status) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        if(id != "new"){
            const newOrder = {
                fullName : Order.fullName,
                email : Order.email,
                ownership: Order.ownership,
                type: Order.type,
            }
            const response = await OrdersInstance.patch(`/${id}` , newOrder);
            return response;
        } else {
            const response = await OrdersInstance.post(`/` , Order);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}
const UpdateOrderStatus = async (token , id , status) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await OrdersInstance.patch(`/status/${id}/${status}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const DeleteOrderById = async (token , id) => {
    const OrdersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await OrdersInstance.delete(`/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



export { GetAllOrders , GetOrderById , SaveOrder , DeleteOrderById , GetOrderStatuses , GetOrderItemsByOrderId , UpdateOrderStatus}