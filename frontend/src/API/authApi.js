import http from "../utils/http";
const googleAuth = async (url, data) => {
    const response = await http.post(url, data);
    return response.data;
}

const loginForm = async (url,data) => {
    const response = await http.post(url, data);
    return response.data;
}

const registerForm = async (url,data) => {
    const response = await http.post(url, data);
    return response.data;
}

const logout = async (url) => {
    await http.post(url);
}

export {
    googleAuth,
    loginForm,
    logout,
    registerForm
}