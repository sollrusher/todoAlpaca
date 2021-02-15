import React, { Component } from "react";
import './registerPage.css'
import api from "./utils/api";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    if (event.key == 'Enter' && this.state.login !== '') {

      const { login, password } = this.state
      const data = await api.post('/signup', {login, password})
      console.log(data.data.id)
    }
  };

  render() {
    return (
      <section className="register">
          <h2>Регистрация</h2>
        <div className="register__inputs">
        <p>
            Логин:
            <input
              type="text"
              name="login"
              value={this.state.login}
              onChange={this.handleInputChange}
              onKeyPress={this.handleSubmit}
            />
          </p>
          <p>
            Пароль:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              onKeyPress={this.handleSubmit}
            />
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
