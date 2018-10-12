# JavaScript 设计模式
* [单例模式](#单例模式)
* [代理模式](#代理模式)
* [装饰者模式](#装饰者模式)
* [观察者模式](#观察者模式)
* [策略模式](#策略模式)
* [工厂模式](#工厂模式)


## 单例模式
> 单例模式（Singleton），只允许实例化一次的对象类。也用一个对象来规划命名空间。  
> 解决问题：定义命名空间、管理代码库各个模块、管理静态变量、惰性单例  
> 实现方法：先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

### 创建一个小型的代码库
使用场景：规范代码库的各个模块
```
var A = {
  Util:{
    util_method1:function(){},
    util_method2:function(){}
  },
  Tool:{
    tool_method1:function(){},
    tool_method2:function(){}
  }
}

A.Util. util_method1();
```

### 惰性单例
**使用场景**：像登录悬浮框，在整个页面中只会有一个，无论用户点击多少次，只会被创建一次
```
var LazySingle = (function(){
  var _instance = null;
  function Single(){
    //这里定义私有属性和方法
    return {
       publicMethod:function(){},
       publicProperty:'1.0'
    }
  }
  //获取单例对象的接口
  return function(){
    if(!_instance){
      _instance = Single();
    }
    return _instance;
  }
})();

console.log(LazySingle().publicProperty);
```
立即执行函数用于隔离作用域，返回的是一个函数，如果之前创建过这个函数，便用闭包保存，下次使用的时候直接载入闭包

[JavaScript设计模式学习—单例模式](https://segmentfault.com/a/1190000005921654)

## 代理模式
> 代理模式（Proxy），由于一个对象不能直接引用另一个对象，所以需要通过代理对象在这两个对象之间起到中介的作用

### 代理对象img标签
**使用场景**：用loading图片替代图片的真实src，创建一个img元素(代理)加载图片的真实src。加载完之后，图片的src替换掉loading

img的src属性可以向其他域下的服务器发送请求（get），不会有响应数据
```
myImage = (function(){
    var img = document.createElement("img");
    document.body.appendChild(img);
    return {
        setSrc:function(src){
            img.src = src;
        }
    }
})()

proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage.setSrc(this.src)
    }
    return {
        setSrc:function(src){
            myImage.setSrc("load.gif");
            img.src = src;
        }
    }
})()
proxyImage.setSrc('http://test.jpg'); 
```

### 代理对象script标签
使用场景：模块代码迁移到另一个域（服务器）时，因同源策略，需要解决跨域问题

src可以实现get请求，因此我们可以在src指向的url上面添加一些字段信息，然后服务器端获取这些字段再相应生成一份内容
```
<script>
function jsonpCallBack(res,req){
  console.log(res,req);
}
</script>
<script src="http://localhost/test/jsonp.php?callback=jsonpCallBack"></script>
//后端获取请求字段数据，并生成返回内容
```
 [Javascript设计模式之——代理模式](https://segmentfault.com/a/1190000009706312)


## 装饰者模式
> 装饰者模式（Decorator）：在不改变原对象的基础上，通过对其进行包装扩展（添加属性或者方法），使原有对象可以满足用户更复杂的需求

使用场景：用户表单信息发生变化，以前是用户点击输入框时，后面显示用户输入内容的限制格式的提示文案，
现在加一条，默认输入框上面显示一行提示文案，当用户输入时文案消失。

```
var decorator = function(input,fn){
  var input = document.getElementById(input);
  if(typeof input.onclick === 'function'){
     var oldClickFn = input.onclick;
     input.onclick = function(){
        oldClickFn();
        fn();
     }
  }else{
     input.onclick = fn;
  }
//do other thing
}

decorator('tel_input',function(){
  document.getElementById('tel_demo_text').style.display = 'none';
});     
```
适配器方法是对原有对象适配，添加的方法和原有方法功能上大致相似。装饰者提供的方法与原来的方法功能项有一定区别的。再有，**使用适配器时我们新增的方法是要调用原来的方法。装饰器模式中，不需要了解对象原有的功能，并且对象原有的方法照样可以原封不动地使用**。

## 观察者模式
> 观察者模式（Observer）：发布-订阅者模式，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合，解决类或对象之间的耦合，解耦两个互相依赖的对象【模块解耦】

```
//将观察者放在闭包中，当页面加载立即执行
var Observer = (function() {
    //防止消息队列暴漏而被篡改故将消息容器作为静态私有变量保存
    var _messages = {};
    return {
        regist: function(type, fn) {
            if (typeof _messages[type] === 'undefined') {
                _messages[type] = [fn];
            } else {
                _messages[type].push(fn);
            }
        },
        fire: function(type, args) {
            if (!_messages[type])
                return;
            var events = {
                    type: type,
                    args: args || {}
                },
                i = 0,
                len = _messages[type].length;
            for (; i < len; i++) {
                _messages[type][i].call(this, events);
            }
        },
        remove: function(type, fn) {
            if (_messages[type] instanceof Array) {
                var i = _messages[type].length - 1;
                for (; i >= 0; i--) {
                    _messages[type][i] == fn && _messages[type].splice(i, 1);
                }
            }
        }
    }
})();
Observer.regist('test', function(e) {
    console.log(e.type, e.args.msg);
});
Observer.fire('test', {
    msg: '传参'
});
```

**使用场景**：订阅感兴趣的专栏和公众号。

## 策略模式
> 策略模式（Strategy）：将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定的独立性，不会随客户端变化而变化。

使用场景：jQuery的动画缓冲函数、表单验证模块

```
var InputStrategy = function() {
    var strategy = {
        notNull: function(value) {
            return /\s+/.test(value) ? '请输入内容' : '';
        },
        number: function(value) {
            return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字'；
        },
    }
    return {
        check: function(type, value) {
            value = value.replace(/^\s+|\s+$/g, '');
            return strategy[type] ? strategy[type](value) : '没有该类型的检测方法',
        }
        addStrategy: function(type, fn) {
            strategy[type] = fn;
        }
    }
}();
```

## 工厂模式
### 简单工厂模式
> 简单工厂模式（SimpleFactory）：用于创建同一类对象

```
var LoginAlert = function(text) {
    this.content = text;
}
LoginAlert.prototype.show = function() {

}
var LoginConfirm = function(text) {
    this.content = text;
}
LoginConfirm.prototype.show = function() {

}
var PopFactory = function(name) {
    switch (name) {
        case 'alert':
            return new LoginAlert();
            break;
        case 'confirm':
            return new LoginConfirm();
            break;
    }
}
```
抽取相似部分，对不同部分进行相似性处理
```
function createPop(type, text) {
    var o = new Object();
    o.content = text;
    o.show = function() {
        //
    };
    switch (type) {
        case 'alert':
            // statements_1
            break;
        case 'confirm':
            // statements_1
            break;
    }
    return o;
}
```
### 工厂方法模式
> 工厂方法模式（Factory Method）:通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例

```
//安全模式创建的工厂类
var Factory = function(type, content) {
        if (this instanceof Factory) {
            var s = new this[type](content);
            return s;
        } else {
            return new Factory(type, content);
        }
    }
    //工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
    Java: function(content) {
        //
    },
    UI: function(content) {
       this.content=content;
        (function(content){
            var div=document.createElement('div');
            div.innerHTML=content;
            div.style.border="1px solid red";
            document.getElementById('container').appendChild(div);
        })(content);
    },
    Php: function(content) {
        //
    },
}
```

简单工厂模式解决了入口不统一的问题

工厂模式解决了修改地点不统一的问题

### 抽象工厂模式
> 抽象工厂模式(Abstract Factory):通过对类的工厂对象使其业务用于对产品类簇的创建，而
> 不负责创建某一类产品的实例

抽象工厂在大型项目的使用更多,大概的思路是在父类里面设计好接口(没有具体实现),具体的实现等到了子类再重写.
```
var Car = function(){};
Car.prototype = {
    getPrice:function(){ throw new Error("抽象方法不能调用")},
    getSpeed:function(){ throw new Error("抽象方法不能调用")}
};
//这里使用Object.create()继承,子类到父类中会多一个中间过渡函数Temp(){};防止在子类的prototype覆盖父类;可见参考资料
aBMW = Object.create(Car.prototype);
    
aBMW.getPrice();  // 抽象方法不能调用
aBMW.getPrice = function(){
    console.log("I am getting price");
};
aBMW.getPrice(); //I am getting price
```
抽象工厂模式解决了子类实现不规范的问题