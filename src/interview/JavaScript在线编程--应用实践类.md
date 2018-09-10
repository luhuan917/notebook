# JavaScript在线编程--应用实践类
* [1.整数的千分位划分](#1.整数的千分位划分)
* [2.产生随机整数](#2.产生随机整数)
* [3.判断两个对象是否相等](#3.判断两个对象是否相等)
* [4.0.1加0.2等于0.3问题](#4.0.1加0.2等于0.3问题)
* [5.掩盖字符串](#5.掩盖字符串)
* [6.pipe函数](#)
* [7.递归的评论](#)
* [8.memoization的实现](#)
* [10.如何解决地狱回调](#)
* [11.大O算法](#)


## 1.整数的千位划分
```js
function exchange(num) {
    num += ''
    if (num.length <= 3) return num
    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, function(v) {
      return v + ','
    })
    return num
  }
  console.log(exchange(1234567))
```
## 2.产生随机整数

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
