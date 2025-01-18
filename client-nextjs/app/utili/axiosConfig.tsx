
//packages
import axios from "axios";

//custome instance of axios
export const api = axios.create({
    baseURL : "https://unishop-backend.vercel.app/api",
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
      if (error.response?.status === 401) {
        // Handle unauthorized error
        // You might want to dispatch resetAuth() here
      }
      return Promise.reject(error);
    }
  );



