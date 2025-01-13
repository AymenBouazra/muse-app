import axiosApiInstance from "../utils/http";
const googleAuth = async (url, data) => {
    const response = await axiosApiInstance.post(url, data);
    return response.data;
}

const loginForm = async (url,data) => {
    const response = await axiosApiInstance.post(url, data);
    return response.data;
}

const registerForm = async (url,data) => {
    const response = await axiosApiInstance.post(url, data);
    return response.data;
}

const logout = async (url) => {
    await axiosApiInstance.post(url);
}

export {
    googleAuth,
    loginForm,
    logout,
    registerForm
}