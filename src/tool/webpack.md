# webpack
> webpack

## 概念
![alt](./imgs/webpack-1.png)

不像大多数的模块打包机，**webpack是把项目当作一个整体，通过一个给定的的主文件，webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包成一个或多个浏览器可识别的js文件**

## install
首先添加我们即将使用的包：
```
npm install webpack webpack-dev-server --save-dev
```
webpack是我们需要的模块打包机，webpack-dev-server用来创建本地服务器，监听你的代码修改，并自动刷新修改后的结果。这些是有关devServer的配置
```
contentBase,  // 为文件提供本地服务器
port, // 监听端口，默认8080
inline, // 设置为true,源文件发生改变自动刷新页面
historyApiFallback  // 依赖HTML5 history API,如果设置为true,所有的页面跳转指向index.html
devServer:{
    contentBase: './src' // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true // 实时刷新
}
```
然后我们在根目录下创建一个'webpack.config.js'，在'package.json'添加两个命令用于本地开发和生产发布
    
```
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack"
}
```
在使用webpack命令的时候，他将接受webpack的配置文件，除非我们使用其他的操作

## entry
entry: 用来写入口文件，它将是整个依赖关系的根
```js
var baseConfig = {
   entry: './src/index.js'
}
```
当我们需要多个入口文件的时候，可以把entry写成一个对象
```js
var baseConfig = {
   entry: {
      main: './src/index.js'
   }
}
```

## output
output：即使入口文件有多个，但是只有一个输出配置
```js
var path = require('path')
var baseConfig = {
   entry: {
      main: './src/index.js'
   },
    output: {
       filename: 'main.js',
       path: path.resolve('./build')
    }
}
module.exports = baseConfig
```
如果你定义的入口文件有多个，那么我们需要使用占位符来确保输出文件的唯一性
```js
output: {
  filename: '[name].js',
  path: path.resolve('./build')
}
```
如今这么少的配置，就能够让你运行一个服务器并在本地使用命令npm start或者npm run build来打包我们的代码进行发布

## Loader
loader的作用： 
1. 实现对不同格式的文件的处理，比如说将scss转换为css，或者typescript转化为js
2. 转换这些文件，从而使其能够被添加到依赖图中

loader是webpack最重要的部分之一，通过使用不同的Loader，我们能够调用外部的脚本或者工具，实现对不同格式文件的处理，loader需要在webpack.config.js里边单独用module进行配置，配置如下：
```js
    test: 匹配所处理文件的扩展名的正则表达式（必须）
    loader: loader的名称（必须）
    include/exclude: 手动添加处理的文件，屏蔽不需要处理的文件（可选）
    query: 为loaders提供额外的设置选项
    ex: 
        var baseConfig = {
            // ...
            module: {
                rules: [
                    {
                        test: /*匹配文件后缀名的正则*/,
                        use: [
                            loader: /*loader名字*/,
                            query: /*额外配置*/
                        ]
                    }
                ]
            }
        }
```
要是loader工作，我们需要一个正则表达式来标识我们要修改的文件，然后有一个数组表示
我们表示我们即将使用的Loader,当然我们需要的loader需要通过npm 进行安装。例如我们需要解析less的文件，那么webpack.config.js的配置如下：
```js
        var baseConfig = {
                entry: {
                    main: './src/index.js'
                },
                output: {
                    filename: '[name].js',
                    path: path.resolve('./build')
                },
                devServer: {
                    contentBase: './src',
                    historyApiFallBack: true,
                    inline: true
                },
                module: {
                    rules: [
                        {
                            test: /\.less$/,
                            use: [
                                {loader: 'style-loader'},
                                {loader: 'css-loader'},
                                {loader: 'less-loader'}
                            ],
                            exclude: /node_modules/
                        }
                    ]
                }
            }
```
这里介绍几个常用的loader：
* babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。babel有些复杂，所以大多数都会新建一个.babelrc进行配置
* css-loader,style-loader:两个建议配合使用，用来解析css文件，能够解释@import,url()如果需要解析less就在后面加一个less-loader
* file-loader: 生成的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名
* url-loader: 功能类似 file-loader,但是文件大小低于指定的限制时，可以返回一个DataURL事实上，在使用less,scss,stylus这些的时候，npm会提示差什么插件，差什么，安上就行了
* webpack-bundle-analyzer：打包后的文件在dist目录下，npm run build 后，会自动在浏览器打开一个页面，里面包含打包的情况

## Plugins
**loaders负责的是处理源文件的如css、jsx，一次处理一个文件。而plugins并不是直接操作单个文件，它直接对整个构建过程起作用**

