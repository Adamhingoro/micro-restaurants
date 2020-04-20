import { writable } from 'svelte/store';
import axios from "axios";
import { navigate } from "svelte-routing";

const authorized = writable(localStorage.getItem("AUTHORIZED") || false);
const api_hostname = "https://restaurant-reverseproxy-adamhingoro.cloud.okteto.net";

const user = writable(JSON.parse(localStorage.getItem("AUTH_USER")) || []);
const UpdateUserStore = (store) => {
    localStorage.setItem("AUTH_USER", JSON.stringify(store));
}

const token = writable(JSON.parse(localStorage.getItem("AUTH_TOKEN")) || []);
const UpdateTokenStore = (store) => {
    localStorage.setItem("AUTH_TOKEN", JSON.stringify(store));
}

const UpdateAuthrorizedStore = (store) => {
    localStorage.setItem("AUTHORIZED", store);
}

const LogoutUser = () => {
    user.set(null);
    token.set(null);
    authorized.set(null);
    localStorage.removeItem("AUTH_USER");
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("AUTHORIZED");
}

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
        UpdateTokenStore(usertoken);
        UpdateUserStore(userdetails);
        UpdateAuthrorizedStore(true);
        console.log("Token received " , usertoken);
        console.log("User details" , userdetails);
    })
    .catch(function (error) {
        if(error){
            alert("Sorry invalid email or password");
            console.log(error);
        } else {
            navigate("/admin", { replace: true });
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

const putImageToAWS = async (file , signedUrl , ProgressCallback) => {
    try {
        var options = {
            headers: {
              'Content-Type': file.type
            },
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted ,progressEvent.loaded  ,  progressEvent.total);
                ProgressCallback(percentCompleted);
            }
        };
        return axios.put(signedUrl, file, options);
    } catch (error) {
        console.error(error);
    }
}

export { user , token , authorized , AuthenticateHandle , putImageToAWS , GetAllUsers , api_hostname , LogoutUser}