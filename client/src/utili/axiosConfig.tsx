//packages
import axios from 'axios';

interface ImportMetaEnv {
  readonly VITE_BASE_URL_PROD: string;
  readonly VITE_BASE_URL_DEV: string;
  readonly MODE: 'development' | 'production';
}


//custome instance of axios
export const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_PROD 
    : import.meta.env.VITE_BASE_URL_DEV,
    withCredentials: true, // To send cookies with requests
});


