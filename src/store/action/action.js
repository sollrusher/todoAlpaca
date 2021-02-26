import { LOGIN_USER, INIT_USER, LOGOUT_USER } from './action-type';

export const loginUser = (login, password) => ({
  type: LOGIN_USER,
  login,
  password
});

export const initUser = () => ({
  type: INIT_USER,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});