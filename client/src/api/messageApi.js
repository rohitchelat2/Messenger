import API from "./api";

export const getMessages = async () => {
    try {
        const response = await API.get(`/message/get`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch messages";
    }
};





export const sendMessage = async (input) => {
    try {
        const response = await API.post(`/message/send`, {message: input});
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch messages";
    }
};