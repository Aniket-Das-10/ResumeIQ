import axios from "axios";
import API_BASE_URL from "../../config/api.config";

const API_URL = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`,
    withCredentials: true,  
});

export const register = async (name, email, password) => {
    try {
        const response = await API_URL.post(`/register`, { userName: name, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const login = async (email, password) => {
    try {
        const response = await API_URL.post(`/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const logout = async () => {
    try {
        const response = await API_URL.post(`/logout`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const getme = async () => {
    try {
        const response = await API_URL.get(`/get-me`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const verifyOtp = async (email, otp) => {
    try {
        const response = await API_URL.post(`/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const resendOtp = async (email) => {
    try {
        const response = await API_URL.post(`/resend-otp`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};
