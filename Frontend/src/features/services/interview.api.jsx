import axios from "axios";

const API_URL = axios.create({
    baseURL: "http://localhost:5000/api/interview",
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
