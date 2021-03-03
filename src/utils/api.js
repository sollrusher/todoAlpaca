import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  responseType: 'json',
});

api.interceptors.request.use((config) => {
  const configure = config;
  let token = localStorage.getItem('token');
  if (token) {
    token = JSON.parse(token);
    configure.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
