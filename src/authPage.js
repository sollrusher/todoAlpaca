import React, { Component } from 'react';
import { connect } from 'react-redux';
import './authPage.css';
import { onLogin } from './utils/get-user';
import { loginUser } from './store/action/action';

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

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    const { loginUser } = this.props;
    if (event.key == 'Enter' && this.state.login !== '') {
      const { login, password } = this.state;
      await onLogin(login, password);
      loginUser(login, password);
    }
  };

  render() {
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
        <div className="auth__buttons"></div>
      </section>
    );
  }
}

export default connect(null, mapDispatchToProps)(Auth);