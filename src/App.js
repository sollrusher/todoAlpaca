import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Auth from './authPage';
import './app.css';
import Register from './registerPage';
import TodoList from './todoList';
import PrivateRoute from './utils/privateRoute';
import { connect } from 'react-redux';
import { logoutUser } from './store/action/action';

const mapStateToProps = (store) => ({
  initialized: store.initialized,
  store,
});

const mapDispatchToProps = {
  logoutUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

function App(props) {
  const { initialized, logoutUser } = props;
  const classes = `logout ${initialized ? '' : 'off'}`;
  return (
    <Router>
      <input
        className={classes}
        type="button"
        value="Выйти"
        onClick={() => logoutUser()}
      />

      <div className="app">
        <Switch>
          <Route exact path="/">
            {initialized ? <Redirect to="/todolist" /> : <Auth />}
          </Route>
          <Route path="/register">
            {initialized ? <Redirect to="/todolist" /> : <Register />}
          </Route>
          <PrivateRoute path="/todolist" auth={initialized}>
            <TodoList />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default connector(App);
