### es6转es5
```js
  使用babel转码: 
  1 全局安装bable-cli  :npm命令:   npm i -g bable-cli
  2 在项目根目录设置.bablerc 配置文件:
    {
      "presets": [
          "es2015",//  处理ES6语法为ES5
          "react",// 处理REACT语法
          "stage-2"// 处理es7语法从第二阶段开始  ES7语法共4个阶段
      ],
      "plugins": []
    }
  3 执行转换命令:  
    将转码结果存入一个文件:    bable  a.js  --out-file b.js ||  bable  a.js  -o b.js
    将整个文件夹转码:         bable wjjA --out-dir  wjjB  || bable  wjjA -d  wjjB
```

### 为引入统一配置转换钩子函数
```js
  // babel-register
  // babel-register模块改写require命令，为它加上一个钩子。
  // 每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
  命令:npm install --save-dev babel-register

  // 使用时，必须首先加载babel-register
  require("babel-register");
  require("./index.js");

  // 然后，就不需要手动对index.js转码了。

  注意:babel-register只会对require命令加载的文件转码,不会对当前文件转码.它是实时转码，所以只适合在开发环境使用。
```

### 代码内转换为ES5----m没有使用场景(使用babel-core , 地址http://babeljs.io/docs/usage/options/)

### 转换句法,不转语法:babel-polyfill

### 浏览器端处理
```js
1 // browser.js是Babel提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在script标签之中，但是要注明type="text/babel"

2 // 使用babel-standalone模块提供的浏览器版本，将其插入网页。
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
  <script type="text/babel">
  // 你的 ES6 code
  </script>
```

### 如何将代码打包成浏览器可以使用的脚本?
```js
  以Babel配合Browserify为例
  1 安装babelify模块
    npm install --save-dev babelify babel-preset-es2015
  2 用命令行转换ES6脚本
    browserify script.js -o bundle.js \
  -t [ babelify --presets [ es2015 ] ]

  // 上面代码将ES6脚本script.js，转为bundle.js，浏览器直接加载后者就可以了。

  /* 
  在package.json设置下面的代码，就不用每次命令行都输入参数了
   */
   {
      "browserify": {
        "transform": [["babelify", { "presets": ["es2015"] }]]
      }
    }
```

### 在线转换后替换js文件地址
```js
https://babeljs.io/repl/
```

### 与其他工具的配合
```js
  // 许多工具需要Babel进行前置转码，这里举两个例子：ESLint和Mocha。
  // ESLint用于静态检查代码的语法和风格，安装命令如下。
  1 npm install --save-dev eslint babel-eslint
  2 //在项目根目录下，新建一个配置文件.eslintrc，在其中加入parser字段。
  {
    "parser": "babel-eslint",
    "rules": {
        ...
      }
  }
  3 //在package.json之中，加入相应的scripts脚本
  "scripts": {
      "lint": "eslint my-files.js"
    },
  "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
  }
```