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
* [11.大O算法](#11.大O算法)
* [12.实现EventEmitter类](#12.实现EventEmitter类)
* [13.学生排序](#13.学生排序)
* [14.最大字符数](#14.最大字符数)
* [15.非重复字符最大数](#15.非重复字符最大数)
* [16.任务队列](#16.任务队列)


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

## 11.大O算法
大O表示法描述算法的时间复杂度。最好的算法将以最快的速度执行并具有最简单的复杂性。

### O(1)
```js
arr[arr.length - 1]
```
* 1000 elements = 1ms
* 2000 elements = 1ms

### O(N)
```js
arr.filter(fn)
```
* 1000 elements = 1ms
* 7000 elements = 7ms

### O([1, N])
执行时间取决于提供给函数的数据，可能会很早或很晚返回。这里最好的情况是O（1），最坏的情况是O（N）。

```js
arr.some(fn)
```
* 1000 elements = 1ms <= x <= 1000ms

### O(NlogN)
浏览器通常为sort（）方法实现快速排序算法，这是logN时间复杂度。这对于大型集合非常有效。

```js
arr.sort(fn)
```

* 1000 elements = 3ms

### O(N^2)
执行时间随元素数量呈二次方式上升。通常是嵌套循环的结果。

```js
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // ...
  }
}
```
* 1000 elements = 1000000ms

### O(N!)
```js
const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val
        ])
      ),
    []
  )
}
```
* 1000 elements = Infinity (practically) ms

## 12.实现EventEmitter类
```js
请实现一个EventEmitter类，实现以下方法，需采用javascript语言，不支持ES6
1. emitter.on(name, fn) // 订阅name事件，监听函数为fn, 可以多次订阅，
2. emitter.once(name, fn) // 功能和on类似，但是监听函数fn是一次性的，触发后自动移除
3. emitter.emit(name, data1, data2, ..., datan) // 发布name事件，所有订阅name事件的监听函数被触发，data1, data2, ..., datan会作为参数传给监听函数，如果name事件有多个监听函数，按照订阅顺序依次执行
4. emitter.remove(name, fn) // 移除name事件的监听函数fn
```
```js
输入
// 新建一个emitter对象
var emitter = new EventEmitter()
var log = console.log
// 注册事件
emitter.on('someTask', log)
// 触发事件
emitter.emit('someTask', 1, 2) // 1 2
// 注册once事件
emitter.once('onceTask', log)
// 触发事件
emitter.emit('onceTask', 1) // 1
// 触发事件
emitter.emit('onceTask', 1) // 不输出
// 移除监听函数
emitter.remove('someTask', log)
// 触发事件
emitter.emit('someTask', 1) // 不输出

输出
1 2

1
```
```js
样例输入
var e = new EventEmitter();
var count = 0;
e.on('test', function (num1, num2) {
     count = num1 + num2
     console.log(count)
});
e.emit('test', 1, 2);
样例输出
3
```
```js
class EventEmitter {
  constructor() {
    this._cache = {}
    this._onceCache = {}
  }
  on(type, cb) {
    // 如果之前注册过该类型事件则取出函数数组，如果没有则初始化一个新数组
    let fns = (this._cache[type] = this._cache[type] || [])
    if (fns.indexOf(cb) === -1) {
      fns.push(cb)
    }
    return this
  }
  emit(type, ...datas) {
    let fns = this._cache[type]
    let once = this._onceCache[type] || 0
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
          fn(...datas)
      })
    }
    if(once){
      if(Array.isArray(once)){
        once.forEach(o => {
          this.remove(type, o)
        })
      }else{
        this.remove(type,once)
      }
    }
    return this
  }
  remove(type, cb) {
    let fns = this._cache[type]
    let once = this._onceCache[type] || 0
    if (Array.isArray(fns)) {
      if (cb) {
        let index = fns.indexOf(cb)
        if (index !== -1) {
          fns.splice(index, 1)
        }
      } else {
        // 当没有第二个参数时，全部清空
        fns.length = 0
      }
      if(once){
        once.length = 0
      }
    }
    return this
  }
  once(type,cb){
    let fns = (this._cache[type] = this._cache[type] || [])
    let once = (this._onceCache[type] = this._onceCache[type] || [])
    if (fns.indexOf(cb) === -1) {
      fns.push(cb)
      once.push(cb)
    }
    return this
  }
}
```
```js
// jQuery链式调用
var a = {
    b: function(bb) {
        console.log(bb)
        return this;
    },
    c: function(cc) {
        console.log(cc)
        return this;
    },
    d: function(dd) {
        console.log(dd)
        return this;
    }
}
a.b(1).c(2).d(3);
// 1
// 2
// 3
// Object {}
```
## 13.学生排序
> 给定一个学生列表，学生信息由班级、分数、姓名等组成。请按下列规则对学生列表进行排序：
> 按班级从小到大排  
> 班级相同时，按成绩从大到小排序  
> 班级和成绩相同时，按原学生列表中的先后顺序排序  

```js
样例输入
[{"name":"张三","class":2,"score":64},
{"name":"李四","class":1,"score":80},
{"name":"王五","class":1,"score":80},
{"name":"赵六","class":4,"score":94}]
样例输出
[{"name":"李四","class":1,"score":80},
{"name":"王五","class":1,"score":80},
{"name":"张三","class":2,"score":64},
{"name":"赵六","class":4,"score":94}]
```

```js
function studentSort(arr) {
  arr.sort((a,b) => {
    if(a.class !== b.class){
      return a.class - b.class
    }else{
      return b.score - a.score
    }
  })
  return arr
}

let a = studentSort([
{"name":"张三","class":2,"score":64},
{"name":"李四","class":1,"score":81},
{"name":"王五","class":1,"score":80},
{"name":"赵六","class":4,"score":94}
])
console.log(a)
```

## 14.最大字符数
> 完成方法count(str)，传入字符串，返回字符串中出现次数最多的字符及次数

思路：每个元素变成数组项，对每个数组项进行正则匹配字符串的操作，将每长度存入数组项，排序，选择最大的那个

```js
function count(str){
  return [...new Set(str.split(''))]
    .map(v => [v, str.match(new RegExp(v, 'g')).length])
    .sort((a,b) => b[1]-a[1])[0]
}
```
```js
console.log(count('xabcadefgjsbb')) // [ 'b', 3 ]
```

## 15.非重复字符最大数
```js
function maxStr(str) {
  let max = 0;
  let arr = str.trim().split('');
  let maxArr = [];
  arr.forEach(ele => {
    let index = maxArr.indexOf(ele);
    if(index !== -1){
      maxArr.splice(0,index+1)
    }
    maxArr.push(ele); 
    if(maxArr.length > max){
        max = maxArr.length;
    }
  });
  return max;
}
console.log(maxStr('abcdabeacdc')) // 5 => beacd
console.log(maxStr('arabcacfr')) // 4 => acfr
```

## 16.任务队列
实现一个AI任务队列，AI需要提供以下接口
```js
AI.talk()
// 执行一次任务，并输出‘talk’

AI.cancel()
// 取消上一次任务的执行，成功取消输出‘cancel’，如果未有任务执行则输出‘notask’

AI.sleep()
// num秒等待后再执行任务，等待任务本身也是可以取消的
```
```js
AI.talk()
// talk

AI.cancel()
// notask

AI.talk().cancel()
// cancel

AI.sleep(3).talk()
// 等待三秒之后输出：talk

AI.cancel().talk().sleep(3).talk().cancel().sleep(3).talk()
// notask
// talk
// 等待三秒
// 等待三秒
// talk
```
```js

```