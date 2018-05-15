import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

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

export default connect(null, mapDispatchToProps)(Container);