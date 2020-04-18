import { api_hostname , token } from './auth.store';
import axios from "axios";

const GetAllMenuItems = async (token) => {
    const MenuItemsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menuitems/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await MenuItemsInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetAllMenuItemsByMenu = async (id) => {
    const MenuItemsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menuitems/`,
    });
    try {
        const response = await MenuItemsInstance.get(`/menu/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetMenuItemById = async (id) => {
    const MenuItemsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menuitems/${id}`,
    });
    try {
        const response = await MenuItemsInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const SaveMenuItem = async (token , id , MenuItem) => {
    const MenuItemsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menuitems/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        if(id != "new"){
            let Updated = {
                name: MenuItem.name,
                description: MenuItem.description,
                menuId:MenuItem.menuId,
                price:MenuItem.price,
            }
            const response = await MenuItemsInstance.patch(`/${id}` , Updated);
            return response;
        } else {
            const response = await MenuItemsInstance.post(`/` , MenuItem);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

const DeleteMenuItemById = async (token , id) => {
    const MenuItemsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/menuitems`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await MenuItemsInstance.delete(`/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



export { GetAllMenuItems , GetMenuItemById , SaveMenuItem , DeleteMenuItemById , GetAllMenuItemsByMenu}