// axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

// Request Interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Always return the modified config
});

// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response; // Pass successful responses through
    },
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        return Promise.reject(error); // Pass errors to the caller
    }
);

export default axiosClient;