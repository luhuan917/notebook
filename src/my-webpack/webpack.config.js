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