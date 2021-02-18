import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Auth from "./authPage";
import "./app.css";
import Register from "./registerPage";
import TodoList from "./todoList";
import PrivateRoute from './utils/privateRoute';
import { connect } from "react-redux";

const mapStateToProps = (store) => ({
  initialized: store.initialized,
  store,
});

const connector = connect(mapStateToProps);

function App(props) {
  const { initialized } = props;

  console.log(initialized);
  
  return (
    <Router >
      <ul>
        <li>
          <Link to="/">Войти</Link>
        </li>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
        <li>
          <Link to="/todolist">ToDo List</Link>
        </li>
      </ul>
      <div className="app">
        <Switch >
          <Route exact path="/">
            {initialized ? <Redirect to="/todolist" /> : <Auth />}
          </Route>
          <Route path="/register">
          {initialized ? <Redirect to="/todolist" /> : <Register/>}
          </Route>
          <PrivateRoute path="/todolist" auth={initialized}>
            <TodoList/>
          </PrivateRoute>
        </Switch>
        </div>
    </Router>
  );
}

export default connector(App);