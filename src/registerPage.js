import React, { Component } from 'react';
import './registerPage.css';
import { register } from './utils/get-user';
import { connect } from 'react-redux';
import { loginUser } from './store/action/action';
import { Link } from 'react-router-dom';

const mapDispatchToProps = {
  loginUser,
};

class Register extends Component {
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
    if(value.length > 10) return
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    const { loginUser } = this.props;
    if (event.key == 'Enter' && this.state.login !== '') {
      const { login, password } = this.state;
      await register(login, password);
      loginUser(login, password);
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
        <div>
          <Link to="/">Уже зарегистрированы ?</Link>
        </div>
      </section>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);