import { api_hostname , token } from './auth.store';
import axios from "axios";

const GetAllMenus = async (token) => {
    const MenusInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menus/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await MenusInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetAllMenusByRestaurant = async (id) => {
    const MenusInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menus/`,
    });
    try {
        const response = await MenusInstance.get(`/restaurant/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetMenuById = async (token , id) => {
    const MenusInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menus/cantouch/${id}`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await MenusInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const SaveMenu = async (token , id , Menu) => {
    const MenusInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menus/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        if(id != "new"){
            let Updated = {
                name: Menu.name,
                description: Menu.description,
                restaurantId:Menu.restaurantId,
            }
            const response = await MenusInstance.patch(`/${id}` , Updated);
            return response;
        } else {
            const response = await MenusInstance.post(`/` , Menu);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

const DeleteMenuById = async (token , id) => {
    const MenusInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menus`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await MenusInstance.delete(`/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



export { GetAllMenus , GetMenuById , SaveMenu , DeleteMenuById , GetAllMenusByRestaurant }