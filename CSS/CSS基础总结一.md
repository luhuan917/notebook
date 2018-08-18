# CSS基础总结一
> CSS-2

* [盒子模型](#盒子模型)
* [前端一像素问题](#前端一像素问题)
* [transition和animation的区别](#transition和animation的区别)
* [浮动元素](#浮动元素)
* [](#)
* [](#)
* [](#)
* [](#)
* [](#)

## 盒子模型
box-sizing: content-box | border-box | inherit;

* **标准盒子模型**：content-box
![alt](./imgs/CSS-2-1.png)

标准盒子模型：content部分独立

* **IE盒子模型**：border-box
![alt](./imgs/CSS-2-2.png)

IE的盒子模型：content部分包含了border和padding


> 举个栗子

```css
// 标准盒子
div{
  box-sizing: content-box;
  width: 200px;
  height:200px;
  padding: 50px;
  border:5px solid red;
  margin:100px;
}
```
![alt](./imgs/CSS-2-3.png)

content = 200  
整个盒子的宽是：200 + 100 + 10 +200 = 510

```css
div{
  box-sizing: border-box;
  width: 200px;
  height:200px;
  padding: 50px;
  border:5px solid red;
  margin:100px;
}
```
![alt](./imgs/CSS-2-4.png)

content = 90  + 100 + 10 = 200
整个盒子的宽是：200 + 200 = 400

## 前端一像素问题
> 像素是屏幕显示的最小单位。一个像素有多大？一个像素越小，那么在同样大小的屏幕上，需要的像素点越多，像素点越密集。理论上px的最小单位是1，但是会有几个特例，高清屏的显示就是一个特例。高清屏确实可以画0.5px。
* 方法一：transform:scaleY（0.5）使用伪元素设置1px的边框，然后对边框进行缩放(scaleY) 实现
```html
<div class="bd-t"></div>
```
```css
.bd-t{
  position:relative;
}

.bd-t::after{
  content: "  ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.5px;
  background-color: #e0e0e0;
  /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  -webkit-transform: scaleY(.5);
  transform:scaleY(.5); // 指定变换的原点
}
```

## transition和animation的区别
* transition过渡是通过初始和结束两个状态之间的平滑过渡实现简单动画的
* 而animation则是通过关键帧@keyframes来实现更为复杂的动画效果
[transition](./transition.md)  
[animation](./animation.md)
案例实战：
[transform，transition，animation的混合使用——进阶](https://juejin.im/post/591340e0128fe100586e431b)

## 不定高的DIV居中
1. 使用flex
```css
.parent {
  display:flex;
  justify-content:center;
  align-items:center;
}
```
2. 使用CSS的transform
```css
.parent {
  display:relative;
}
.child {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
```
3. dispaly:table-cell
```css
.parent {
  display:table-cell;
  text-align:center;
  vertical-align:middle;
}
.child {
  display:inline-block;
}
```

## 浮动元素
* 为什么要清除浮动？（解决父元素高度坍陷问题）
一个块级元素如果没有设置height,其height由子元素撑开，对子元素使用了浮动之后，子元素就会脱离文档流也就是说，父及元素中没有内容可以撑开其高度，这样父级元素height就会被忽略。这就是所谓的高度坍塌·
```
1.给父级元素定义高度 
2.让父级元素也浮动 
3.父级定义display:table 
4.父元素设置overflow:hidden 
5.使用内容生成的方式清除浮动
	.clearfix:after {  // :after选择器向选定的元素之后插入内容
   		    content:""; // 生成内容为空
   		    display: block; // 块级元素显示
   		    clear:both; // 清除前面元素
	}
不破坏文档流，没有副作用
```

## css选择器分类
```
基本的：
	1.id选择器（id="name"）
	2.类选择器（class="head"）
	3.标签选择器（body, div, ul, li）
	4.全局选择器（*）
复杂的：
	1.组合选择器（.class,div b）
	2.后代选择器 （#head .nav ul li 从父集到子孙集）
	3.群组选择器 (div, span, img {color:Red} 具有相同样式的标签分组显示)
	4.继承
	5.伪类选择器（链接样式，a元素的伪类）
	6.子选择器（div>p, 带大于号>）
	7.CSS相邻相邻兄弟选择器（h1+p, 带加号+）
```
### css优先级规则：
1. css选择规则的权值不同时，权值高的优先；
2. css选择规则的权值相同时，后定义的规则优先；
3. css属性后面加 !important 时，无条件绝对优先；
### 权值的计算：
![alt](./imgs/CSS-2-5.png)

权值等级划分， 一般来说是划分4个等级：

第一等级：代表 内联样式，如 style=""，权值为 1,0,0,0；

第二等级：代表 ID选择器，如 #id="", 权值为 0,1,0,0；

第三等级：代表 calss | 伪类 | 属性 选择器，如 .class | :hover,:link,:target | [type], 权值 0,0,1,0；

第四等级：代表 标签 | 伪元素 选择器，如 p | ::after, ::before, ::fist-inline, ::selection, 权值 0,0,0,1；

此外，通用选择器（*），子选择器（>）， 相邻同胞选择器（+）等选择器不在4等级之内，所以它们的权值都为 0,0,0,0；

* 权值计算公式：
权值 = 第一等级选择器 * 个数，第二等级选择器 * 个数，第三等级选择器* 个数，第四等级选择器 * 个数；

* 权值比较规则：
当两个权值进行比较的时候，是从高到低逐级将等级位上的权重值（如 权值 1,0,0,0 对应--> 第一等级权重值，第二等级权重值，第三等级权重值，第四等级权重值）来进行比较的，而不是简单的 1000*个数 + 100*个数 + 10*个数 + 1*个数 的总和来进行比较的，换句话说，**低等级的选择器，个数再多也不会越等级超过高等级的选择器的优先级的**;

![alt](./imgs/CSS-2-6.png)

> 总结，这个比较规则就是三点  
> 1.先从高等级进行比较，高等级相同时，再比较低等级的，以此类推；  
> 2.完全相同的话，就采用 后者优先原则（也就是样式覆盖）；  
> 3.css属性后面加 !important 时，无条件绝对优先（比内联样式还要优先）；

### 选择器的优先级：

css属性!important
1. 内联样式 
2. ID选择器(#id)
3. 类选择器(.class) = 伪类选择器(:hover等) = 属性选择器[type等] 
4. 元素选择器(p等) = 伪元素选择器(:after/:before/::selection等) 
5. 通用选择器(*) 
6. 继承的样式

css选择器的解析原则：选择器定位DOM元素是从右往左的方向，这样可以尽早的过滤掉一些不必要的样式规则和元素,所以尽量少用层级关系

[为什么CSS选择器是从右往左解析](https://blog.csdn.net/jinboker/article/details/52126021)

主要原因：HTML解析出了一颗DOM tree，与此同时样式脚本则解析生成了一个style rules，也可以说是一个CSS tree。最后，DOM tree同style rules一同结合解析出一颗Render Tree，而Render Tree就是包含了一个dom对象以及为其计算好的样式规则，提供了布局以及显示方法。**因为不清楚一个DOM对象上究竟对应着哪些样式规则，所以只能选择一个最笨的办法，即每一个DOM对象都遍历一遍style rules**

## 行内元素和块元素
* 块元素：块级元素新开启一行（即使是设置了width属性也是独占一行）、尽可能撑满父级元素的宽度，可以设置width和height属性；table元素浏览器默认的display属性为table。
* 行内元素：padding的4个方向都有效（从span标签可以看出）、margin只有水平方向有效、不可以设置width和height属性。

* 块元素：div、p、h1~h6、ul、ol、dl、li、dd、table、hr、blockquote、address、table、menu、pre，HTML5新增的header、section、aside、footer等
* 行内元素：span、img、a、lable、input、abbr（缩写）、em（强调）、big、cite（引用）、i（斜体）、q（短引用）、textarea、select、small、sub、sup，strong、u（下划线）、button（默认display：inline-block）

行内块元素（display:inline-block）表现其实和行内元素一样，只是其可以设置width和height属性。

## 如何画一个三角形
```
div {
  width: 0;
  height: 0;
  border-bottom: 100px solid cyan;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}
```
![alt](./imgs/CSS-2-7.png)

## 使元素消失的方法
1. opacity：0;该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定了一些事件，如click事件也能触发
2. visibility:hidden,该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件
3. display:node, 把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删掉

## 为什么css放在顶部而js写在后面
浏览器内核（渲染进程）包含：GUI渲染线程、JS引擎线程、事件触发线程、定时器触发线程、异步http请求线程

其中，**GUI渲染线程与JS引擎线程是互斥的**

1. **GUI渲染线程**解析HTML构建DOM树
2. 途中遇到CSS文件或者脚本文件，**异步http请求线程**开启线程请求，同时下载
3. CSS文件下载完后 **GUI渲染线程**解析构建CSSDOM树
4. **GUI渲染线程**将DOM tree和CSSOM tree合并生成Render tree;
5. 一旦脚本文件下载完成时，**JS引擎线程**就会解析脚本文件，此时阻塞页面的渲染

所以将CSS放在顶部而js写在后面

## 响应式布局
* bootstrap grid栅格布局
* CSS3的flex弹性布局

## 三栏布局
两边宽度固定，中间栏宽度自适应

### 方案一：float方法
* 原理：
  * 元素浮动后，脱离文档流。
  * 左右栏分别浮动在窗口两边，中间块(处于文档流中)受左右浮动影响被卡在中间无法继续向左右伸展已达到自适应，最后按需设置中间块的margin值来改变块间间隙即可。
  * 基于纯float实现的三栏布局需要将中间的内容放在HTML结构的最后，DOM结构为**左-右-中**，否则右侧会沉在中间内容的下侧 .

* 缺点：
  * 由于DOM结构限制左-右-中，主要内容无法最先加载
  * 高度中间高度超出且没有margin的情况下会出问题(文字环绕)：解决方案为清除浮动或创建BFC(实质也是清除浮动)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.left {
	    float: left;
	    height: 200px;
	    width: 200px;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    background-color: blue;
	    float: right;
	}
	.main {
	    margin-left: 220px;
	    margin-right: 220px;
	    height: 200px;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div class="main"></div>
    </div>
</body>
</html>
```

### 方案二：绝对定位position:absolute
* 原理
  * 绝对定位的元素脱离文档流，相对于最近的已经定位的祖先元素进行定位。无需考虑HTML中结构的顺序

* 优点：
  *  方便快捷，主要内容可以优先加载。

* 缺点：
  * 由于容器脱离了文档流，导致子元素必须脱离文档流
  * 高度未知的情况下会出问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.main {
	    height: 200px;
	    margin: 0 220px;
	    background-color: green;
	}
	.left {
	    position: absolute;
	    width: 200px;
	    height: 200px;
        top: 0;
	    left: 0;
	    background-color: red;
	}
	.right {
	    position: absolute;
	    width: 200px;
	    height: 200px;
	    background-color: blue;
        top: 0;
        right: 0;
	}
    </style>
</head>
<body>
    <div class="container">
    <div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
    </div>
</body>
</html>
```
### flex布局
1. flex-grow:属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
```
.item {
  flex-grow: <number>; /* default 0 */
}
```
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

![alt](./imgs/CSS-2-8.png)

2. flex-shrink:属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```
.item {
  flex-shrink: <number>; /* default 1 */
}
```
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小(比例可通过属性数值调节)。

如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

![alt](./imgs/CSS-2-9.png)

3. flex-basis:属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

4. lex:flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

flex实现三栏布局代码：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.container {
        display: flex;
	}
	.main {
        flex: 1;
		margin: 0 20px;
	    height: 200px;
	    background-color: green;
	}
	.left {
	    width: 200px;
	    height: 200px;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    background-color: blue;
	}
    </style>
</head>

<body>
    <div class="container">   <!-- flex布局的DOM顺序要按照 左-中-右 排-->
    <div class="left">  </div>
    <div class="main">  </div>
    <div class="right"> </div>
    </div>
</body>
</html>
```