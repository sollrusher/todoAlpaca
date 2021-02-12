import React, { Component } from "react";
import './registerPage.css'

export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="register">
          <h2>Регистрация</h2>
        <div className="register__inputs">
          <p>
            Логин: <input type="text"></input>
          </p>
          <p>
            Пароль: <input type="password"></input>
          </p>
        </div>
        <div className="register__buttons">
            <input type="button" value="Войти"></input>
            <input type="button" value="Зарегистрироваться"></input>
        </div>
      </section>
    );
  }
}
