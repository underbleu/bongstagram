import React, { Component } from "react";
import PropTypes from "prop-types";
import UploadPhoto from "./presenter";

const web3 = window.web3;

class Container extends Component {
  state = {
    file: "",
    fileName: "Choose a photo to upload...",
    location: "",
    caption: "",
    gas: "5",
    dollar: "0.045",
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
    this.setState({ 
      file: files[0],
      fileName: files[0].name
    });
  }
  
  _handleSubmit = event => {
    const { file, location, caption, gas } = this.state;
    const gasPrice = web3.toWei(gas, 'gwei');
    const { uploadPhoto } = this.props;
    event.preventDefault();
    uploadPhoto(file, location, caption, gasPrice);
    this.setState({
      file: "",
      location: "",
      caption: "",
      gas: "5",
      dollar: gas * 0.009,
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