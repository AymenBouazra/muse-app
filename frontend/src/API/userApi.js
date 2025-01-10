import http from "../utils/http.js";


const editProfile = async (url, data) => { 
 const response = await http.put(url, data);
 return response.data;
}

const getUser = async (url) => {
 const response = await http.get(url);
 return response.data; 
}

export {
    editProfile,
    getUser
}
