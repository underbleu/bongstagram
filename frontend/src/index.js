import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import store, { history } from 'redux/configureStore';
import App from 'components/App';
import I18n from "redux-i18n";
import { translations } from "translations";
import { actionCreators as tokenActions } from "redux/modules/token";

// Debugging

import "ReactotronConfig";



// setInterval(() => {
//   if (window.web3) {
//     const currentAddress = window.web3.eth.accounts[0];
//   }  
// }, 1000)
// import abiArray from "build/contracts/CopyrightToken.json";
// const web3 = window.web3;
// const MyContract = web3.eth.contract(abiArray.abi);
// const contractInstance = MyContract.at("0x4f133423121f5b652a688121aa09a992ecdaf325");
// contractInstance.mint.sendTransaction("photoURL", {
//   from: "0x55BD423e5FDEFba65243D0bB7febb5db279232F0",
// }, (err, txHash) => console.log("됫니",err, txHash));

// contractInstance.getCopyrightInfo.call(0, (err, data) => {
//   data[0] = web3.toDecimal(data[0])
//   data[2] = web3.toDecimal(data[2])
//   console.log(data)
// });


store.dispatch(tokenActions.getWallet());

ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations} initialLang="en" fallbackLang="en">
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </I18n>
  </Provider>,
  document.getElementById("root")
);
