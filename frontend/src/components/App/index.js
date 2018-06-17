import { connect } from "react-redux";
import Container from "./container";


const mapStateToProps = ( state, ownProps ) => {
  console.log(state)
  const { user, token, routing : { location } } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    tokenLoading: token.tokenLoading,
    pathname: location.pathname // Aware whenever the pathname change -> Solve blocked-updates 
  };
};

export default connect(mapStateToProps)(Container);