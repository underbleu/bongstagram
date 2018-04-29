import { createStore, combine, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory"
import users from "redux/modules/users";

const env = process.env.NODE_ENV; // 코드실행 환경출력 (dev/prod)

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)]; // 리덕스와 history를 싱크시키기


if(env === "development"){
  const { logger } = require("redux-logger");
  middlewares.push(logger)
}

const reducer = combineReducers({
  users, 
  routing: routerReducer
})

let store = initialState => 
  createStore(reducer, applyMiddleware(...middlewares));

export { history };
  
export default store();