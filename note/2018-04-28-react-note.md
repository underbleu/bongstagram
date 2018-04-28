# React: Front End (Theory)

## # 2-2 Introduction to Webpack
프로젝트의 여러파일들의 코드를 하나의 js css html파일로 변환시키는 도구
1. entry: 웹팩이 어디서부터 코드를 변환시킬지 (여러개파일)
2. output: 변환된 코드를 어디에 놓을지 (결과물은 단 하나)
3. loader: 웹팩이 각각의 파일을 어떻게 변환할지 -> 하나의 파일 (scss로더, js로더...)
4. plugins: 로더가 변환시켜 놓은 각각의 파일을 마지막에 전체적으로 어떻게 변환할지 -> 전체코드 (uglify...)

> Multiple Entries & One Output  
ES6로 코드를 작성하고, 웹팩을 이용해 브라우저가 이해할 수 있도록 "ES6 -> old JS"로 변환한 bundle.js파일을 만들어서 플러그인 uglify로 최종 압축한다

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

개발용으로만 필요하기 때문에 dev-dependencies에 설치
```bash
$ yarn add webpack --dev
$ yarn add babel babel-core babel-loader babel-preset-es2015 --dev
$ webpack # old코드로 변환 실행 !
```

---

## # 2-4 Create React App

### Create React App이란?  
일종의 configuration base. 쿠키커터와 유사하다

```bash
$ yarn global add create-react-app
$ create-react-app frontend
$ cd frontend
$ yarn start # 서버 작동
```

## # eject  
* create-react-app의 기본설정(default configuration)에선 CSS모듈과 Sass를 쓸 수 없다  
-> `$ yarn eject`로 커스터마이징 할 수 있게 만들어줘야함!
* eject를 하면 package.json에 많은 dependencies들이 생겨남
* 한 번 eject하면 되돌아갈 수 없다 !

```bash
$ yarn eject
```

* 불필요파일 삭제  
  * config / jest폴더
  * scripts / test~~ 파일모두

---

# 0403 강의노트

## scss to Webpack

1. sass 설치
```bash
$ yarn add sass-loader node-sass
```

2. 웹팩에 scss파일 컴파일하도록 설정  
config / webpack.config.dev.js(개발용) 와 webpack.config.prod.js에 코드추가 

```js
// webpack.config.dev.js (개발용)
{
  test: /\.(css|scss)$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
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
        sourceMap: true
      }
    }
  ],
}

// webpack.config.prod.js (배포용)
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
  * webpack.config.dev: (개발버전) 빠른 새로고침을 위해 css코드를 HTML파일의 `<head> / <style>`에 삽입
  * webpack.config.prod: (배포버전) 독립적인 css파일을 생성
  
---

## CSS모듈

### CSS모듈의 역할  
같은 클래스명을 가진 요소들이 중복문제를 가지지않도록, 고유한 클래스명을 만들어준다.   
`.컴포넌트이름__클래스명__랜덤숫자(hash)`

>ex)  
`<Nav />` 안에 ul.list -> `Nav__list__fd35633`  
`<Photo />` 안에 ul.list -> `Photo__list__ae34743`

---

# 0404 강의노트

장고서버에 업로드를 하고, 장고서버가 리액트앱을 읽을 수 있어야한다

* 포트 3000 (개발용. React server)
* 포트 8000 (배포용. Django server)
>Proxy the requests from :3000 to :8000 Done

# Proxy
request를 보내 데이터를 :3000에서 찾지 못했을때, proxy에 있는 다른주소를 찾아보게 한다


```js
// package.json
"proxy": "http://localhost:8000",
```

* 장고는 본인의 요청만 허용 -> :8000포트 이외에서 접근하면, 장고는 요청을 자동으로 차단한다

```bash
# To accept requests from React
$ pipenv install django-cors-headers
```

* 리액트 리퀘스트를 받기위해 django-cors-headers 설정을 base.py에 추가해준다

* CORS로 API를 오픈해주고, json web token을 받아 보안을 지켜준다

* 장고에게 리액트 static파일이 frontend/build안에 있다고 알려준다.
```py
STATICFILES_DIRS = [
    str(APPS_DIR.path('static')),
    str(ROOT_DIR.path('frontend', 'build', 'static'))
]
```