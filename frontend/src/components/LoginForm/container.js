import React, { Component } from "react";
import PropTypes from 'prop-types';
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    walletAddress: this.props.walletAddress
  };

  static propTypes = {
    walletAddress: PropTypes.string,
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired
  };

  render() {
    const { username, password, walletAddress } = this.state;
    return (
      <LoginForm
        walletAddressValue={walletAddress}
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
      />
    );
  }
  _handleInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };

  _handleSubmit = event => {
    const { usernameLogin } = this.props;
    const { username, password } = this.state;
    event.preventDefault(); // form의 디폴트 이벤트 막기(username, password를 url에 표시하지 않도록)
    usernameLogin(username, password);
  };

  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;