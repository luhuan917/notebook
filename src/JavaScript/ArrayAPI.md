# Array API
先祭上一张神图：
![alt](./imgs/string&Array.png)
## toString
toString() 返回一个字符串，表示指定的数组及其元素。

> arr.toString()

* 返回：数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串

## join
join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。

> str = arr.join(separator)

* 参数
  *  separator：指定一个字符串来分隔数组的每个元素。  如果省略()，数组元素用逗号分隔。默认为 ","。如果separator是空字符串("")，则所有元素之间都没有任何字符。

* 返回值：一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串

**不改变原数组**

## push
push() 方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。

> arr.push(element1, ..., elementN)

* 参数
  *  elementN：被添加到数组末尾的元素。

* 返回值：当调用该方法时，新的 length 属性值将被返回。

**改变原数组**

## pop
pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

> arr.pop()

* 返回值：从数组中删除的元素(当数组为空时返回undefined)。

**改变原数组**

## shift
shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

> arr.shift()

* 返回值：从数组中删除的元素; 如果数组为空则返回undefined 。

**改变原数组**

## unshift
unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。

> arr.unshift(element1, ..., elementN)

* 参数
  *  elementN：要添加到数组开头的元素。

* 返回值：当一个对象调用该方法时，返回其 length 属性值。

**改变原数组**

## reverse
reverse() 方法将数组中元素的位置颠倒。第一个数组元素成为最后一个数组元素，最后一个数组元素成为第一个。

>  arr.reverse()

* 返回值：该数组的引用。

**改变原数组**

## sort
sort() 方法用原地算法对数组的元素进行排序，并返回数组。排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点。

> arr.sort([compareFunction])


* 参数
  *  compareFunction (可选)：用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。

* 返回值：排序后的数组。请注意，数组已原地排序，并且不进行复制。

**改变原数组**

## concat
concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

> var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

* 参数
  *  valueN：将数组和/或值连接成新数组。

* 返回值：新的 Array 实例。

**不改变原数组**

## slice
slice() 方法返回一个从开始到结束（**不包括结束**）选择的数组的一部分**浅拷贝**到一个新数组对象。且原始数组不会被修改。

```
arr.slice();
// [0, end]

arr.slice(begin);
// [begin, end]

arr.slice(begin, end);
// [begin, end)
```

* 参数
  *  begin（可选）：如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。如果省略 begin，则 slice 从索引 0 开始。
  *  end（可选）：
    *  slice会提取原数组中索引从 begin 到 end 的所有元素（包含begin，但不包含end）。
    *  slice(1,4) 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 
    *  slice(-2,-1)表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
    *  如果 end 被省略，则slice 会一直提取到原数组末尾。
    *  如果 end 大于数组长度，slice 也会一直提取到原数组末尾。

* 返回值：一个含有**提取元素**的新数组

**不改变原数组**

## splice
splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。

> array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

* 参数
  *  start：
    *  指定修改的开始位置（从0计数）。
    *  如果超出了数组的长度，则从数组末尾开始添加内容；
    *  如果是负值，则表示从数组末位开始的第几位（从-1计数）；
    *  如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
  *  deleteCount （可选）：
    *  整数，表示要移除的数组元素的个数。
    *  如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。
    *  如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
    *  如果deleteCount被省略，则其相当于(arr.length - start)。
  *  item1, item2, ... （可选）：
    *  要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
* 返回值：由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

```
splice方法使用deleteCount参数来控制是删除还是添加：
start参数是必须的，表示开始的位置（从0计数），如：start=0从第一个开始；start>= array.length-1表示从最后一个开始。
①、从start位置开始删除[start，end]的元素。
array.splice(start)

②、从start位置开始删除[start，Count]的元素。
array.splice(start, deleteCount)
   
③、从start位置开始添加item1, item2, ...元素。
array.splice(start, 0, item1, item2, ...)   
```

