import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentBox from "./presenter";

class Container extends Component {
  state = {
    comment: ""
  };
  
  static propTypes = {
    photoId: PropTypes.number.isRequired,
    submitComment: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <CommentBox
        {...this.state}
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
      />
    );
  }
  
  _handleInputChange = event => {
    const { target: { value } } = event;
    this.setState({
      comment: value
    });
  };
  
  _handleKeyPress = event => {
    const { key } = event;
    const { submitComment } = this.props;
    const { comment } = this.state;
    
    if(key === "Enter") { //1. 엔터를 누르면
      event.preventDefault();
      submitComment(comment); //2. API로 댓글데이터를 보내고
      this.setState({ //3. 인풋을 비워준다
        comment: ""
      });
    }
  };
}

export default Container;