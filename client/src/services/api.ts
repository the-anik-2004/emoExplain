import axios from 'axios';

const api = axios.create({
  baseURL: 'https://emoexplain.onrender.com/api',
  withCredentials: true, 
});

export default api;
