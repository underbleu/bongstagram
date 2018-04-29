---
layout: post
title: 강의노트. react-router
category: react
permalink: /react/:title

tags: [React]
comments: true
---

# #3-0 Creating the User Reducer

## Redux
Redux는 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너

* 컴포넌트들이 필요한 정보를 부모컨테이너들을 통해 물려받는 것이 아니라, Redux Store에서 필요한것만 가져오면된다 -> No flying props
* 리덕스는 global state container이다
* state는 읽기전용. state를 변경하는 유일한 방법은 Action을 Reducer를 통해 보내는 것이다 
* Reducer는 그저 이전 상태와 액션을 받아 다음 상태를 반환하는 순수 함수이다. 이전 상태를 변경하는 대신 새로운 상태 객체를 생성해서 반환해야한다

## Redux is a mono State
* 한 개의 리듀서에 여러개의 오브젝트를 갖는것 보다, 3-4개의 리듀서를 만드는게 낫다  
-> 여러개의 리듀서를 합쳐 한 개의 스토어를 만들 것이다
* 하나의 상태 트리만을 가지고 있기 때문에 이전에는 굉장히 구현하기 어려웠던 기능인 실행취소/다시실행(undo/redo)을 손쉽게 구현할 수 있다
* 하나의 상태 트리만을 가지고 있기 때문에 디버깅에도 용이

## Store란?
* 애플리케이션의 상태를 저장하고
* getState()를 통해 상태에 접근하게 하고
* dispatch(action)를 통해 상태를 수정할 수 있게 하고
* subscribe(listener)를 통해 리스너를 등록한다

## localStorage
내 웹사이트에서 사용할 정보들을 브라우저에 저장가능하게 하는 저장소  
-> JWT 토큰을 저장하여 로그인상태를 만들 수 있다

```js
// src/redux/modules/users.js

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") || false
}
```

# #3-1~3 Installing Redux in Our Project

`$ yarn add redux react-redux`

### 1. 역할별 리듀서 생성: users.js, feeds.js..
```js
// redux/modules/users.js
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") || false
}

function reduer(state = initialState, action){
  switch(action.type){
    default:
      return false;
  }
}
```
### 2. 리듀서 통합 + 스토어생성
```js
// redux/configureStore.js
import { createStore, combine, combineReducers} from "redux";
import users from "./modules/users";

const reducer = combineReducers({ // Reducer 통합
  users,
  // ...
})

let store = initialState => createStore(reducer); // Store 생성

export default store();
```

### 3. 스토어와 컴포넌트연결
* react-redux  
React 바인딩을위한 패키지. react-redux가 제공해주는 `connet()`함수로 Redux 상태를 구독해야하는 **container 컴포넌트**를 생성할 것이다
* `<Provider>`  
"Redux를 React에 바인딩해주는 고차 컴포넌트" 명시적으로 스토어를 넘겨주지 않더라도 마법처럼 모든 container 컴포넌트에서 스토어를 사용할 수 있도록 해줌
```js 
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById("root")
);
```

# #3-4 Changing the NODE_PATH

파일을 디렉토리 경로로 부르면 복잡하고 명료하지 않다. 모듈처럼 부를 수 있도록 NODE_PATH를 변경해보자.

* src를 루트로 삼아 파일의 경로가 더욱 명확해진다  
`./modules/users` -> `redux/modules/users`
```bash
# frontend/.env

NODE_PATH=src
```

# #3-5 Redux Middlewares Thunk

* 장고의 미들웨어는 "request - server" 사이에 존재
* 리덕스의 미들웨어는 "ReactApp - Store" 사이에 존재

## # Redux Thunk란?
응답에 대응해서 액션을 원하는 시간에(기다렸다가) 스토어로 보낼 수 있게 도와준다  
*ex) ID와 PW 전송 -> 응답 -> 토큰이 있다면 Action 전송 -> 리듀서+스토어에 상태저장*  
* 함수를 반환하는것 thunk
  * 동기식에선 -> action(객체)을 dispatch하여 state를 변경했지만,
  * 비동기식에선 -> 반환값이 action이 아니라 thunk이기 때문에, dispatch하는 순간 incCountAsync함수의 반환값인  `function(dispatch) { setTimeout... }`(이것이 바로 Thunk!)이 실행된다.
  > ***반환값이...** 객체이면 action, 함수이면 thunk*

### 1. 모든환경에서 사용할 미들웨어
`$ yarn add redux-thunk`  

### 2. 개발환경에서만 사용할 미들웨어
콘솔에 "prev state, action, next state"등 개발에 필요한 정보들 출력  
`$ yarn add redux-logger --dev`  

* process variable
  * `process`: node js의 전체정보를 가지고 있는 variable
  * `process.env`:코드가 어떤환경에서 실행되고 있는지 보여줌  
  -> 환경이 dev/prod인지에 따라 스토어 설정이 달라질 예정이기 때문에 체크
  ```bash
  # 크롬에서 console.log(process.env) 실행

  {NODE_ENV: "development", PUBLIC_URL: ""}
  NODE_ENV: "development"
  PUBLIC_URL: ""
  __proto__: Object
  ```

* logger 불러오기
  1. dev/prod 모든환경에서 불러오는 방법 -> `import`
  2. dev 환경에서만 불러오는 방법 -> `require()`

```js
// redux/configureStore.js

import { logger } from "redux-logger" // 1. dev/prod 모든환경

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if(env === "development"){
  const { logger } = require("redux-logger"); //2. dev 환경에서만
  middlewares.push(logger);
}
```

# #3-8 Syncing React-router with Redux
* Redux 앱에서 라우팅을 하기 원한다면 React Router와 함께 사용할 수 있다
* Redux가 데이터의 원천, React Router가 URL의 원천이 될 것

## # 설치
`$ yarn add history react-router-dom react-router-redux@next`


## # history
브라우저의 히스토리(앞으로_뒤로) 정보를 가지고있는 오브젝트
1. 히스토리 불러오기
2. 히스토리 object 생성하기
3. 히스토리와 routerMiddleware를 싱크시키기
4. 히스토리 object를 export시켜
5. index.js의 라우터와도 싱크시키기
>결론적으로,  
>"라우터-미들웨어-리듀서" 모두가 동일한 "히스토리 object"를 리스닝하게 됨

```js
// redux/configureStore.js
import { createStore, combine, combineReducer, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory"; // 1
import users from "redux/modules/users"; 

const env = process.env.NODE_ENV;

const history = createHistory(); // 2

const middlewares = [thunk, routerMiddleware(history)]; // 3

//...

export { history }; // 4
```

```js
// index.js
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> // 5
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
```


























