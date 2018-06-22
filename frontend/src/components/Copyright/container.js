import React, { Component } from "react";
import PropTypes from "prop-types";
import Copyright from "./presenter";

class Container extends Component {
  state = {
    seeingCopyright: false
  };

  static propTypes = {
    // getFeed: PropTypes.func.isRequired
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
    console.log("마우스들어와");
    this.setState({
      seeingCopyright: true
    });
  };

  _handleMouseLeave = () => {
    console.log("마우스나가");
    this.setState({
      seeingCopyright: false
    });
  };
}

export default Container;
