import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL; 


export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const login = async (email, username, password) => {

    try {
        const response = await API.post(`/login`, { email, username, password });
        console.log(response)
        //localStorage.setItem("token", response.data.token); // Save token
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }


};

export const register = async (email, password) => {
    console.log(email,password)
     try {
         const response = await API.post(`/register`, { email, password });
         console.log(response.data)
         return response.data;
     } catch (error) {
         throw error.response?.data || "Login failed";
     }

};

