import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uploadPhoto: (file, location, caption, gasPrice) => {
      dispatch(photoActions.uploadPhoto(file, location, caption, gasPrice));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);