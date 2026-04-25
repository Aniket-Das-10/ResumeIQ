import axios from "axios";
import API_BASE_URL from "../../config/api.config";

const API_URL = axios.create({
    baseURL: `${API_BASE_URL}/api/interview`,
    withCredentials: true,
});

export const generateInterview = async (resumeFile, selfDescription, jobDescription) => {
    try {
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("selfDescription", selfDescription);
        formData.append("jobDescription", jobDescription);

        const response = await API_URL.post("/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const getInterviewReport = async (id) => {
    try {
        const response = await API_URL.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};

export const getInterviewHistory = async () => {
    try {
        const response = await API_URL.get("/history");
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Network error" };
    }
};
