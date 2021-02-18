import { LOGIN_USER, INIT_USER } from '../action/action-type';
import { loginUser } from '../action/action';
import store from '../store';
import { getUser, onLogin } from '../../utils/get-user';

const getInitialState = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      user: {
        login: '',
      },
      initialized: false,
    };
  }
  return {
    user: {
      login: '',
    },
    initialized: true,
  };
};

const login = (state = getInitialState(), action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log(state);
      const token = localStorage.getItem('token');
      return {
        ...state,
        user: {
          ...state.user,
          login: action.login,
        },
        initialized: token ? true : false,
      };
    case INIT_USER: {
      getUser().then((user) => {
        const { login } = user;
        console.log(login);
        store.dispatch(loginUser(login));
      });
      return state;
    }
    default:
      return state;
  }
};

export default login;
