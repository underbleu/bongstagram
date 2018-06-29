// import
import store from "redux/configureStore";
import { actionCreators as photoActions } from "redux/modules/photos";


// Web3
import abiArray from "build/contracts/CopyrightToken.json";
import Web3 from "web3";

// Meta Mask
const web3 = window.web3;
const MyContract = web3.eth.contract(abiArray.abi);
const contractInstance = MyContract.at(
  "0x3ad9c826ed3ac7e2415b435b52203b748d56cd3f"
); // -> 디플로이된 CopyrightToken의 컨트랙트 주소

// web3 1.0
// const web3socket = window.web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546'));
const web3socket = window.web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://52.78.187.235:8546'));
const MyContract2 = window.MyContract2 = new web3socket.eth.Contract(abiArray.abi, "0x3ad9c826ed3ac7e2415b435b52203b748d56cd3f");

function getCopyrightInfo(photoToken) {
  return MyContract2.methods.getCopyrightInfo(photoToken).call();
}

// action
const WALLET_LOADING = "WALLET_LOADING";
const SET_WALLET = "SET_WALLET";

// action creator

function transferCopyright(address, photoToken, imageId, gas) {
  contractInstance.transfer.sendTransaction(
    address, photoToken, imageId,
    { from: store.getState().token.walletAddress, gasPrice: `${gas}` }, 
    (err, txHash) => {
      err ? console.log(err) : store.dispatch(photoActions.saveTxData(imageId, "txHash", txHash));
    }
  )
}

MyContract2.events
  .Transfer((err, event) => { console.log("트렌스퍼 이벤트", event, err) })
  .on('data', function(event){
    console.log(event, 'from Transfer Event!')
    const photoToken = event.returnValues._tokenId;
    alert(`Copyright No. ${photoToken}'s ownership has transfered successfully !`);
  })
  .on('error', error => console.log(error) );

function walletLoading(walletAddress) {
  return {
    type: WALLET_LOADING,
    walletAddress
  }
}

function setWallet(walletAddress) {
  return {
    type: SET_WALLET,
    walletAddress
  }
}

function getWallet() {
  return dispatch => {
    const { web3 } = window;
    web3.eth.getAccounts((err, data) => {
      if (err) console.log(err);
      const walletAddress = data[0];
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
    case SET_WALLET:
      return applySetWallet(state, action);
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

function applySetWallet(state, action) {
  const { walletAddress } = action;
  return {
    walletLoading: false, 
    walletAddress
  }
}

// export
const actionCreators = {
  getWallet,
  setWallet,
  transferCopyright,
  getCopyrightInfo
}

export { actionCreators }

export default reducer;