import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL; 


export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const getContacts = async () => {
    try {
        console.log("getContacts");
        const response = await API.get(`/contact/get`);
        
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch contacts";
    }
};
