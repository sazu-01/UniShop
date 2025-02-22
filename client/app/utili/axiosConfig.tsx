
//packages
import axios from "axios";

//custome instance of axios
export const api = axios.create({
    baseURL : "http://unishop-backend.vercel.app/api",
    withCredentials: true, // To send cookies with requests
    headers : {
        "Content-Type" : "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
      // You might want to add any default headers here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 422) {
        localStorage.removeItem("isLoggedIn");
        window.location.href = '/register';
      }
      return Promise.reject(error);
    }
  );