```js
let b =  [1,2,3,4,5,6];

b.splice(2);   //  返回：[3, 4, 5, 6] 原数组：[1,2]

b.splice(2,0,9) // 返回：[] 原数组：[1,2,9,3,4,5,6]

b.splice(3,1) // 返回：[4] 原数组：[1,2,3,5,6]

b.splice(2,1,9) // 返回：[3] 原数组：[1, 2, 9, 4, 5, 6]

```

**改变原数组**

---
ES5 分割线

## forEach
forEach() 方法对数组的每个元素执行一次提供的函数。

```js
array.forEach(callback(val, index, _arr){
    //do something
}, this)

array.forEach(callback[, thisArg])
```
* 参数
  *  callback：为数组中每个元素执行的函数，该函数接收三个参数：
    *  val：数组中正在处理的当前元素。
    *  index（可选）：数组中正在处理的当前元素的索引。
    *  _arr（可选）：forEach()方法正在操作的数组。
  *  thisArg（可选）：可选参数。当执行回调 函数时用作this的值(参考对象)。    

* 返回值：undefined.

**改变原数组**

## map
map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
var new_array = arr.map(function callback(val[, index[, _arr]]) {
 // Return element for new_array }[, 
thisArg])
```

* 参数
  *  callback：为数组中每个元素执行的函数，该函数接收三个参数：
    *  val：数组中正在处理的当前元素。
    *  index（可选）：数组中正在处理的当前元素的索引。
    *  _arr（可选）：map 方法被调用的数组。
  *  thisArg（可选）：可选参数。当执行回调 函数时用作this的值(参考对象)。    

* 返回值：一个新数组，每个元素都是回调函数的结果。

**不改变原数组**

## filter
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```js
var new_array = arr.filter(callback(val[, index[, _arr]])[, thisArg])
```

* 参数
  *  callback：用来测试数组的每个元素的函数。调用时使用参数 (val, index, _arr)。返回true表示保留该元素（通过测试），false则不保留。它接受三个参数：
    *  val：数组中正在处理的当前元素。
    *  index（可选）：数组中正在处理的当前元素的索引。
    *  _arr（可选）：调用了filter的数组。
  *  thisArg（可选）：可选参数。当执行回调 函数时用作this的值(参考对象)。    

* 返回值： 一个新的通过测试的元素的集合的数组，如果没有通过测试则返回空数组

**不改变原数组**

## every
every() 方法测试数组的**所有元素**是否都通过了指定函数的测试。

> arr.every(callback[, thisArg])

* 参数
  *  callback：用来测试数组的每个元素的函数。
    *  val：数组中正在处理的当前元素。
    *  index（可选）：数组中正在处理的当前元素的索引。
    *  _arr（可选）：调用了 every 的数组。
  *  thisArg（可选）：可选参数。当执行回调 函数时用作this的值(参考对象)。

* 返回值： 所有元素都通过指定函数的测试返回true，否则返回false。

**不改变原数组**

## some
some() 方法测试数组中的某些元素是否通过由提供的函数实现的测试。

> arr.some(callback[, thisArg])

* 参数
  *  callback：用来测试数组的每个元素的函数。
    *  val：数组中正在处理的当前元素。
    *  index（可选）：数组中正在处理的当前元素的索引。
    *  _arr（可选）：调用了 some 的数组。
  *  thisArg（可选）：可选参数。当执行回调 函数时用作this的值(参考对象)。

* 返回值： 只要有一个元素通过指定函数的测试返回true，否则返回false。

**不改变原数组**

## indexOf
indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```js
arr.indexOf(searchElement)
arr.indexOf(searchElement[, fromIndex = 0])
```

* 参数
  *  searchElement：要查找的元素
  *  fromIndex：开始查找的位置。
    *  如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。
    *  如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。
    *  如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

* 返回值：首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

## lastIndexOf
lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

> arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])

* 参数
  *  searchElement：要查找的元素
  *  fromIndex：从此位置开始逆向查找。
    *  默认为数组的长度减 1，即整个数组都被查找。
    *  如果该值大于或等于数组的长度，则整个数组会被查找。
    *  如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

* 返回值：数组中最后一个元素的索引，如未找到返回-1

```js
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
```

## reduce
reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

> arr.reduce(callback[, initialValue])

* 参数
  *  callback：执行数组中每个值的函数，包含四个参数：
    *  acc：累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
    *  val：数组中正在处理的元素。
    *  index（可选）：数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
    *  _arr（可选）：调用reduce的数组
  *  initialValue（可选）: 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

* 返回值： 函数累计处理的结果


## reduceRight
reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

> arr.reduceRight(callback[, initialValue])

* 参数
  *  callback：执行数组中每个值的函数，包含四个参数：
    *  acc：累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
    *  val：数组中正在处理的元素。
    *  index（可选）：数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
    *  _arr（可选）：调用reduce的数组
  *  initialValue（可选）: 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

* 返回值： 函数累计处理的结果

```js
// 二维数组扁平化至一维数组
var flattened = [[0, 1], [2, 3], [4, 5]].reduce((acc, val) => {
    return acc.concat(val);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```
```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);
// flattened is [4, 5, 2, 3, 0, 1]
```
```js
var a = ['1', '2', '3', '4', '5']; 
var left  = a.reduce(function(prev, cur)      { return prev + cur; }); 
var right = a.reduceRight(function(prev, cur) { return prev + cur; }); 

console.log(left);  // "12345"
console.log(right); // "54321"
```
---
ES6 分割线

## Array.from() 
Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

> Array.from(arrayLike[, mapFn[, thisArg]])

* 参数
  *  arrayLike：想要转换成数组的伪数组对象或可迭代对象。
  *  mapFn (可选)：如果指定了该参数，新数组中的每个元素会执行该回调函数。
  *  thisArg (可选参数)：可选参数，执行回调函数 mapFn 时 this 对象。

* 返回值：一个新的数组实例

```js
Array.from('foo'); 
// ["f", "o", "o"]

let s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]

Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```
```
// 数组去重合并
function combine() { // 此处不可用ES6函数变量声明形式，因为会没有arguments
  let arr = [].concat.apply([],arguments); //没有去重复的新数组 
  return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));                     // [1, 2, 3]
