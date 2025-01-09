import http from "../utils/http";
const googleAuth = async (url, data) => {
    const response = await http.post(url, data);
    return response.data;
}

const loginForm = async (url,data) => {
    const response = await http.post(url, data);
    return response.data;
}

export {
    googleAuth,
    loginForm
}