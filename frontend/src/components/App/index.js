import { connect } from "react-redux";
import Container from "./container";


const mapStateToProps = ( state, ownProps ) => {
  const { user, token, routing : { location } } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    walletLoading: token.walletLoading,
    pathname: location.pathname // Aware whenever the pathname change -> Solve blocked-updates 
  };
};

export default connect(mapStateToProps)(Container);