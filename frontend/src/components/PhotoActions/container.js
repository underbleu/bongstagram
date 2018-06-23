import React, { Component } from "react";
import PropTypes from 'prop-types';
import PhotoActions from "./presenter";

class Container extends Component {
  
  static propTypes = {
    username: PropTypes.string.isRequired
  };
  
  render() {
    return <PhotoActions {...this.props} />;
  }
}

export default Container;