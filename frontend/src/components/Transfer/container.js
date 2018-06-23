import React, { Component } from "react";
import PropTypes from "prop-types";
import Transfer from "./presenter";

class Container extends Component {
  state = {
    address: '',
    gas: ''
  };

  static propTypes = {
    walletAddress: PropTypes.string,
    // photoToken: PropTypes.number,
    imageId: PropTypes.number.isRequired,
    closeTransfer: PropTypes.func.isRequired,
    transferCopyright: PropTypes.func.isRequired
  };

  render() {
    const { address, gas } = this.state;
    return (
      <Transfer
        {...this.props}
        addressValue={address}
        gasValue={gas}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
      />
    )
  }

  _handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  _handleSubmit = event => {
    const { address, gas } = this.state;
    const { photoToken, transferCopyright } = this.props;
    event.preventDefault();
    console.log("소유권을 이전하자", photoToken, address)
    transferCopyright(address, photoToken, imageId, gas);
  }
}

export default Container;
