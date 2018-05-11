import React, { Component } from "react";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: '',
    password: ''
  }
  
  render() {
    const { username, password } = this.state;
    return(
      <LoginForm 
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
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
    event.preventDefault(); // form의 디폴트 이벤트 막기(username, password를 url에 표시하지 않도록)
    console.log(this.state);
  }
}

export default Container;