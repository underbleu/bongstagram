import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from 'redux-i18n';
import user from "redux/modules/user";
import photos from "redux/modules/photos";
import token from "redux/modules/token";
// import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV; // 코드실행 환경출력 (dev/prod)

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)]; // history와 싱크시키기

// if(env === "development"){
//   const { logger } = require("redux-logger");
//   middlewares.push(logger)
// }

const reducer = combineReducers({
  user,
  photos,
  token,
  routing: routerReducer,
  i18nState
})

let store;

if (env === "development") {
  store = initialState =>
    createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };
  
export default store();