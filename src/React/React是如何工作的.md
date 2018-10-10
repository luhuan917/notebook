# React是如何工作的

## Virtual Dom VS Browser Dom
React 除了是 MVC 框架，**数据驱动**页面的特点之外，核心的就是他很"快"。 按照普遍的说法："因为直接操作 DOM 会带来重绘、回流等，带来巨大的性能损耗而导致渲染慢等问题。React使用了 Virtual DOM，每次状态更新，React 比较 Virtual DOM的差异之后，再更改变化的内容，最后统一由 React 去修改真实 DOM、完成页面的更新、渲染。"

> 什么是 Virtual DOM，React 是怎么进行比较的？Diff 算法了解吗？

* Virtual DOM 是 React 的核心，它的本质是 JavaScript 对象；
* BrowserDOM（也就是页面真实 DOM）就是 Browser 对象了。

Virtual DOM 的特点
1. 本质是 JS 对象，代表着真实的 DOM
2. 比真实 DOM 的比较和操作快的多
3. 每秒可创建 200,000 个 Virtual DOM 节点
4. 每次 setState 或 despatch 一个 action，都会创建一次全新的 Virtual dom

每一个改动，每一个动作都会让React去根据当前的状态创建一个全新的Virtual DOM。

**在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，而仅仅是 JavaScript 对象，称之为虚拟 DOM**。

React 会在内存中维护一个虚拟 DOM 树，对这个树进行读或写，实际上是对虚拟DOM 进行读写。当数据变化时，React 会自动更新虚拟 DOM，然后将新的虚拟 DOM 和旧的虚拟 DOM 进行对比，找到变更的部分，得出一个 diff，然后将 diff 放到一个**队列**里，最终**批量更新**这些 diff 到 DOM 中。

![alt](./imgs/how-1.png)

### 策略
两个树的完全的 diff 算法是一个时间复杂度为 O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动DOM元素。所以 Virtual DOM 只会对同一个层级的元素进行对比：

![alt](./imgs/how-2.png)

上面的div只会和同一层级的div对比，第二层级的只会跟第二层级对比。这样算法复杂度就可以达到 O(n)。

### 深度优先遍历
在实际代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记，然后记录差异

![alt](./imgs/how-3.png)

比如第上图中的1号节点p，有了变化，这样子就记录如下：
```
patches[1] = [{difference}, {difference}...]//用数组存储新旧节点的差异
```

[diff的实现](https://github.com/azl397985856/mono-react/blob/lecture/part6/src/diff.js)