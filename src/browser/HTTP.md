# HTTP
## 历史
### HTTP/0.9
1990年提出的，是最早期的版本，只有一个命令GET。

### HTTP/1.0
1996年5月提出的。

* 缺点：每个TCP连接只能发送一个请求。
* 解决方法：Connection：keep-alive

### HTTP/1.1
1997年1月提出，现在使用最广泛的。

* **长连接**：TCP连接默认不关闭，可以被多个请求复用。对于同一个域名，大多数浏览器允许同时建立6个持久连接。默认开启Connection：keep-alive。
* **管道机制**：在同一个TCP连接里，可以同时发送多个请求。但是服务器还是要按照请求的顺序进行响应，会造成“队头阻塞”。

## HTTP 报文结构
### 请求报文
![alt](./imgs/http-1.png)

### 响应报文
![alt](./imgs/http-2.png)

### 报文首部
1. **通用首部字段**

* Cache-Control：操作缓存的工作机制
  * public：明确表明其他用户也可以利用缓存

## 来源文章
[HTTP协议知识点总结](https://ddduanlian.github.io/2018/06/22/http_note/)
> http