```

## Array.of()
Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

> Array.of(element0[, element1[, ...[, elementN]]])

* 参数
  *  elementN：任意个参数，将按顺序成为返回数组中的元素。

* 返回值：新的 Array 实例。

```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```
Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位的数组，而不是由7个undefined组成的数组）。

## copyWithin()
copyWithin() 方法**浅复制**数组的一部分到**同一数组**中的**另一个位置**，**并返回**它，而不修改其大小。

> arr.copyWithin(target[, start[, end]])

* 参数
  *  target：0 为基底的索引，复制序列到该位置。
    *  如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
  *  start：0 为基底的索引，开始复制元素的起始位置。
    *  如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
  *  end：0 为基底的索引，开始复制元素的结束位置。
    *  copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。如果 end 被忽略，copyWithin 将会复制到 arr.length。

* 返回值：改变了的数组。

```js
[1, 2, 3, 4, 5].copyWithin(-2);
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}
```

**改变原数组**

## find()
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

> arr.find(callback[, thisArg])

* 参数
  *  callback：在数组每一项上执行的函数，接收 3 个参数：
    *  val：当前遍历到的元素。
    *  index：当前遍历到的索引。
    *  _arr：数组本身。
  *  thisArg （可选）：可选，指定 callback 的 this 参数。

* 返回值：当某个元素通过 callback 的测试时，返回数组中的一个值，否则返回undefined。

```js
// 从一个数组中寻找质数
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```

## findIndex()
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

> arr.findIndex(callback[, thisArg])

* 参数
  *  callback：在数组每一项上执行的函数，接收 3 个参数：
    *  val：当前遍历到的元素。
    *  index：当前遍历到的索引。
    *  _arr：数组本身。
  *  thisArg （可选）：可选，指定 callback 的 this 参数。

* 返回值：数组中满足提供的测试函数的第一个元素的索引，否则返回 -1。

## fill()
fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

> arr.fill(value[, start[, end]])

* 参数
  *  value：用来填充数组元素的值。
  *  start （可选）：起始索引，默认值为0。
  *  end （可选）：终止索引，默认值为 this.length。不包括end

* 返回值：修改后的数组。

```js
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
```

**改变原数组**

## entries()
entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

> arr.entries()

* 返回值：一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。

```js
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

