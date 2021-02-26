import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer';
import { initUser } from './action/action';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
if (store.getState().initialized) {
  store.dispatch(initUser());
}

export default store;