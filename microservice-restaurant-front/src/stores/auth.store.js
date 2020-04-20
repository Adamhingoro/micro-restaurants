import { writable } from 'svelte/store';
import axios from "axios";

const user = writable([]);
const token = writable([]);
const authorized = writable(false);
const api_hostname = "https://restaurant-reverseproxy-adamhingoro.cloud.okteto.net";

const AuthenticateHandle = (email , password) => {
    axios.post(`${api_hostname}/api/v0/users/auth/login`, {
        email: email,
        password: password
    })
    .then(function (response) {
        authorized.update((x) => true);
        const usertoken = response.data.token;
        const userdetails = response.data.user;
        user.update(x => userdetails);
        token.update(x => usertoken);
        console.log("Token received " , usertoken);
        console.log("User details" , userdetails);
    })
    .catch(function (error) {
        if(error){
            alert("Sorry invalid email or password");
            console.log(error);
        }
    });
}


const  GetAllUsers = async () => {
    axios.defaultConfig.headers.authorization = `Token ${token}`;
    await axios.get(`${api_hostname}/api/v0/users/`, {
    })
    .then(function async (response) {
        return response;
    })
    .catch(function (error) {
        if(error){
            alert("Sorry invalid email or password");
            console.log(error);
        }
    });
}

export { user , token , authorized , AuthenticateHandle , GetAllUsers , api_hostname}