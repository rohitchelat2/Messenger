import API from "./api";

export const getContacts = async () => {
    try {
        console.log("getContacts");
        const response = await API.get(`/contact/get`);
        
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch contacts";
    }
};
