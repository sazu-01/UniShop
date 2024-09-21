//packages
import axios from 'axios';

//custome instance of axios
export const api = axios.create({
    baseURL: 'https://unishop-server.onrender.com/api',//set the base url for all request
    withCredentials: true, // To send cookies with requests
});


