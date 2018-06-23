import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";
// import { actionCreaotrs as tokenActions } from "redux/modules/token";

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
    createAccount: (email, name, username, password) => {
      dispatch(userActions.createAccount(email, name, username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);