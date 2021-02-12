import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Auth from "./authPage";
import "./app.css";
import Register from "./registerPage";
import TodoList from "./todoList";

function App() {
  return (

    <Router className="app">
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
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/todolist">
            <TodoList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
