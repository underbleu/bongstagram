import { createStore, combine, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import users from "redux/modules/users";
import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV; // 코드실행 환경출력 (dev/prod)

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)]; // history와 싱크시키기


if(env === "development"){
  const { logger } = require("redux-logger");
  middlewares.push(logger)
}

const reducer = combineReducers({
  users, 
  routing: routerReducer
})

let store;

if (env === "development") {
  store = initialState =>
    Reactotron.createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };
  
export default store();