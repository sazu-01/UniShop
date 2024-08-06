//packages
import axios from 'axios';

//custome instance of axios
export const api = axios.create({
    baseURL: 'http://localhost:4000/api',//set the base url for all request
    withCredentials: true, // To send cookies with requests
});


