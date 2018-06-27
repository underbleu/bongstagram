import React, { Component } from "react";
import PropTypes from "prop-types";
import GasPrice from "./presenter";

class Container extends Component {
  state = {
    
  };

  static propTypes = {
  };

  render() {
    return <GasPrice {...this.state} {...this.props} />;
  }
}

export default Container;
