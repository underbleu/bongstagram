// Action

// Action Creator

// initial state

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") || false
}

// reducer

function reducer(state = initialState, action){
  switch(action.type){
    default:
      return state;
  }
}

// reducer functions

// exports

// reducer exports

export default reducer;