import { createStore, combine, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import users from "redux/modules/users";

const env = process.env.NODE_ENV; // 코드실행 환경출력 (dev/prod)


if(env === "development"){
  const { logger } = require("redux-logger");
  middlewares.push(logger)
}

const reducer = combineReducers({
  users
})

let store = initialState => 
  createStore(reducer, applyMiddleware(...middlewares));

export default store();