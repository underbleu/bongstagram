import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = ( state, ownProps ) => {
  const { token: { walletAddress } } = state;
  return {
    walletAddress
  }
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
