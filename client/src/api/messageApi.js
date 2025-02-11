import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL; 


const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


export const getMessages = async () => {
    try {
        const response = await API.get(`/message/get`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch messages";
    }
};
