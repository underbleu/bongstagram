import React, { Component } from "react";
import FeedPhoto from "./presenter";
 
class Container extends Component {
  state = {
    seeingLikes: false
  }
  
  render() {
    return (
      <FeedPhoto 
        {...this.state} // seeingLikes: false
        {...this.props} // <FeedPhoto {...photo} key={photo.id} />
        openLikes={this._openLikes}
        closeLikes={this._closeLikes}
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
}

export default Container;