import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapStateToProps = ( state, ownProps ) => {
  const { user: { username } } = state;
  return {
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if(ownProps.isLiked) {
        dispatch(photoActions.unlikePhoto(ownProps.photoId))
      } else {
        dispatch(photoActions.likePhoto(ownProps.photoId))
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);