import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL; 


export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const login = async (email, password) => {

    try {
        const response = await API.post(`/login`, { email, password });
        
        //localStorage.setItem("token", response.data.token); // Save token
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }


};

export const register = async (email, username, password) => {

     try {
         const response = await API.post(`/register`, { email, username,password });
         
         return response.data;
     } catch (error) {
         throw error.response?.data || "Login failed";
     }

};



export const logout = async () => {
   
     try {
         const response = await API.get(`/logout`);
         
         return response.data;
     } catch (error) {
         throw error.response?.data || "Logout failed";
     }

};
