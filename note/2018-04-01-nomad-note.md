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

### eject   
* create-react-app의 기본설정(default configuration)에선 CSS모듈과 Sass를 쓸 수 없다 -> `$ yarn eject`로 full-control할 수 있게 만들어줘야함!
* 한 번 eject하면 되돌아갈 수 없다 !
* eject를 하면 package.json에 많은 dependencies들이 생겨남

```bash
$ yarn eject
```

---

# 0403 강의노트

## scss to Webpack

1. sass 설치
```bash
$ yarn add sass-loader node-sass
```

2. 웹팩에 scss파일 컴파일하도록 설정  
config / webpack.config.dev.js 와 ebpack.config.prod.js에 코드추가 

```js
{
  test: /\.(css|scss)$/,
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: shouldUseSourceMap,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
              sourceMap: true
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourseMap: true
            }
          }
        ],
      },
      extractTextPluginOptions
    )
  ),
}
```

3. `$ yarn build`  
웹팩의 로더들은 아래 -> 위로 로딩된다

* `sass-loader`  
: scss파일을 css파일로 변환 (경로: build / static / css)
* `postcss-loader`  
: compatibility. 크로스 브라우징 이슈 제거  
```js
autoprefixer({
  browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
  ],
  flexbox: 'no-2009',
})
```
* `css-loader`  
css 파일 생성
* `style-loader`  
  * webpack.config.dev: 빠른 새로고침을 위해 css코드를 HTML파일의 `<head> / <style>`에 삽입
  * webpack.config.prod: 독립적인 css파일을 생성
  
---

## CSS모듈

### CSS모듈의 역할  
같은 클래스명을 가진 요소들이 중복문제를 가지지않도록, 고유한 클래스명을 만들어준다.   
`.컴포넌트이름__클래스명__랜덤숫자(hash)`

>ex)  
`<Nav />` 안에 ul.list -> `Nav__list__fd35633`  
`<Photo />` 안에 ul.list -> `Photo__list__ae34743`