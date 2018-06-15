import React, { Component } from "react";
import UserList from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  
  // 1. render -> componentDidMount: 컴포넌트 생성이 완료되었을 떄
  componentDidMount() {
    const { userList } = this.props; //index.js에서 mapStateToProps로 받은 것
    if(userList) {
      this.setState({
        loading: false
      });
    }
  }
  
  // 2. componentWillReceiveProps: 컴포넌트의 prop이 변경되었을 떄
  componentWillReceiveProps(nextProps) {
    if(nextProps.userList) {
      this.setState({
        loading: false
      });
    }
  }
  
  render() {
    return <UserList {...this.state} {...this.props} /> // props에 userList가 들어있다
  }
}

export default Container;