import axios from "axios";


export const axiosInstance =  axios.create({
    baseURL: 'https://test-back-ucrz.onrender.com/'
})