import React, { Component } from "react";
import PropTypes from "prop-types";
import Transfer from "./presenter";
import { actionCreators as tokenActions } from "redux/modules/token";

const web3 = window.web3;

class Container extends Component {
  state = {
    address: '',
    gas: '5'
  };

  static propTypes = {
    walletAddress: PropTypes.string,
    // photoToken: PropTypes.number,
    imageId: PropTypes.number.isRequired,
    closeTransfer: PropTypes.func.isRequired,
    // transferCopyright: PropTypes.func.isRequired
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
    console.log(this.state)
    this.setState({
      [name]: value
    });
  }

  _handleSubmit = event => {
    const { address, gas } = this.state;
    const { photoToken, imageId } = this.props;
    const gasPrice = web3.toWei(gas, "gwei");
    event.preventDefault();
    tokenActions.transferCopyright(address, photoToken, imageId, gasPrice);
    this.props.closeTransfer();
  }
}

export default Container;
