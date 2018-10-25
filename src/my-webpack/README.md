## 安装webpack
```
npm init

// webpack4中除了正常安装webpack之外，需要再单独安一个webpack-cli

npm i webpack webpack-cli -D
```
* 在项目中npm init初始化一下，生成package.json
* 建议node版本安装到8.2以上
* npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies中，主要在开发环境中的依赖包

## 0配置
```js
// node v8.2版本以后都会有一个npx
// npx会执行bin里的文件

npx webpack     // 不设置mode的情况下 打包出来的文件自动压缩

npx webpack --mode development  // 设置mode为开发模式，打包后的文件不被压缩
```
当执行npx webpack命令的时候，webpack会自动查找项目中src目录下的index.js文件，然后进行打包，生成一个dist目录并存在一个打包好的main.js文件

## webpack配置
```js
// webpack.config.js
module.exports = {
    entry: '',               // 入口文件
    output: {},              // 出口文件
    module: {},              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development'      // 模式配置
}
```
* **npm i webpack-dev-server -D**：开发服务器

## 配置Html模板
* **npm i html-webpack-plugin -D**

通过一个模板实现打包出引用好路径的html来

## CSS
* **npm i style-loader css-loader -D**

css-loader 将 css 内容存为 js 字符串，并且会把 background, @font-face 等引用的图片，字体文件交给指定的 loader 打包

style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。

* **npm i less less-loader -D**

引入less文件的话，也需要安装对应的loader

* **npm i extract-text-webpack-plugin@next -D**

@next表示可以支持webpack4版本的插件，用于CSS拆分，将css直接用link的方式引入进去

* **npm i mini-css-extract-plugin -D**

mini-css-extract-plugin，是的可以说它是为webpack4而生的
```js
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/a.css'   // 指定打包后的css
        })
    ]
}
```

* **npm i postcss-loader autoprefixer -D**

通过postcss中的autoprefixer可以实现将CSS3中的一些需要兼容写法的属性添加响应的前缀，这样省去我们不少的时间
```js
// postcss.config.js
module.exports = {
    plugins: [require('autoprefixer')]  // 引用该插件即可了
}
```

## 图片
* **npm i file-loader url-loader -D**

使用 url-loader, 它接受一个 limit 参数，单位为字节(byte)

当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方
        
当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径

比如 views/foo/index.html 中```<img src="smallpic.png">```会被编译成```<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">```
 
而```<img src="largepic.png">```会被编译成```<img src="/f78661bef717cf2cc2c2e5158f196384.png">```

* **npm i html-withimg-loader -D**

页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好

## js
* **npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 -D**
  *  babel-core： babel 的核心编译器
  *  babel-loader：用于webpack的Babel模块加载器
  *  babel-preset-env：Babel预设，通过根据您的目标浏览器或运行时环境自动确定您需要的Babel插件和polyfill，将ES2015 +编译为ES5。
  *  babel-preset-stage-0：Babel为第0阶段插件预设。

```js
// .babelrc
{
    "presets": ["env", "stage-0"]   // 从右向左解析
}
```

## 打包
* **npm i clean-webpack-plugin -D**

在每次打包之前将dist目录下的文件都清空，然后再把打好包的文件放进去，防止我们每次npm run build的时候都会在dist目录下创建很多打好的包，如果积累过多可能也会混乱

## 静态服务器
启动一个静态服务器，默认会自动刷新，就是说你对html,css,js文件做了修改并保存后，浏览器会默认刷新一次展现修改后的效果

如果devServer里open设为true后，会自动打开浏览器
```
module.exports = {
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
    }
}
```
复制代码当然在npm run dev命令下，打包的文件存在于内存中，并不会产生在dist目录下

### 热更新和自动刷新的区别
热更新：只是替换更新的了部分，页面未发生重排，在更改js时候出现
自动刷新：更改html或者css时，自动刷新浏览器，出现最新的编译结果

## 别名
```js
module.exports = {
    resolve: {
        // 别名
        alias: {
            $: './src/jquery.js'
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    },
}
```

## demo
```
// webpack.config.js
const path = require('path');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');

// 正常写入的less
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
// reset
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');

module.exports = {
    // ---------------------入口文件---------------------
    entry: './src/index.js', 

    // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js', './src/login.js'],

    // 2.真正实现多入口和多出口需要写成对象的方式
    // entry: {
    //     index: './src/index.js',
    //     login: './src/login.js'
    // },

    // ---------------------出口文件---------------------   
    output: {                              
        filename: 'bundle.js',      // 打包后的文件名称
        path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
    },     
    // output: {
    //     // [name]就可以将出口文件名和入口文件名一一对应
    //     filename: '[name].js',      // 打包后会生成index.js和login.js文件
    //     path: path.resolve('dist')
    // },

    // output: {
    //     // 添加hash可以防止文件缓存，每次都会生成4位的hash串
    //     filename: 'bundle.[hash:4].js',   
    //     path: path.resolve('dist')
    // },

    // ---------------------处理对应模块---------------------
    module: {
        rules: [
            {
                test: /\.css$/,     // 解析css
                use: resetCss.extract({
                    use: ['css-loader', 'postcss-loader']
                })

                // use: ['style-loader', 'css-loader'] // 从右向左解析
                /* 
                    也可以这样写，这种方式方便写一些配置参数
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                */

                // use: ExtractTextWebpackPlugin.extract({
                //  // 将css用link的方式引入就不再需要style-loader了
                //  use: 'css-loader'       
                // })
            },
            {
                test: /\.less$/,
                use: styleLess.extract({
                    use: ['css-loader', 'postcss-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/',   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            },
            {
                test:/\.js$/,
                use: ['babel-loader','eslint-loader'],
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }
        ]
    },              
    // ---------------------对应的插件---------------------
    plugins: [
        // 通过new一下这个类来使用插件
        new HtmlWebpackPlugin({
            //  用哪个html作为模板
            // 在src目录下创建一个index.html页面当做模板来用
            template: './src/index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
        }),

        // 多页面开发，如何配置多页面
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',   
        //     filename: 'index.html',
        //     chunks: ['index']   // 对应关系,index.js对应的是index.html
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/login.html',
        //     filename: 'login.html',
        //     chunks: ['login']   // 对应关系,login.js对应的是login.html
        // })

        // // 拆分后会把css文件放到dist目录下的css/style.css
        // new ExtractTextWebpackPlugin('css/style.css')
        styleLess,
        resetCss,
        // 打包前先清空
        new CleanWebpackPlugin('dist'),
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin()
    ],
    // ---------------------开发服务器配置---------------------
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        // 注释热更新的时候为自动刷新html，css，热更新只能更js
        //hot: true               // 开启热更新
    },       
    mode: 'production',      // 模式配置
    resolve: {
        // 别名
        alias: {
            $: './src/jquery.js'
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    }
}
```