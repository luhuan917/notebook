# JavaScript在线编程--经典问题类
* [1.数组去重](#1.数组去重)
* [2.浅克隆](#2.浅克隆)
* [3.深克隆](#3.深克隆)
* [4.防抖](#4.防抖)
* [5.节流](#5.节流)
* [6.斐波那契数组](#6.斐波那契数组)
* [7.实现bind](#7.实现bind)
* [8.实现模板替换](#8.实现模板替换)
* [9.实现JSON.stringify](#9.实现JSON.stringify)
* [10.实现instanceof](#10.实现instanceof)
* [11.数组扁平化](#11.数组扁平化)

## 6.斐波那契数组
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

## 7.实现bind
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

## 8.实现模板替换
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

## 9.实现JSON.stringify
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

## 11.数组扁平化
