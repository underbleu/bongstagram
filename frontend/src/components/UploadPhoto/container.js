import React, { Component } from "react";
import PropTypes from "prop-types";
import UploadPhoto from "./presenter";

class Container extends Component {
  state = {
    file: "",
    location: "",
    caption: ""
  }
  
  static propTypes = {
    uploadPhoto: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <UploadPhoto 
        {...this.state}
        handleInputChange={this._handleInputChange}
        handleFileChange={this._handleFileChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }
  
  _handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  };
  
  _handleFileChange = event => {
    const { target: { files } } = event;
    // const data = files[0]
    this.setState({ file: files[0] });
  }
  
  _handleSubmit = event => {
    console.log("시작",this.state);
    const { file, location, caption } = this.state;
    event.preventDefault();
    const { uploadPhoto } = this.props;
    uploadPhoto(file, location, caption);
    console.log("끝",this.state);
  };
}

export default Container;