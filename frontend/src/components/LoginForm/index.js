import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { token: { walletAddress }} = state;
  return {
    walletAddress
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: access_token => {
      dispatch(userActions.facebookLogin(access_token));
    },
    usernameLogin: (username, password) => {
      dispatch(userActions.usernameLogin(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
