# JavaScript在线编程--应用实践类
* [1.斐波那契数组](#1.斐波那契数组)
* [2.实现bind](#2.实现bind)
* [3.判断两个对象是否相等](#3.判断两个对象是否相等)
* [4.0.1加0.2等于0.3问题](#4.0.1加0.2等于0.3问题)
* [5.掩盖字符串](#5.掩盖字符串)
* [6.pipe函数](#)
* [7.递归的评论](#)
* [8.memoization的实现](#)
* [10.如何解决地狱回调](#)
* [11.大O算法](#)

## 1.斐波那契数组
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

## 2.实现bind
> 创建一个独立的函数绑定，它在功能上等同于Function.prototype.bind方法

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

## 3.判断两个对象是否相等
> 判断两个对象是否相等，包括深层的嵌套属性，可以设置是否检查原型上的属性

```js
const isDeepEqual = (obj1,obj2,testPrototype = false) => {
  // 当1.值类型相等时，2.引用类型来自同一块内存地址时，3.原型链末端null===null
  if(obj1 === obj2){
    return true
  }

  if(typeof obj1 === 'function' && typeof obj2 === 'function'){
    return obj1.toString() === obj2.toString()
  }
  
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }

  if( Object.prototype.toString.call(obj1) !==
      Object.prototype.toString.call(obj2) ||
      typeof obj1 !== "object"
  ){
    return false
  }

  // 如果 testPrototypes 为 true，则递归比较其原型对象是否相等
  const prototypesAreEqual = testPrototypes
    ? isDeepEqual(
        Object.getPrototypeOf(obj1),
        Object.getPrototypeOf(obj2),
        true
      )
    : true // 如果 testPrototypes 为 false，则直接标记为 true

  // 在给定对象上找到的自身属性对应的字符串数组
  const obj1Props = Object.getOwnPropertyNames(obj1)
  const obj2Props = Object.getOwnPropertyNames(obj2)

  return (
    obj1Props.length === obj2Props.length &&
    prototypesAreEqual &&
    obj1Props.every(prop => isDeepEqual(obj1[prop], obj2[prop]))
  ) // 对每一个属性进行递归比较
}
```

## 4.0.1加0.2等于0.3问题
