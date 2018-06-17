// import 


// action
const CHANGE_LOADING = "CHANGE_LOADING";

// action creator
function changeLoading(walletAddress) {
  return {
    type: CHANGE_LOADING,
    walletAddress
  }
}

function getAccounts() {
  return dispatch => {
    const { web3 } = window;
    
    web3.eth.getAccounts((err, data) => {
      if (err) console.log(err);
      const walletAddress = data[0];
      console.log("지갑",walletAddress)
      dispatch(changeLoading(walletAddress));
    });
    
  }
}

const initialState = {
  tokenLoading: true
};

// reducer

function reducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_LOADING:
      return applyChangeLoading(state, action);
    default:
      return state;
  }
}

// reducer function

function applyChangeLoading(state, action) {
  return {
    tokenLoading: false
  };
}

// export
const actionCreators = {
  getAccounts
}

export { actionCreators }

export default reducer;

