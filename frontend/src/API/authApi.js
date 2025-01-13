import axios from "axios";
const googleAuth = async (url, data) => {
    const response = await axios.post(url, data);
    return response.data;
}

const loginForm = async (url,data) => {
    const response = await axios.post(url, data);
    return response.data;
}

const registerForm = async (url,data) => {
    const response = await axios.post(url, data);
    return response.data;
}

const logout = async (url) => {
    await axios.post(url);
}

export {
    googleAuth,
    loginForm,
    logout,
    registerForm
}