/*Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/
```

```js
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());

/*{value: Array(2), done: false}
          done:false
          value:(2) [0, "a"]
           __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key":"value"]的数组，是返回的迭代器中的元素值。
```
```js
var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];

// for(var i=0; i< arr.length; i++){   // 实际使用的是这个 
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}
    
console.log(a);                         // 遍历完毕，输出next.value的数组
```
```js
// 二维数组按行排序
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
            goNext = true;
        } else {
            goNext = false;
        }
    }
    return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);

/*(4) [Array(2), Array(5), Array(5), Array(4)]
    0:(2) [1, 34]
    1:(5) [2, 3, 44, 234, 456]
    2:(5) [1, 4, 5, 6, 4567]
    3:(4) [1, 23, 34, 78]
    length:4
    __proto__:Array(0)
*/
```
```js
// 使用for…of 循环
var arr = ["a", "b", "c"];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```

## keys()
 keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。

> arr.keys()

* 返回值：一个新的 Array 迭代器对象。

```js
var array1 = ['a', 'b', 'c'];
var iterator = array1.keys(); 
  
for (let key of iterator) {
  console.log(key); // expected output: 0 1 2
}
```

## values()
values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

> arr.values()

* 返回值：一个新的 Array 迭代器对象。

```js
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
// 您的浏览器必须支持 for..of 循环
// 以及 let —— 将变量作用域限定在 for 循环中
for (let letter of eArr) {
  console.log(letter);
}
```
```js
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
console.log(eArr.next().value); // k
console.log(eArr.next().value); // o
console.log(eArr.next().value); // p
```

## 瞎唠嗑 forEach，for-in，for-of
传统循环
```js
for (let index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```
自从JavaScript5起，我们开始可以使用内置的forEach方法：
```js
myArray.forEach((value) => {
  console.log(value);
});
```
写法简单了许多，但也有短处：你不能中断循环(使用break语句或使用return语句。

JavaScript里还有一种循环方法：for–in。

for-in循环实际是为循环”enumerable“对象而设计的：
```js
var obj = {a:1, b:2, c:3};
    
for (let prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// 输出:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```
也可以用它来循环一个数组：
```js
for (let key in myArray) {    // 不推荐这样
  console.log(myArray[key]);
}
```
不推荐用for-in来循环一个数组，因为，不像对象，数组的index跟普通的对象属性不一样，是重要的数值序列指标。

总之，for–in是用来循环带有字符串key的对象的方法。

JavaScript6里引入了for-of循环，它既比传统的for循环简洁，同时弥补了forEach和for-in循环的短板。

```js
for (var value of myArray) {
  console.log(value);
}
```
for-of的语法看起来跟for-in很相似，但它的功能却丰富的多，它能循环很多东西。

* 循环一个数组(Array)
* 循环一个字符串
* 循环一个类型化的数组(TypedArray)
* 循环一个Map
* 循环一个 Set
* 循环一个 DOM collection
* 循环一个拥有enumerable属性的对象
* 循环一个生成器(generators)

[JavaScript里的循环方法：forEach，for-in，for-of](http://www.webhek.com/post/javascript-loop-foreach-for-in-for-of.html)