import React, { Component } from "react";
import Copyright from "./presenter";

class Container extends Component {
  state = {
    seeingCopyright: false
  };

  render() {
    return (
      <Copyright
        {...this.state}
        {...this.props}
        handleMouseOver={this._handleMouseOver}
        handleMouseLeave={this._handleMouseLeave}
      />
    );
  }

  _handleMouseOver = () => {
    this.setState({
      seeingCopyright: true
    });
  };

  _handleMouseLeave = () => {
    this.setState({
      seeingCopyright: false
    });
  };
}

export default Container;
