import React, { Component } from "react";
import FeedPhoto from "./presenter";
 
class Container extends Component {
  state = {
    seeingLikes: false,
    seeingTransfer: false
  }
  
  render() {
    return (
      <FeedPhoto 
        {...this.state} // seeingLikes: false
        {...this.props} // <FeedPhoto {...photo} key={photo.id} />
        openLikes={this._openLikes}
        closeLikes={this._closeLikes}
        openTransfer={this._openTransfer}
        closeTransfer={this._closeTransfer}
      />
    );
  }
  
  _openLikes = () => {
    const { getPhotoLikes } = this.props;
    this.setState({
      seeingLikes: true
    });
    getPhotoLikes();
  };
  
  _closeLikes = () => {
    this.setState({
      seeingLikes: false
    });
  };
  
  _openTransfer = () => {
    this.setState({
      seeingTransfer: true
    });
  };
  
  _closeTransfer = () => {
    this.setState({
      seeingTransfer: false
    });
  };
}

export default Container;