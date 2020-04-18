import { api_hostname , token } from './auth.store';
import axios from "axios";

const GetAllRestaurants = async (token) => {
    const restaurantsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/restaurants/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await restaurantsInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetRestaurantById = async (id) => {
    const restaurantsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/restaurants/${id}`,
    });
    try {
        const response = await restaurantsInstance.get('/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const SaveRestaurant = async (token , id , restaurant) => {
    const restaurantsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/restaurants/`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        if(id != "new"){
            let Updated = {
                name: restaurant.name,
                address: restaurant.address,
                city:restaurant.city,
                country:restaurant.country,
                state:restaurant.state,
                cuisine:restaurant.cuisine,
            }
            const response = await restaurantsInstance.patch(`/${id}` , Updated);
            return response;
        } else {
            const response = await restaurantsInstance.post(`/` , restaurant);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

const DeleteRestaurantById = async (token , id) => {
    const restaurantsInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/restaurants`,
        headers: {'Authorization': `Token ${token}`}
    });
    try {
        const response = await restaurantsInstance.delete(`/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



export { GetAllRestaurants , GetRestaurantById , SaveRestaurant , DeleteRestaurantById}