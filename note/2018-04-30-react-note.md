# #3-12 Reactotron 디버깅툴

## Reactotron
React와 React Native 앱을 inspecting하기위한 도구
* state, API requests & responses 볼수 있게해줌 (미들웨어로 콘솔에 찍는것보다 나음)
* 테스트해보고 싶은 Action을 dispatch할 수 있다  

### # 설치
* `$ yarn add reactotron-react-js@1.12.2 `  
* `$ yarn add reactotron-redux@1.12.2`
* [Reactotron desktop App 설치](https://github.com/infinitered/reactotron/blob/master/docs/installing.md)

### # 연결
```js
// src/ReactotronConfig.js
import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

Reactotron.configure({ name: "Bongstagram" })
  .use(reactotronRedux()) // Redux와 연결
  .connect();

export default Reactotron;

// src/index.js
import "ReactotronConfig";
```

* dev모드에서 Store는 Reactotron으로 만든다  
-> Redux store state change를 쉽게 볼 수 있음
* prod모드에서는 Store를 Redux로 만든다

```js
// redux/configureStore.js
import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV;

...

let store;

if(env === "development"){
  store = initialState =>
    Reactotron.createStore(reducer, applyMiddleware(...middlewares));
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares))
}
```

# #3-13 Redux Dev Tools
[문서](https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm)  
Redux를 위한 디버깅 익스텐션. Reactotron은 맛보기로 보여줬고, 우리 프로젝트에서 디버깅을 위해 logger와 redux dev tool을 사용할거다

`$ yarn add redux-devtools-extension --dev`

```js
// redux/congifureStore.js
import { composeWithDevTools } from "redux-devtools-extension";

if (env === "development") {
  store = initialState =>
    Reactotron.createStore(
      reducer, 
      composeWithDevTools(applyMiddleware(...middlewares)) // 추가
    );
} ...
```

# #3-15 Multi Language with Redux

언어설정
`$ yarn add redux-i18n`

언어코드만 관리할 리듀서 추가
```js
// redux/configureStore.js
import { i18nState } from 'redux-i18n';

...

const reducer = combineReducers({
  users, 
  routing: routerReducer,
  lang: i18nState // 추가 !
})
```