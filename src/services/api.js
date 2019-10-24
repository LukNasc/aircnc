import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.124.158:3333' 
});

export default api;