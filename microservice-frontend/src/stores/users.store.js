import { writable } from 'svelte/store';
import { api_hostname , token } from './auth.store';
import axios from "axios";

const GetAllUsers = async (token) => {
    const UsersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/users/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await UsersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetUserById = async (token , id) => {
    const UsersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/users/${id}`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await UsersInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const SaveUser = async (token , id , user) => {
    const UsersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/users/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        if(id != "new"){
            const newUser = {
                fullName : user.fullName,
                email : user.email,
                ownership: user.ownership,
                type: user.type,
            }
            const response = await UsersInstance.patch(`/${id}` , newUser);
            return response;
        } else {
            const response = await UsersInstance.post(`/` , user);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

const DeleteUserById = async (token , id) => {
    const UsersInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/users`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await UsersInstance.delete(`/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



export { GetAllUsers , GetUserById , SaveUser , DeleteUserById}