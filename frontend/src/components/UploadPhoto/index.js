import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uploadPhoto: (file, location, caption) => {
      dispatch(photoActions.uploadPhoto(file, location, caption));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);