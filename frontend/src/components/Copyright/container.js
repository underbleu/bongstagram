import React, { Component } from "react";
import PropTypes from 'prop-types';
import Copyright from "./presenter";
import { actionCreators as tokenActions } from "redux/modules/token";


class Container extends Component {
  state = {
    seeingCopyright: false,
    photoToken: this.props.photoToken,
    issueDate: '',
    originOwner: '',
    oldOwner: '',
    newOwner: ''
  };
  
  static propTypes = {
    txHash: PropTypes.string.isRequired,
    // photoToken: PropTypes.number.isRequired
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
    const photoToken = this.props.photoToken;
    tokenActions.getCopyrightInfo(photoToken)
      .then(({issueDate, originalOwner, oldOwner, newOwner}) => {
        this.setState({
          seeingCopyright: true,
          issueDate, 
          originOwner: originalOwner,
          oldOwner,
          newOwner
        });
      })
  };

  _handleMouseLeave = () => {
    this.setState({
      seeingCopyright: false
    });
  };
}

export default Container;
