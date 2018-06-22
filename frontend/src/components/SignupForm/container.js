import React, { Component } from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

class Container extends Component {
  state = {
    email: '',
    name: '',
    username: '',
    password: '',
    walletAddress: this.props.walletAddress
  }
  
  static propTypes = {
    walletAddress: PropTypes.string,
    facebookLogin: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  }
  
  render() {
    const { email, name, username, password, walletAddress } = this.state;
    console.log(this.props.walletAddress);
    return (
      <SignupForm 
        walletAddressValue={walletAddress}
        emailValue={email}
        nameValue={name}
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
      />
    );
  }
  
  _handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }
  
  _handleSubmit = event => {
    const { email, name, username, password } = this.state;
    const { createAccount } = this.props;
    event.preventDefault();
    createAccount(email, name, username, password);
  }
  
  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  }
}

export default Container;
