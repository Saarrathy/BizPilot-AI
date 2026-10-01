import axios from "axios";


const api = axios.create({

    baseURL: "http://127.0.0.1:8000",

});



// Attach JWT token automatically to every request

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");


        console.log("================================");
        console.log("TOKEN FROM STORAGE:", token);


        if (token) {

            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        console.log("AUTH HEADER:", config.headers.Authorization);
        console.log("================================");


        return config;

    },


    (error) => {

        return Promise.reject(error);

    }

);



// Handle unauthorized response globally

api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {

        if (error.response?.status === 401) {

            console.log("401 Unauthorized - Token problem");

            // Optional logout
            // localStorage.removeItem("token");

        }


        return Promise.reject(error);

    }

);



export default api;