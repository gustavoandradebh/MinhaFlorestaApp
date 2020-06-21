import axios from 'axios';

const api = axios.create({
    baseURL: 'https://minhaflorestaapi.azurewebsites.net/api/'
});

export default api;