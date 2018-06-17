import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uploadPhoto: (file, location, caption) => {
      console.log("컨테이너", file)
      dispatch(photoActions.uploadPhoto(file, location, caption));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);