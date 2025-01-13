import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL
export const axiosApiInstance = axios.create({
    baseURL: BASE_URL + '/api/v1',
    headers: {
        "Content-type": "application/json"
    }
});

axiosApiInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem("token");
       
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
        return config;
    },
    error => {
        console.log(error);
        
        Promise.reject(error)
    });

export default axiosApiInstance;