# 一道跟 promise 有关的面试题

## 面试题目一
```js
setTimeout(function(){
    console.log('定时器开始啦')
});

new Promise(function(resolve){
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')
});

console.log('代码执行结束');
```
```
执行结果：
马上执行for循环啦
代码执行结束
执行then函数啦
定时器开始啦
```

## Promise
* macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
* micro-task(微任务)：Promise，process.nextTick

**事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。**

```js
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
    resolve();
}).then(function() {
    console.log('then');
})

console.log('console');
```
```
执行结果：
promise
console
then
setTimeout
```
* 这段代码作为宏任务，进入主线程。
* 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue。
* 接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue。
* 遇到console.log()，立即执行。
* 整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行。
* 第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行。
* 结束。


## process.nextTick(callback)
> process.nextTick(callback)类似node.js版的"setTimeout"，在事件循环的下一次循环中调用 callback 回调函数。

```javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```
```
执行结果:
1
7
6
8
2
4
3
5
9
11
10
12
```

* 整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
* 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1。
* 遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1。
* 遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1。
* 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2。

| 宏任务Event Queue | 微任务Event Queue |
| - | - |
| setTimeout1 | process1|
| setTimeout2 | then1 |

* 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
* 我们发现了process1和then1两个微任务。
* 执行process1,输出6。
* 执行then1，输出8。

**第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮时间循环从setTimeout1宏任务开始：**

* 首先输出2。接下来遇到了process.nextTick()，同样将其分发到微任务Event Queue中，记为process2。new Promise立即执行输出4，then也分发到微任务Event Queue中，记为then2。

| 宏任务Event Queue | 微任务Event Queue |
| - | - |
| setTimeout2 | process2|
|  | then2 |

* 第二轮事件循环宏任务结束，我们发现有process2和then2两个微任务可以执行。
* 输出3。
* 输出5。
* 第二轮事件循环结束，第二轮输出2，4，3，5。
* 第三轮事件循环开始，此时只剩setTimeout2了，执行。
* 直接输出9。
* 将process.nextTick()分发到微任务Event Queue中。记为process3。
* 直接执行new Promise，输出11。
* 将then分发到微任务Event Queue中，记为then3。
* 第三轮事件循环宏任务执行结束，执行两个微任务process3和then3。
* 输出10。
* 输出12。
* 第三轮事件循环结束，第三轮输出9，11，10，12。

**整段代码一共执行了三次事件循环**

* JavaScript是一门单线程语言
* EventLoop是JavaScript的执行机制

## 面试题目2
```javascript
const first = () => (new Promise((resovle,reject)=>{
    console.log(3);
    let p = new Promise((resovle, reject)=>{
         console.log(7);
        setTimeout(()=>{
           console.log(5);
           resovle(6); 
        },0)
        resovle(1);
    }); 
    resovle(2);
    p.then((arg)=>{
        console.log(arg);
    });

}));

first().then((arg)=>{
    console.log(arg);
});
console.log(4);
```
```
3
7
4
1
2
5
```

### 第一轮事件循环
先执行宏任务，主script，new Promise立即执行输出【3】，执行p的new Promise操作输出【7】。遇到setTimeout将其放入下一轮宏任务队列，p的then，叫then1，放入微任务队列，发现first的then，叫then2，放入微任务队列。执行console.log(4)，输出【4】，宏任务执行结束。此时：

| 宏任务Event Queue | 微任务Event Queue |
| - | - |
| setTimeout | then1 |
| | then2 |

再执行微任务，执行then1，输出【1】，执行then2，输出【2】

### 第二轮事件循环
先执行宏任务里面的，也就是setTimeout回调，输出【5】。**resovle不会生效，因为p这个Promise的状态一旦改变就不会在改变了**。 所以最终的输出顺序是3、7、4、1、2、5。

## 参考文章
[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

