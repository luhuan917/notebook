# bind 和 call 和 apply

## 理解 bind
bind() 方法会创建一个新函数，当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数和其原本的参数。

> fun.bind(thisArg[, arg1[, arg2[, ...]]])

* thisArg 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。
* arg1, arg2, … （可选）当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。

```js
function fn(a, b, c) {
  return a + b + c;
}

var _fn = fn.bind(null, 10);
var ans = _fn(20, 30); // 60
```
fn 函数需要三个参数，_fn 函数将 10 作为默认的第一个参数，所以只需要传入两个参数即可，不小心传入了三个参数，放心，也只会取前两个。

```js
function fn(a, b, c) {
  return a + b + c;
}

var _fn = fn.bind(null, 10);
var ans = _fn(20, 30, 40); // 60
```
用处：可以用 bind 返回一个新的函数。也就是说，bind() 能使一个函数拥有预设的初始参数。这些参数（如果有的话）作为 bind() 的第二个参数跟在 this 后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。

```js
function list() {
  // slice若没有参数，则返回整个数组的副本
  return Array.prototype.slice.call(arguments); 
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

## new
使用 bind 返回的结果还是个 function，是个 function 就可以被 new 运算符调用，那么结果呢？规范中说的很清楚了，当使用 new 操作符调用绑定函数时，bind 的第一个参数无效。
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var _Person = Person.bind({});
var p = new _Person('hanzichi', 30); 
console.log(p) // Person {name: "hanzichi", age: 30}

var test = Person.bind({})
var t = test('hanzichi', 30); 
console.log(t) // undefined
```
也可以设置默认值，原先提供的那些参数仍然会被前置到构造函数调用的前面。
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var _Person = Person.bind({}, 'hanzichi'); // 这里this指向{}不作数
var p = _Person(30); // Person {name: "hanzichi", age: 30}
console.log(p)
```

### setTimeout
什么时候容易丢失 this 指向（隐式丢失）？setTimeout 是一个场景，很容易把 this 指向 window，当然，setInterval 也是一样。当使用对象的方法时，需要 this 引用对象，你可能需要显式地把 this 绑定到回调函数以便继续使用对象。
```js
var canvas = {
  render: function() {
    this.update();
    this.draw();
  },

  update: function() {
    // ...
  },

  draw: function() {
    // ...
  }
};

window.setInterval(canvas.render, 1000 / 60);
```
用 canvas 写特效或者做游戏时经常会碰到类似的问题。上面的代码是有问题的，render 方法中的 this 其实被指向了 window！我们可以用 bind， 显式地把 this 绑定到回调函数以便继续使用该对象。
```js
window.setInterval(canvas.render.bind(canvas), 1000);
```

### bind 的妙用
1. 将一个类数组转为数组

```js
function func(){
  // return Array.prototype.slice.apply(arguments);
  return Array.prototype.slice.call(arguments);
}

console.log(func(1,2,3,4))
```
原理：将slice函数this指向类数组arguments，没有传入参数，所以返回这个类数组的副本数组。相当于arguments.slice()

```js
function func(){
  let myslice = Function.prototype.call.bind(Array.prototype.slice)
  return myslice(arguments)
}

console.log(func(1,2,3,4))
```
原理：call函数绑到slice环境上，相当于slice.call，参数是arguments

2. 添加事件到多个节点，for 循环当然没有任何问题，我们还可以 “剽窃” forEach 方法：

```js
Array.prototype.forEach.call(document.querySelectorAll('input[type="button"]'), function(el){
  el.addEventListener('click', fn);
});
```
```js
var unboundForEach = Array.prototype.forEach
  , forEach = Function.prototype.call.bind(unboundForEach);

forEach(document.querySelectorAll('input[type="button"]'), function (el) {
  el.addEventListener('click', fn);
});
```

3. 将 x.y(z) 变成 y(x,z) 的形式：
```js
var obj = {
  num: 10,
  getCount: function() {
    return this.num;
  }
};

var unboundBind = Function.prototype.bind
  , bind = Function.prototype.call.bind(unboundBind);

var getCount = bind(obj.getCount, obj);
console.log(getCount());  // 10
```

4. setTimeout

```js
for(var i = 1; i <= 5; i++) {
  !function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  }(i);
}
```
```js
for(let i = 1; i <= 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
```
```js
for(var i = 1; i <= 5; i++) {
  setTimeout(console.log.bind(console, i), i * 1000);
}
```
```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function(num) {
    console.log(num)
  }, i * 1000, i);
}
```

## 实现bind
* 不传入第一个参数，那么默认为 window
* 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```js
Function.prototype.myBind = function(context){
  if(typeof this !== 'function'){
    return new TypeError('Error')
  }
  let _this = this
  let args = [...arguments].slice(1)
   // 返回一个函数
  return function F(){
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if(this instanceof F){
      return new _this(...args,...arguments)
    }
    // 注意:arguments是类数组，需要...拆成单个元素才能concat
    return _this.apply(context,args.concat(...arguments))
  }
}
```
测试用例：
```js
function fn(a, b, c) {
  return a + b + c 
}

let _fn = fn.myBind(null, 10);
let ans =  _fn(20, 30); 
console.log(ans) // 60

function Fn(a, b, c) {
  this.a = a
  this.b = b
  this.c = c
}
 // {}是为了让this指向{}，所以才会undefined
 // 当使用 new 操作符调用绑定函数时，bind 的第一个参数无效
let _Fn = Fn.myBind({},1) 
console.log(_Fn(2,3)) // undefined
console.log(new _Fn(2,3))  // Fn { a: 1, b: 2, c: 3 }
```

## 实现call
```js
Function.prototype.myCall = function (context) {
  context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  let args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  let result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}
```
可以用来实现继承
```js
function animal(name,food) {
  this.name = name,
  this.food = food,
  this.say = function() {
       console.log(name +" likes " + this.food + '.');
  }
}

function rabbit(name,food) {
  animal.myCall(this,name,food);
}

var Judy = new rabbit('Judy','carrot');

Judy.say();// >>> Judy likes carrot.
```

## 实现apply
let不允许在相同作用域内，重复声明同一个变量,因此不能在函数内部重新声明参数
```js
Function.prototype.myApply = function (context) {
  context = context || window
  context.fn = this

  let result
  if(arguments[1]){
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result  
}
```