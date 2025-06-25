import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://emoexplain.onrender.com/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;

