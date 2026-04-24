import axios from "axios";

const API_URL = axios.create({
    baseURL: "http://localhost:5000/api/mock-interview",
    withCredentials: true,
});

export const startMockSession = async (reportId) => {
    try {
        const response = await API_URL.post("/start", { reportId });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const submitMockAnswer = async (data) => {
    try {
        const response = await API_URL.post("/submit", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const followUpMockChat = async (data) => {
    try {
        const response = await API_URL.post("/chat", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const completeMockSession = async (sessionId) => {
    try {
        const response = await API_URL.post(`/complete/${sessionId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const getMockHistory = async () => {
    try {
        const response = await API_URL.get("/history");
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};
