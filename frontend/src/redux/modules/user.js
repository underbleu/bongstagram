// Imports

// Actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USER_LIST = "SET_USER_LIST";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";

// Action Creator

function saveToken(token, username) {
  return {
    type: SAVE_TOKEN,
    token,
    username
  }
}

function logout() {
  return {
    type: LOGOUT
  };
}


function setFollowUser(userId) {
  return {
    type: FOLLOW_USER,
    userId
  };
}

function setUnfollowUser(userId) {
  return {
    type: UNFOLLOW_USER,
    userId
  }
}

function setUserList(userList) {
  return {
    type: SET_USER_LIST,
    userList
  };
}

function setImageList(imageList) {
  return {
    type: SET_IMAGE_LIST,
    imageList
  }
}

// API Actions

function facebookLogin(access_token) {
  return dispatch => {
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
    .then(response => response.json())
    .then(json => {
      dispatch(saveToken(json.token));
    })
    .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return dispatch => {
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(response => {
      if(response.statue === 400) console.log("비밀번호 틀림");
      return response.json();
    })
    .then(json => {
      const { token, user: { username } } = json;
      if(json.token) {
        dispatch(saveToken(token, username))
      }
    })
    .catch(err => console.log(err));
  };
}

function createAccount(email, name, username, password) {
  return dispatch => {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        name,
        username,
        password1: password,
        password2: password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function getPhotoLikes(photoId) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/likes/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401) {
        dispatch(logout());
      }
      return response.json();
    })
    .then(json => { //json: 좋아요한 유저리스트
      dispatch(setUserList(json));
    });
  }
}

function followUser(userId) {
  return (dispatch, getState) => {
    dispatch(setFollowUser(userId));
    const { user: { token } } = getState();
    fetch(`/users/${userId}/follow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setUnfollowUser(userId));
      }
    });
  };
}

function unfollowUser(userId) {
  return (dispatch, getState) => {
    dispatch(setUnfollowUser(userId));
    const { user: { token } } = getState();
    fetch(`/users/${userId}/unfollow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setFollowUser(userId));
      }
    });
  };
}

function getExplore() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/users/explore/", {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => dispatch(setUserList(json)));
  };
}

function searchByTerm(searchTerm) {
  return async (dispatch, getState) => {
    const { user: { token } } = getState();
    const imageList = await searchImages(token, searchTerm);
    const userList = await searchUsers(token, searchTerm);
    if (userList === 401 || imageList === 401) {
      dispatch(logout());
    }
    dispatch(setImageList(imageList));
    dispatch(setUserList(userList));
  };
}

function searchUsers(token, searchTerm) {
  return fetch(`/users/search/?username=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json);
}

// 서버에러 임시방편
function searchImages(token) {
  return fetch("/images/", {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) return 401;
      return response.json();
    })
    .then(json => json);
}

/* 완성형코드
  function searchImages(token, searchTerm) {
  return fetch(`/images/search/?hashtags=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json)
    .catch(err => console.log(err))
} */

// initial state

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  username: localStorage.getItem("username")
}

// reducer

function reducer(state = initialState, action){
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER_LIST:
      return applySetUserList(state, action);
    case SET_IMAGE_LIST:
      return applySetImageList(state, action);
    case FOLLOW_USER:
      return applyFollowUser(state, action);
    case UNFOLLOW_USER:
      return applyUnfollowUser(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetToken(state, action) {
  const { token, username } = action;
  localStorage.setItem("jwt", token);
  localStorage.setItem("username", username);
  return {
    ...state,
    isLoggedIn: true,
    token,
    username
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

function applySetUserList(state, action) {
  const { userList } = action;
  return {
    ...state, 
    userList
  };
}

function applySetImageList(state, action) {
  const { imageList } = action;
  return {
    ...state,
    imageList
  };
}

function applyFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: true };
    }
    return user;
  });
  return {
    ...state,
    userList: updatedUserList
  };
}

function applyUnfollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: false };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  getPhotoLikes,
  followUser,
  unfollowUser,
  getExplore,
  searchByTerm
};

export { actionCreators };

// reducer exports

export default reducer;
