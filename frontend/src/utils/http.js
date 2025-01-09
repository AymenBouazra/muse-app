import axios from "axios";
import { getCookie } from './cookies'

const BASE_URL = import.meta.env.VITE_BACKEND_URL
const axiosApiInstance = axios.create({
    baseURL: BASE_URL + '/api/v1',
    headers: {
        "Content-type": "application/json"
    }
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        const token = getCookie("token");

        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default axiosApiInstance;