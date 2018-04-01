# 0401 강의노트

## Webpack 설정

1. entry: where to find code (as many as I want)
2. output: where to locate the code (only one)
3. loader: how to transform
4. plugins: What to do at the end (uglify...)

```js
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    ]
  },
  plugins: [new UglifyJsPlugin()]
};
```

---

## Create React App

```bash
$ yarn global add create-react-app
$ create-react-app frontend
$ cd frontend
$ yarn start
```

* `yarn eject`  
create-react-app의 기본설정에선 CSS모듈과 Sass를 쓸 수 없다 -> `$ yarn eject`로 full-control할 수 있게 만들어줘야함!