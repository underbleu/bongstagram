// import

import { actionCreators as userActions} from "redux/modules/user";
import abiArray from 'build/contracts/CopyrightToken.json';
const web3 = window.web3;
const MyContract = web3.eth.contract(abiArray.abi);
const contractInstance = MyContract.at("0x4f133423121f5b652a688121aa09a992ecdaf325");

contractInstance.getCopyrightInfo.call(3, (err, data) => {
  data[0] = web3.toDecimal(data[0])
  data[2] = web3.toDecimal(data[2])
  console.log(data)
});

// actions

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";

// action creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function doLikePhoto(photoId) {
  return {
    type: LIKE_PHOTO,
    photoId
  }
}

function doUnlikePhoto(photoId) {
  return {
    type: UNLIKE_PHOTO,
    photoId
  }
}

function addComment(photoId, comment) {
  return {
    type: ADD_COMMENT,
    photoId, 
    comment
  };
}

// API actions

function getFeed() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/images/", {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setFeed(json));
      });
  };
}

function likePhoto(photoId) {
  return (dispatch, getState) => {
    dispatch(doLikePhoto(photoId)); // optimistic update: 누르자마자 하트색칠 먼저 -> API call
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/likes/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401){
        dispatch(userActions.logout())
      } else if(!response.ok) {
        dispatch(doUnlikePhoto(photoId))
      }
    })
  }
}

function unlikePhoto(photoId) {
  return (dispatch, getState) => {
    dispatch(doUnlikePhoto(photoId)); //1. optimistic update: 누르자마자 하트색칠 먼저 하고 (즉각적인 UI)
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/unlikes/`, { //2. API call 처리
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doLikePhoto(photoId)); //3. response에 문제가 있으면 하트 되돌리기
      }
    });
  };
}

function commentPhoto(photoId, message) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/comments/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    }).then(response => {
      if(response.status === 401) {
        dispatch(userActions.logout());
      }
      return response.json(); // API요청을 보낸 데이터
    })
    .then(json => {
      if(json.message) {
        dispatch(addComment(photoId, json)); //json = comment객체 (id, message, creator...)
      }
    })
  };
}

function uploadPhoto(file, location, caption) {
  const data = new FormData();
  data.append("caption", caption);
  data.append("location", location);
  data.append("file", file);

  return (dispatch, getState) => {
    const { user: { token } } = getState();
    return fetch(`/images/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: data
    })
    .then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.ok) {
        dispatch(getFeed());
      }
      return response.json();
    })
    .then(json => {
      contractInstance.mint.sendTransaction(`http://localhost:8000${json.file}`, {
        from: getState().token.walletAddress,
      }, (err, txHash) => console.log(err, txHash));
    })
    .catch(err => console.log(err))
  };
}

// initial state

const initialState = {};


// reducer

function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case LIKE_PHOTO:
      return applyLikePhoto(state, action);
    case UNLIKE_PHOTO:
      return applyUnlikePhoto(state, action);
    case ADD_COMMENT:
      return applyAddComment(state, action);
    default:
      return state;
  }
}

// reducer funtions

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  }
}

function applyLikePhoto(state, action) {
  const { photoId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if(photo.id === photoId) {
      return { ...photo, is_liked: true, like_count: photo.like_count + 1 };
    }
    return photo;
  });
  return { ...state, feed: updatedFeed };
}

function applyUnlikePhoto(state, action) {
  const { photoId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if (photo.id === photoId) {
      return { ...photo, is_liked: false, like_count: photo.like_count - 1 };
    }
    return photo;
  });
  return { ...state, feed: updatedFeed };
}

function applyAddComment(state, action) {
  const { photoId, comment } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if(photo.id === photoId) {
      return {
        ...photo,
        comments: [ ...photo.comments, comment ] // 새로운 comment객체를 추가하여
      }
    }
    return photo;
  })
  return { ...state, feed: updatedFeed } // state를 업데이트
}

// exports

const actionCreators = {
  getFeed,
  likePhoto,
  unlikePhoto,
  commentPhoto,
  uploadPhoto
};

export { actionCreators };

// default reducer export

export default reducer;