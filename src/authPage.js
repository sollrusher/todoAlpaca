import React, { Component } from "react";
import './authPage.css'

export default class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="auth">
        <div className="auth__inputs">
          <p>
            Логин: <input type="text"></input>
          </p>
          <p>
            Пароль: <input type="password"></input>
          </p>
        </div>
        <div className="auth__buttons">
            <input type="button" value="Регистрация"></input>
            <input type="button" value="Войти"></input>
        </div>
      </section>
    );
  }
}
