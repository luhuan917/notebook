# JavaScript在线编程--经典问题类
* [1.数组去重](#1.数组去重)
* [2.数组找重](#2.数组找重)
* [3.浅拷贝](#3.浅拷贝)
* [4.深拷贝](#4.深拷贝)
* [5.防抖](#5.防抖)
* [6.节流](#6.节流)
* [7.斐波那契数组](#7.斐波那契数组)
* [8.实现bind](#8.实现bind)
* [9.实现模板替换](#9.实现模板替换)
* [10.实现JSON.stringify](#10.实现JSON.stringify)
* [11.实现instanceof](#11.实现instanceof)
* [12.数组扁平化](#12.数组扁平化)
* [13.正则验证email](#13.正则验证email)
* [14.使用setTimeout实现setInterval](#14.使用setTimeout实现setInterval)

## 1.数组去重
> 编写一个数组去重的方法
```js
function arrayUnique(arr){
}
arrayUnique([1,3,4,3,1,4,6,7])
```
### 解法1：利用 ES6 中的 set
```js
const arrayUnique = (arr) => {
    return Array.from(new Set(arr))
}
```

### 解法二：利用 splice 函数
```js
const arrayUnique = (arr) => {
    arr.sort((a,b) => a-b);
    for(let i=0;i<arr.length-1;i++){
        if(arr[i] === arr[i+1]){
            arr.splice(i+1,1)
            i--;
        }
    }
    return arr;
}
```

### 解法三：利用 ES6 reduce 函数
arr.reduce(callback[, initialValue])
* callback：执行数组中每个值的函数，包含四个参数：
  * accumulator：累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
  * currentValue：数组中正在处理的元素。
  * currentIndex可选：数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
  * array可选：调用reduce的数组
* initialValue可选：用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
```js
let arr = [1,3,4,3,1,4,6,7,8];
const arrayUnique = arr.reduce((acc,val) => 
    (acc.indexOf(val) !== -1) ? acc : [...acc,val],
    []
)
console.log(arrayUnique)
```

### 解法四：利用 filter 函数
```js
let arr = [1,3,4,3,1,4,6,7,8];
const arrayUnique = arr.filter((item,index,_arr) => 
    _arr.indexOf(item) === index
)
console.log(arrayUnique)
```

### 解法五：傻瓜法
```js
const arrayUnique = (arr) => {
    let res = [];
    for(let i=0;i<arr.length;i++){
        if(res.indexOf(arr[i]) === -1){
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(arrayUnique([1,3,4,3,1,4,6,7]));
```

### 解法六：明明没什么技巧却绕死人的双重循环法
```js
// 大概就是前面有重复的跳过，取最后的没有重复的
const arrayUnique = (arr) => {
  let newArr = [];
  for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
      if(arr[i] === arr[j]){
        j = ++i;
      }
    }
    newArr.push(arr[i]);
  }
  return newArr;
}
arrayUnique([1,3,4,3,1,4,6,7]);
```

## 2.数组找重
> 找出数组 arr 中的重复元素

### 解法一：排序后存入第一个，重复的跳过
```js
const duplicates = (arr) => {
    let res = [];
    arr.sort((a,b) => a-b)
    for(let i=0;i<arr.length-1;i++){
        if(arr[i]===arr[i+1]){
            res.push(arr[i]);
            while(arr[i]===arr[i+1]){
                i++;
            }
        }
    }
    return res;
}
console.log(duplicates([1,3,4,3,1,4,6,7]));
```

### 解法二：
```js
const duplicates = (arr) => {
    let repeat = arr.filter((item,index,_arr)=>
        _arr.indexOf(item) !== index
    )
    return [...new Set(repeat)]
}
console.log(duplicates([1,3,4,3,1,4,6,7]));
```

## 3.浅拷贝
> 浅拷贝：只复制一层对象的属性

### 解法一：原生实现
```js
const shallowCopy = (sourceObj) => {
    if(typeof sourceObj !== 'object') return;
    let newObj = sourceObj instanceof Array ? [] : {};
    for(let key in sourceObj){
        if(sourceObj.hasOwnProperty(key)){
            //只复制元素自身的属性，不复制原型链上的
            if(!(key in newObj)){
                newObj[key] = sourceObj[key]
            }
        }
    }
    return newObj;
}

let obj = { a:1, arr:[2,3]};
let res = shallowCopy(obj);
console.log(res);
console.log(res.arr === obj.arr); // true，指向同一个引用
```

### 解法二：使用Object.assign()
```js
let obj = { a:1, arr:[2,3]};
let res = Object.assign({}, obj)

console.log(res.arr === obj.arr); // true，指向同一个引用
```
注意：Object.assign 方法只复制源对象中可枚举的属性和对象自身的属性。

### 解法三：使用 ES6 扩展运算符
```js
let obj = { a:1, arr:[2,3]};
let res = {...obj};

console.log(res.arr === obj.arr); // true，指向同一个引用
```
ES6扩展运算符：实现浅拷贝一个对象

## 4.深拷贝
> 深复制：递归复制了所有层级。

### 解法一：json 序列化
```js
let obj = { a:1, arr:[2,3]};
let res = JSON.parse(JSON.stringify(obj));

console.log(res.arr === obj.arr); // false，指向不同的内存地址
```
注意：会破坏原型链，并且无法拷贝属性值为 function 的属性

### 解法二：原生实现
```js
const deepCopy = (sourceObj) => {
    if(typeof sourceObj !== 'object') return;
    let newObj = sourceObj instanceof Array ? [] : {};

    for(let key in sourceObj){
        if(sourceObj.hasOwnProperty(key)){
            newObj[key] = (typeof sourceObj[key] === 'object') 
            ? deepCopy(sourceObj[key]) : sourceObj[key]
        }
    }
    return newObj;
}

let obj = { a:1, arr:[2,3]};
let res = deepCopy(obj);
console.log(res);
console.log(res.arr === obj.arr); // false，指向不同的内存地址
```

## 5.防抖
### 防抖之非立即执行版

![alt](./imgs/js-2-2.png)

```js
```

### 防抖之立即执行版

```js
```

## 6.节流
### 节流之时间戳版

### 节流之定时器版

## 7.斐波那契数组
> 生成一个包含Fibonacci序列的数组，直到第n个项

初始化一个长度为n的数组，使用reduce，除开第一个和第二个数之外，其余都是前两个之和
```js
const fibonacci = n => 
    [...Array(n)].reduce(
        (acc,val,i) => acc.concat( i>1 ? acc[i-1] + acc[i-2] : i )
        ,[]
    )
```
```js
fibonacci(9) // [0, 1, 1, 2, 3, 5, 8, 13, 21]
```

## 8.实现bind
> 创建一个独立的函数绑定，它在功能上等同于Function.prototype.bind方法

bind的方法返回一个函数，该函数接受额外的参数。而bind方法接受一个函数以及一个对象环境

```js
const myBind = (fn,context) => (...args) => fn.apply(context,args)
```
```js
function example() {
  console.log(this)
}
// 用example这个函数执行，在对{a:true}这个对象环境下，{b：true}是额外的参数
const boundExample = myBind(example, { a: true })
boundExample.call({ b: true }) // logs { a: true }
```

## 9.实现模板替换
> 完成函数func，实现模板替换功能

```js
var data = {name:'xiaoming',age:'20'};
var template = 'My name is {$name},my age is {$age}.';
func(template,data) => 'My name is xiaoming,my age is 20.'
```

```js
    let data = {name:'xiaoming',age:'20'};
    let template = 'My name is {$name},my age is {$age}.';

    const func = (template, data) => {
      // 方括号用于查找某个范围内的字符
      let re = /{\$([\w]+)}/g;
      let result = null;
      let str = template;
      let value = '';
      while ((result = re.exec(template)) != null)  {
        console.log(result);
        if (data.hasOwnProperty(result[1])){
          value = data[result[1]];
          str = str.replace(result[0],value);
        }
      }
      return str;
    }

    console.log(func(template,data));
```

## 10.实现JSON.stringify
> 完成函数 func(obj)，实现类似 JSON.stringify 的功能

```js
let obj = {a:0, b:{c:"1",d:[2,3,4]}}      
func(obj) => '{"a":0,"b":{"c":"1","d":[2,3,4]}}'
```

```js
    let obj = {
      a:0, 
      b:{
        c:"1",
        d:[2,3,4]
      }
    }
    // func(obj) => '{"a":0,"b":{"c":"1","d":[2,3,4]}}'
    const func = (val) => {
      let s = '';
      if(typeof val === 'number'){
        return val.toString();
      } else if(typeof val === 'string'){
        return '"' + val + '"';
      } else if(val instanceof Array){
        return '[' + val.toString() + ']';
      } else if(val instanceof Object){
        s += '{';
        let arr = [];
        for(let key in val){
          arr.push('"' +  key + '":' + func(val[key]));
        }
        s += arr.join(",") + '}';
        return s;
      }
    }  
    console.log(func(obj));
```

## 11.实现instanceof
> 用于实例和构造函数的对应，[1,2] instanceof Array 为 true
```js
function Person(){
  this.name = name;
}
let p1 = new Person('sophia')
console.log(instanceof(p1,Person);
```
```js
function instanceof(left, right) {
    // 获得构造函数的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}
```

## 12.数组扁平化
> 完成函数 func，接受数组作为参数，数组元素包含整数或数组，函数返回扁平化后的数组

```js
func([1,[2,[[3,4],5],6]]) => [1,2,3,4,5,6]
```
```js
let arr = [1,[2,[[3,4],5],6]];
// func([1,[2,[[3,4],5],6]]) => [1,2,3,4,5,6]
const func = (arr) => {
    let newArr = [];
    if(arr instanceof Array){
        for(let i=0;i<arr.length;i++){
            if(typeof arr[i] === 'number'){
                newArr.push(arr[i]);
            }else{
                newArr = newArr.concat(func(arr[i]))
            }
        }
    }
    return newArr;
}
```

## 13.正则验证email
```js
let re = /^\w[\w\.]+@[\w]+.(com|org)$/;
console.log(re.test('someone@gmail.com'));
console.log(re.test('bill.gates@microsoft.com'));
console.log(re.test('tom@voyager.org'));
console.log(re.test('.eee@88.com'));
```

## 14.使用setTimeout实现setInterval
首先对于定时器函数 setTimeout/setInterval，JavaScript **有一个 JS 引擎线程**在**同步栈**上执行**同步任务**，当遇到 setTimeout 时，由**定时触发器线程**去计时，计时完成之后将**回调函数**添加到**事件队列**当中，等待**同步栈上**的**同步任务执**行完成。

对于 setInterval，当**JS引擎线程**空闲的时候，将**事件队列**里面的**回调函数**推入**JS引擎线程**执行。

**有一个问题，定时器是等到回调执行完，才开始计时进行下次循环呢？还是只要一次计时完毕，将回调推入事件队列之后不管回调执不执行就开始计时呢？答案显然是后者**。

如果这个时候无限定时时间到了会再次插入回调，这个时候如果发现事件队列中的第一次回调没有执行，那么再次插入的回调浏览器就默认取消，（这是以防出现回调连续执行多次的情况）

弊端：

1. 某些间隔会被跳过
2. 多个定时器的代码执行时间可能会比预期小
  * 每次 setTimeout 计时到后就会去执行，然后执行一段时间后才会继续setTimeout，中间就多了误差（误差多少与代码执行时间有关）
  * 而 setInterval 则是每次都精确的隔一段时间推入一个事件（但是，事件的实际执行时间不一定就准确，还有可能是这个事件还没执行完毕，下一个事件就来了）

假设，某个onclick事件处理程序使用setInterval()来设置了一个200ms的重复定时器。如果事件处理程序花了300ms多一点的时间完成。

![alt](./imgs/js-2-1.png)

这个例子中的第一个定时器是在205ms处添加到队列中，但是要过300ms才能执行。在405ms又添加了一个副本。在一个间隔，605ms处，第一个定时器代码还在执行中，而且队列中已经有了一个定时器实例，结果是605ms的定时器代码不会添加到队列中。结果是在5ms处添加的定时器代码执行结束后，405处的代码立即执行。

用 setTimeout 避免这种情况
```js
const say = () => {
  //something
  setTimeout(say,200);
}
setTimeout(say,200)
```

### 解法一：简答版
```js
const mySetInterval = (func, ms) => {
  const interval = () => {
    setTimeout(interval, ms);
    func();
  }
  setTimeout(interval, ms);
}

const test = () => console.log('log');
mySetInterval(test, 10);
```

### 优化版：增加了函数执行的次数
```js
const mySetInterval = (func, ms, count) => {
  const interval = () => {
    if(typeof count === 'undefined' || count-- >0){
      setTimeout(interval, ms);
      func();
    }
  }
  setTimeout(interval, ms);
}

const test = () => console.log('log');
mySetInterval(test, 10);
```