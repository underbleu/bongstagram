// Imports

// Actions

const SAVE_TOKEN = "SAVE_TOKEN";

// Action Creator

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
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
      localStorage.setItem("jwt", json.token);
      dispatch(saveToken(json.token));
    })
    .catch(err => console.log(err));
  };
}

// initial state

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
}

// reducer

function reducer(state = initialState, action){
  switch(action.type){
    case SAVE_TOKEN:
      return applySetToken(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetToken(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

// exports

const actionCreators = {
  facebookLogin
};

export { actionCreators };

// reducer exports

export default reducer;
