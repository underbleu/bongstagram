// import 


// action
const WALLET_LOADING = "WALLET_LOADING";

// action creator
function walletLoading(walletAddress) {
  return {
    type: WALLET_LOADING,
    walletAddress
  }
}

function getWallet() {
  return dispatch => {
    const { web3 } = window;
    web3.eth.getAccounts((err, data) => {
      if (err) console.log(err);
      const walletAddress = data[0];
      console.log("지갑",walletAddress)
      dispatch(walletLoading(walletAddress));
    });
  }
}

const initialState = {
  walletLoading: true
};

// reducer

function reducer(state = initialState, action) {
  switch(action.type) {
    case WALLET_LOADING:
      return applyWalletLoading(state, action);
    default:
      return state;
  }
}

// reducer function

function applyWalletLoading(state, action) {
  const { walletAddress } = action;
  return {
    walletLoading: false,
    walletAddress
  };
}

// export
const actionCreators = {
  getWallet
}

export { actionCreators }

export default reducer;

