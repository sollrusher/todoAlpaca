import React, { Component } from "react";
import './authPage.css'

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    // handleEnter = (e) => {
  // const re= /\S+@\S+\.\S+/;
  // if(!re.test(value)){
  //   return
  // }
  // }

  render() {
    return (
      <section className="auth">
        <div className="auth__inputs">
          <p>
            Логин: <input type="text" name='login' value={this.state.login} onChange={this.handleInputChange}/>
          </p>
          <p>
            Пароль: <input type="password" name='password' value={this.state.password} onChange={this.handleInputChange}/>
          </p>
        </div>
        <div className="auth__buttons">
            {/* <input type="button" value="Регистрация"></input> */}
            <input type="button" value="Войти"/>
        </div>
      </section>
    );
  }
}
