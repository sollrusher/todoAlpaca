import api from './api';

export async function register(login, password) {
  const token = await api.post('/signup', { login, password });
  localStorage.setItem('token', JSON.stringify(token.data.token));
}

export async function onLogin(login, password) {
  const token = await api.post('/login', { login, password });
  localStorage.setItem('token', JSON.stringify(token.data.token));
}
