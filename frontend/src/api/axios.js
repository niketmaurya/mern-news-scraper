import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
    const storedUser = localStorage.getItem("user");
    const token = storedUser
        ? JSON.parse(storedUser).token
        : null;

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;