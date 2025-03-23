import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000/api/';

export const axiosInstance = axios.create({
    baseURL:API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.header.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
