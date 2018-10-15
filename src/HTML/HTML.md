# HTML

## meta标签
提供给页面的一些元信息（名称/值对）， 比如针对搜索引擎和更新频度的描述和关键词。

```
<meta name="keywords" content="HTML,ASP,PHP,SQL">
```
* name：名称/值对中的名称。常用的有author、description、keywords、generator、revised、others。 把 content 属性关联到一个名称。
* http-equiv：没有name时，会采用这个属性的值。常用的有content-type、expires、refresh、set-cookie。把content属性关联到http头部。
* content（必需）： 名称/值对中的值， 可以是任何有效的字符串。 始终要和 name 属性或 http-equiv 属性一起使用。
* scheme： 用于指定要用来翻译属性值的方案。

## src和href的区别
* **src**：**表示引用资源，替换当前元素**。用在img，script，iframe上，src是页面内容不可缺少的一部分。
* **href**：**标识超文本引用**，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系。

### src
src是source的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；在请求src资源时会将其指向的资源下载并应用到当前文档中，例如js脚本，img图片和frame等元素。

```<script src="js.js"></script>```当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把js放在底部而不是头部。

### href
```<link href="common.css" rel="stylesheet"/>```当浏览器解析到这一句的时候会识别该文档为css文件，会下载并且不会停止对当前文档的处理，这也是为什么建议使用link方式来加载css而不是使用@import。

补充：link和@import的区别，两者都是外部引用CSS的方式：
1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
3. link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4. link支持使用Javascript控制DOM去改变样式；而@import不支持。