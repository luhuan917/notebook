# JavaScript在线编程--运行结果类
* [1.双等号](#1.双等号)
* [2.typeof](#2.typeof)
* [3.命令式和声明式](#3.命令式和声明式)
* [4.作用域](#4.作用域)
* [5.花括号](#5.花括号)
* [](#)
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

console.log(NaN == NaN) // false

console.log([] == ![]) // true
console.log([] == []) // false
```

## 2.typeof
```js
console.log(typeof typeof 0) // string=>typeof 0 先转换成'number'
console.log(typeof null) // 'object'=>bug
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
```js
var foo = 1
function foobar() {
  console.log(foo) // undefined => 第四行的foo，变量声明提升
  var foo = 2
  console.log(foo) // 2 => 第四行的foo，在第四行赋值
}
foobar()
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