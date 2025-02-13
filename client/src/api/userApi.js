import API from "./api";

export const login = async (email, password) => {
   console.log(email,password)
    try {
        const response = await API.post(`/login`, { email, password });
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

