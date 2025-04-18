// src/api/apiClient.ts
import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // to include cookies for authentication
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
