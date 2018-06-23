import React, { Component } from "react";
import PropTypes from "prop-types";
import UploadPhoto from "./presenter";

class Container extends Component {
  state = {
    file: "",
    location: "",
    caption: "",
    seeingUpload: false
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
        openUpload={this._openUpload}
        closeUpload={this._closeUpload}
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
    this.setState({ file: files[0] });
  }
  
  _handleSubmit = event => {
    const { file, location, caption } = this.state;
    const { uploadPhoto } = this.props;
    event.preventDefault();
    uploadPhoto(file, location, caption);
    this.setState({
      file: "",
      location: "",
      caption: "",
      seeingUpload: false
    });
  }
  
  _openUpload = () => {
    this.setState({
      ...this.state,
      seeingUpload: true
    })
  }
  
  _closeUpload = () => {
    this.setState({
      ...this.state,
      seeingUpload: false
    })
  }
}

export default Container;