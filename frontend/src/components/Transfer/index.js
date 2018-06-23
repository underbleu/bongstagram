import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as tokenActions } from "redux/modules/photos";

const mapStateToProps = ( state, ownProps ) => {
  const { token: { walletAddress } } = state;
  return {
    walletAddress
  }
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    transferCopyright: (address, photoToken, imageId, gas) => {
      dispatch(tokenActions.transferCopyright(address, photoToken, imageId, gas))
    };
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
