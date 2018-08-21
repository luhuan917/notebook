# React16加载性能优化指南
> react16m

但随着 React 16 和 Webpack 4.0 的发布，很多过去的优化手段其实都或多或少有些“过时”了

## 零、基础概念
我们先要明确一次页面加载过程是怎样的（这里我们暂时不讨论服务器端渲染的情况）。

![alt](./imgs/react16m-1.png)

1. 用户打开页面，这个时候页面是完全空白的；
2. 然后 html 和引用的 css 加载完毕，浏览器进行首次渲染，我们把首次渲染需要加载的资源体积称为 “首屏体积”；
3. 然后 react、react-dom、业务代码加载完毕，应用第一次渲染，或者说首次内容渲染；
4. 然后应用的代码开始执行，拉取数据、进行动态import、响应事件等等，完毕后页面进入可交互状态；
5. 接下来 lazyload 的图片等多媒体内容开始逐渐加载完毕；
6. 然后直到页面的其它资源（如错误上报组件、打点上报组件等）加载完毕，整个页面的加载就结束了。

所以接下来，我们就分别讨论这些步骤中，有哪些值得优化的点。
## 一、打开页面 -> 首屏
![alt](./imgs/react16m-2.png)

写过 React 或者任何 SPA 的你，一定知道目前几乎所有流行的前端框架（React、Vue、Angular），它们的应用启动方式都是极其类似的：
1. html 中提供一个 root 节点
```
<div id="root"></div>
```

2. 把应用挂载到这个节点上
```
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```
这样的模式，使用 webpack 打包之后，一般就是三个文件：
1. 一个体积很小、除了提供个 root 节点以外的没什么卵用的html（大概 1-4 KB）
2. 一个体积很大的 js（50 - 1000 KB 不等）
3. 一个 css 文件（当然如果你把 css 打进 js 里了，也可能没有）

这样造成的直接后果就是，用户在 50 - 1000 KB 的 js 文件加载、执行完毕之前，页面是 完！全！空！白！的！。

也就是说，这个时候：

首屏体积（首次渲染需要加载的资源体积） = html + js + css

### 1.1 在 root 节点中写一些东西
我们完全可以把首屏渲染的时间点提前，比如在你的 root 节点中写一点东西：
```
<div class="root">Loading...</div>
```
就是这么简单，就可以把你应用的首屏时间提前到 html、css 加载完毕
此时：首屏体积 = html + css

当然一行没有样式的 "Loading..." 文本可能会让设计师想揍你一顿，为了避免被揍，我们可以在把 root 节点内的内容画得好看一些：
```
<div id="root">
    <!-- 这里画一个 SVG -->
</div>
```

### 1.2  使用 html-webpack-plugin 自动插入 loading
实际业务中肯定是有很多很多页面的，每个页面都要我们手动地复制粘贴这么一个 loading 态显然太不优雅了，这时我们可以考虑使用 html-webpack-plugin 来帮助我们自动插入 loading。
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');// 读取写好的 loading 态的 html 和 css
var loading = {
    html: fs.readFileSync(path.join(__dirname, './loading.html')),
    css: '<style>' + fs.readFileSync(path.join(__dirname, './loading.css')) + '</style>'}var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'xxxx.html',
      template: 'template.html',
      loading: loading
    })
  ]};
```
然后在模板中引用即可：
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <%= htmlWebpackPlugin.options.loading.css %>
    </head>
    <body>
        <div id="root">
            <%= htmlWebpackPlugin.options.loading.html %>        
        </div>
    </body>
</html>
```



## 文章来源
[React 16 加载性能优化指南](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247486745&idx=1&sn=7326b0eddea21e023972708a01f6d563&chksm=ea0d47e3dd7acef578239847a915a38504a08b130586e5cb49feccc1ea47b63a632ab185e0f8&scene=0#rd)
