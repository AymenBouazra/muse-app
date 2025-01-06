import axios from "axios";

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "3935b45602a54e64a63375810d0c717d";
const redirectUri = "http://localhost:5173";

const scopes = ['user-read-private', 'user-library-read','user-modify-playback-state'];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1'
})

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

export default apiClient