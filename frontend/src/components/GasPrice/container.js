import React, { Component } from "react";
import PropTypes from "prop-types";
import GasPrice from "./presenter";

class Container extends Component {
  state = {
    // speed: 5
  };

  static propTypes = {
    // gas: PropTypes.number.isRequired,
    handleInputChange : PropTypes.func.isRequired
  };

  render() {
    return (
      <GasPrice 
        gas={this.props.gas}
        handleInputChange={this.props.handleInputChange}
      />
    );
  }
  _handleChange = e => {
    this.setState({
      speed: e.target.value,
    });
    console.log(this.state)
  }
}

export default Container;
