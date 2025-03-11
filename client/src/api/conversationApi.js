import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL; 


export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const getAllConversations = async () => {
    try {
        const response = await API.get("/conversation/get");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
