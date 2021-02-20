import React, { Component } from 'react';
import { connect } from 'react-redux';
import './authPage.css';
import { onLogin } from './utils/get-user';
import { loginUser } from './store/action/action';
import { Link } from 'react-router-dom';

const mapDispatchToProps = {
  loginUser,
};

class Auth extends Component {
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
    
    if(/ /g.test(value) || value.length > 10) return
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    const { loginUser } = this.props;
    if (
      event.key == 'Enter' &&
      this.state.login !== '' &&
      this.state.login.length < 20 &&
      this.state.password !== '' &&
      this.state.password.length < 20
    ) {
      const { login, password } = this.state;
      await onLogin(login, password);
      loginUser(login, password);
    }
  };

  render() {
    console.log(process.env.DATABASE_URL)
    return (
      <section className="auth">
        <div className="auth__inputs">
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
        <div className="auth__buttons">
          <Link to="/register">Регистрация</Link>
        </div>
      </section>
    );
  }
}

export default connect(null, mapDispatchToProps)(Auth);