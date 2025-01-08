import axios from "axios";

const authEndpoint = 'http://www.last.fm/api/auth';
const clientId = "253108a551cb33c6d9cdc74f2d239d9e";
const redirectUri = "http://localhost:5173";


export const loginEndpoint = `${authEndpoint}?api_key=${clientId}&cb=${redirectUri}`;

const apiClientLastFM = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0/'
})

export const setClientToken = (token) => {
 apiClientLastFM.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

export default apiClientLastFM