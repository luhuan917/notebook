# JavaScript在线编程--运行结果类
* [1.双等号](#1双等号)
* [2.typeof](#2typeof)
* [3.命令式和声明式](#3命令式和声明式)
* [4.作用域](#4作用域)
* [5.花括号](#5花括号)
* [6.执行顺序](#6执行顺序)
* [7.原型链](#7原型链)
* [8.默认值](#8默认值)
* [9.跨域变量](#9跨域变量)
* [10.比较符号](#10比较符号)
* [11.定义原型](#11定义原型)
* [12.valueof和toString](#12valueof和toString)
* [13.prototype](#13prototype)
* [14.call,bind](#14call,bind)
* [15.this](#15this)
* [](#)
* [](#)

## 1.双等号
```js
const a = [1, 2, 3]
const b = [1, 2, 3]
const c = "1,2,3"

// 双等号比较之前进行强制类型转换
console.log(a == c) // true
// 双等号和全等号对于对象都是进行引用比较
console.log(a == b) // false
console.log(a === b) // false
```
```js
console.log(null == undefined)  // true
console.log(null === undefined) // false

console.log(NaN == NaN) // false，唯一一个不等于自身的类型
console.log(NaN === NaN) // false
console.log(isNaN(NaN) === true) // true
console.log(isNaN('abc') === true) // true
```
```js
console.log([] == false) // true，其中一个为布尔，转布尔为数字，[] == 0，0 == 0
console.log({} == false) // false，对象原始值为对象本身，所以和false不等
console.log({} == true) // false，也和true不等

if([]) console.log('1') // '1'
if([1] == [1]) console.log('1') // undefined
```

![alt](./imgs/js-1.png)

```js
console.log([] == ![]) // true
console.log([] == []) // false

//!的优先级较==高，先运算==右侧的操作数：[]是对象，会转换成true，然后再转成false（加!的一定是转换成boolean）

// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true
```

## 2.typeof
```js
console.log(typeof typeof 0) // string=>typeof 0 先转换成'number'
console.log(typeof null) // 'object'=>bug
console.log(typeof 1+1) // 'number1'
```

## 3.命令式和声明式
* 命令式编程
```js
const numbers = [1, 2, 3, 4, 5]
const numbersDoubled = []
for (let i = 0; i < numbers.length; i++) {
  numbersDoubled[i] = numbers[i] * 2
}
```

* 声明式编程
```js
const numbers = [1, 2, 3, 4, 5]
const numbersDoubled = numbers.map(n => n * 2)
```

## 4.作用域
### 4.1
```js
var foo = 1
function foobar() {
  console.log(foo) // undefined => 第四行的foo，变量声明提升
  var foo = 2
  console.log(foo) // 2 => 第四行的foo，在第四行赋值
}
foobar()
```

### 4.2
```js
function Foo(){
  var i=0;
  return function(){
    console.log(i++);
  }
}
var f1 = Foo();
var f2 = Foo();
f1();  // 0
f1();  // 1
f2();  // 0
```

## 5.花括号
```js
function greet() {
  return
  {
    message: "hello"
  }
}

console.log(greet()) // undefined
```
由于 JavaScript 的自动分号插入（ASI），编译器在 return 关键字后面放置一个分号，因此它返回 undefined 而不会抛出错误。

```
const test = () => 1
```
* 不加{}时，有return作用，有返回值
* 加{}时没有返回值，如果要返回值，需要用return

## 6.执行顺序
### 6.1
```js
function printing(){
  console.log(1);
  setTimeout(function(){console.log(2)},1000);
  setTimeout(function(){console.log(3)},0);
  console.log(4)
}
printing()

// 1 4 3 2
```

### 6.2
```js
var t = true;
window.setTimeout(function(){
  t = false;
},1000);
while(t){
}
alert(t);
```
浏览器卡死

## 7.原型链
```js
function A() {
  this.fn = function(){
    return 1;
  };
}
A.prototype.fn = function(){ return 2;}
var a = new A();
a.fn();

// 1
```

## 8.默认值
```js
function foo(x){
  x = x || 3;
  console.log(x);
}
foo();
foo(0);
foo(-1);
foo(1);

// 3
// 3
// -1
// 1
```

## 9.跨域变量
```js
var foo = function bar(){
  console.log(foo === bar);
};
foo(); // true
```

## 10.比较符号
```js
if(10>9>8 == true){
  console.log('html5');
}else{
  console.log('css3');
}

// css3
```
首先 10>9 为 true

true>8 => 1>8 为false

## 11.定义原型
```js
let xx = {
  sangfor:100
};
Object.defineProperty(xx,'sangfor',{
  get () {
    return 200;
  }
});
xx.sangfor = 300;
console.log(xx.sangfor);

// 200
```
[defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

因为 return 200 是一个固定死的值，无论set为多少，get都是 200

## 12.valueof和toString
```js
let x = {
  toString () {
    return 20
  },
  valueof () {
    return '30'
  }
};

console.log(x == '20') // false
console.log(x == 30) // true
```
[关于javascript中的toString()和valueOf()](https://segmentfault.com/a/1190000010824347)
[浅析toString与valueOf](https://segmentfault.com/a/1190000009132264)

总结一下：在数值运算里，会优先调用valueOf()，在字符串运算里，会优先调用toString()。

## 13.prototype
```js
function Sangfor() {}
Sangfor.prototype.name = 100
let a = new Sangfor()
console.log(a.name) // 100
Sangfor.prototype.name = 200
console.log(a.name) // 200
Sangfor.prototype.name = 300
console.log(a.name) // 300
```

## 14.call,bind
```js
Function.prototype.sangfor = function () {
  return Function.prototype.call.bind(this)
}
console.log(Array.prototype.push.sangfor()([],0,1,2)); // 3
```

首先sangfor执行后返回的是一个函数，该函数执行call，this指向sangfor。

所以sangfor()执行完后返回一个函数接受bind规定的参数，去执行call，所以push.call([],0,1,2)，又因为push返回数组长度所以为3


## 15.函数提升和变量提升
```js
var sangfor = NaN
function sangfor() {}
if(typeof sangfor === 'number'){
  console.log(100)
}else if(typeof sangfor === 'function'){
  console.log(200)
}else if(typeof sangfor === 'object'){
  console.log(300)
}else{
  console.log(400)
}

// 100
```


**函数提升要比变量提升的优先级要高一些，且不会被变量声明覆盖，但是会被变量赋值之后覆盖。**

```js
console.log(a);    // f a() {console.log(10)}
console.log(a());    //  10
var a = 3;

function a() {
  return 10 
}
console.log(a)   //3
a = 6;
console.log(a());  //a is not a function;
```
相当于
```js
function a () {
  return 10
}
var a;
console.log(a);    // f a() {console.log(10)}
console.log(a());  //  10

a = 3;
console.log(a)   //3
a = 6;
console.log(a());   //a() is not a function;
```

```js
b() // call b second
console.log(b) // [Function: b] : 不会被变量声明覆盖

function b() {
    console.log('call b fist')
}
function b() {
    console.log('call b second')
}
var b = 'Hello world'
```

## 15.this
```js
function a() {
    return () => {
        return () => {
        	console.log(this)
        }
    }
}
console.log(a()()()) // this
```
箭头函数其实是没有 this 的，这个函数中的 this 只取决于他外面的第一个不是箭头函数的函数的 this。在这个例子中，因为调用 a 符合前面代码中的第一个情况，所以 this 是 window。并且 this 一旦绑定了上下文，就不会被任何代码改变。

