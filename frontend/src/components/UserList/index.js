import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => { //state(redux), ownProps(위에서 내려준거)
  const { user: { userList } } = state;
  return {
    userList
  };
};

export default connect(mapStateToProps)(Container);