* ExtractTextWebpackPlugin: 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中
```js
    var ExtractTextPlugin = require('extract-text-webpack-plugin')
        var lessRules = {
            use: [
                {loader: 'css-loader'},
                {loader: 'less-loader'}
            ]
        }
        
        var baseConfig = {
            // ... 
            module: {
                rules: [
                    // ...
                    {test: /\.less$/, use: ExtractTextPlugin.extract(lessRules)}
                ]
            },
            plugins: [
                new ExtractTextPlugin('main.css')
            ]
        }
```
* HtmlWebpackPlugin:依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html
```js
        var HTMLWebpackPlugin = require('html-webpack-plugin')
            var baseConfig = {
                // ...
                plugins: [
                    new HTMLWebpackPlugin()
                ]
            }
```
* HotModuleReplacementPlugin: 它允许你在修改组件代码时，自动刷新实时预览修改后的结果注意永远不要在生产环境中使用HMR。这儿说一下一般情况分为开发环境，测试环境，生产环境。

## Tree Shaking
Tree Shaking 简单理解就是：打包时把一些没有用到的代码删除掉，保证打包后的代码体积最小化。

```js
// .babelrc
{
  "presets": [["env", { "modules": false }], "react", "stage-0"]
}
```
```js
// package.json
{
  "sideEffects": false 
  //表示所有的 module 都是无副作用的，没有使用到的 module 都可以删掉
}
```
但是 css、scss 是有用的代码，我们只需引入即可

```js
// 表示，除了[]中的文件（类型），其他文件都是无副作用的，可以放心删掉。
{
  "sideEffects": [
    "*.css", "*.scss", "*.sass"
  ]
}
```
可以看到，css 等样式文件现在如期打包进去了。如果有其他类型的文件有副作用，但是也希望打包进去，在 sideEffects: [] 中添加即可，可以是具体的某个文件或者某种文件类型。

## Code Split（代码分割）
单页应用，如果所有的资源都打包在一个 js 里面，毫无疑问，体积会非常庞大，首屏加载会有很长时间白屏，用户体验极差。所以，要代码分割，分成一个一个小的 js，优化加载时间。

### 分离第三方库代码
第三方库代码单独提取出来，和业务代码分离，减少 js 文件体积。在 webpack.base.conf.js 中增加：
```js
module: {...},
optimization: {
  splitChunks: {
    cacheGroups: {
      venders: {
        test: /node_modules/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
},
plugins: ...
```

### 动态导入
```js
// src/containers/App/App.js

// 注释掉此行代码
// import About from '@containers/About/About';

// 修改模块为动态导入形式
<Route path="/about" render={() => import(/* webpackChunkName: "about" */ '@containers/About/About').then(module => module.default)}/>
```

能看到，<About> 组件已经被 webpack 单独打包出对应的 js 文件了。同时，结合 react-router，分离 <About> 组件的同时也做到了按需加载：当访问 About 页面时，about.js 才会被浏览器加载。

注意，我们现在只是简单地使用了 dynamic import，很多边界情况没考虑进去，比如：加载进度、加载失败、超时等处理。可以开发一个高阶组件，把这些异常处理都包含进去。社区有个很棒的 react-loadable，大树底下好乘凉~
```js
npm i react-loadable

// src/containers/App/App.js
import Loadable from 'react-loadable';

// 代码分割 & 异步加载
const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ '@containers/About/About'),
  loading() {
    return <div>Loading...</div>;
  }
});

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/docs" component={Docs} />
          <Route path="/about" component={LoadableAbout} />
        </div>
      </BrowserRouter>
    );
  }
}
```
react-loadable 还提供了 preload 功能。假如有统计数据显示，用户在进入首页之后大概率会进入 About 页面，那我们就在首页加载完成的时候去加载 about.js，这样等用户跳到 About 页面的时候，js 资源都已经加载好了，用户体验会更好。

### 提取复用的业务代码
第三方库代码已经单独提取出来了，但是业务代码中也会有一些复用的代码，典型的比如一些工具函数库 utils.js。现在，About 组件和 Docs 组件都引用了 utils.js，webpack 只打包了一份 utils.js 在 main.js 里面，main.js 在首页就被加载了，其他页面有使用到 utils.js 自然可以正常引用到，符合我们的预期。但是目前我们只是把 About 页面异步加载了，如果把 Docs 页面也异步加载了会怎么样呢？



## 最后
* [webpack4新特性介绍](https://juejin.im/post/5ab749036fb9a028b77ac506)
* [optimizing-js](https://github.com/jasonintju/optimizing-js-example)
* [webpack原理](https://segmentfault.com/a/1190000015088834)
* [前端性能优化—js代码打包](https://juejin.im/post/5b9550806fb9a05cff31f7b3#comment)

### 什么是webpack和grunt和gulp有什么不同
> 答案：Webpack是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包后的文件。他和其他的工具最大的不同在于他支持code-splitting、模块化(AMD，ESM，CommonJs)、全局分析。

### 什么是bundle,什么是chunk，什么是module?
> 答案：bundle是由webpack打包出来的文件，chunk是指webpack在进行模块的依赖分析的时候，代码分割出来的代码块。module是开发中的单个模块。