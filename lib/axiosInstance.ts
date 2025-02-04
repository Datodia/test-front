import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://test-lect24.onrender.com',
});