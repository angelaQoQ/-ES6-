## let
```js
  严格模式下函数声明在块级作用域--双花括号 中,是错误的.但是ES5中浏览器是为了保证兼容不报错
  ES6 规定，块级作用域之中，函数声明语句的行为类似于let
```

## const
```js
  const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变;
  所以将一个对象声明为常量必须非常小心

  如果不允许修改对象内容可以使用:Object.freeze方法, 严格模式下报错,常规模式起作用但是不报错
  const foo = Object.freeze({});
  foo.a = 1 

  // 封装一个 冰冻对象 函数
  var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
  
```

## ES6变量生命方式有6中
```js
  var
  function
  let
  const 
  import 
  class

  从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
  // var命令和function命令声明的全局变量，依旧是顶层对象的属性--------是window的
  // let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性--不属于window

```

## ES中的顶层对象
```js
  ES5的顶层对象:
    浏览器里面是window
    Node 里面是global

  返回全局对象的方法:
  // 方法1
  (typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);
  // 方法2
  var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };

  this在浏览器全局环境中指 window对象 ; 在node和ES6环境中指向当前模块

  // 垫片库system.global可以在所有环境拿到global
  // CommonJS的写法
  require('system.global/shim')();
  // ES6模块的写法
  import shim from 'system.global/shim'; shim();
```


## 解构赋值
``` js
  只要等号右边的值不是对象，就先将其转为对象
  undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

  使用:
  1 交换变量的值:  [x, y] = [y, x];
  2 从函数返回多个值
    // 返回一个数组
    function example() {
      return [1, 2, 3];
    }
    var [a, b, c] = example();
  3 传参(数组或对象)
    function f([x, y, z]) { ... }
    f([1, 2, 3]);
  4 提取JSON数据
    var jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    };
    let { id, status, data: number } = jsonData;
  5 函数参数的默认值
    jQuery.ajax = function (url, {
      async = true,
      beforeSend = function () {},
      cache = true,
      complete = function () {},
      crossDomain = false,
      global = true,
      // ... more config
    }) {
      // ... do stuff
    };

  注意:
  1 解构是针对数组和对象的赋值操作.  关键字 "匹配"
  2 解构不成功，变量的值就等于undefined
  3 如果等号的右边不是数组或不能遍历的数据,如数字布尔值等 就会报错: 右侧值不能被遍历
  4 let和const命令也可以使用解构赋值
  5 解构赋值允许指定默认值。var [foo = true] = [];
  6 ES6内部使用 === 来做解构值存在与否判断, 严格模式下解构赋值 要给undefined 
      var [x = 1] = [undefined]; 不然默认值不生效
  7 解构默认值是表达式时, 使用变量时才会执行 默认值表达式
  8 默认值可以是 已经声明的变量(代码从左向右执行,左边声明右边可以直接用)
  9 对象的解构赋值 是先找到同名属性，然后再赋给对应的变量
  10 数组的对象都有一个length属性,可以对这个属性解构赋值。let {length : len} = 'hello';len; // 5
```

## 解构时小括号问题
```js
  1 变量声明语句中，不能带有圆括号。
    var [(a)] = [1]; || var {x: (c)} = {}; || var {(x): c} = {};
  2 函数参数中，模式不能带有圆括号。---函数参数也属于变量声明
    function f([(z)]) { return z; }
  3 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
    ({ p: a }) = { p: 42 };

  4 可以使用圆括号的情况:赋值语句的非模式部分，可以使用圆括号。
```



## 正则
```js
  ES5中正则创建的方式:
    1 1参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
      var regex = new RegExp('xyz', 'i');
      // 等价于
      var regex = /xyz/i;
    2 参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
      ES5不允许此时使用第二个参数，添加修饰符，否则会报错
      var regex = new RegExp(/xyz/i);
      // 等价于
      var regex = /xyz/i;

    3 字符串的正则方法
      match()、replace()、search()和split()。

    4 u修饰符 可以处理四个字节的UTF-16编码。

    5 y 修饰符:全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始
      y修饰符要求匹配必须从头部开始,在检测内容后如果剩余内容不是正则匹配的就会返回null
      sticky属性表示是否设置了y修饰符。 
      var r = /hello\d/y;
      r.sticky // true

    6 ES5的source属性返回正则表达式的正文
      /abc/ig.source
      // "abc"
      ES6的flags属性返回正则表达式的修饰符
      /abc/ig.flags
      // 'gi'

```

## 数值
```js
  1 二进制和八进制表示法 分别用前缀0b（或0B）和0o（或0O）表示。
    要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
    Number('0b111')  // 7
    Number('0o10')  // 8

  2 Number.isFinite(), Number.isNaN()
    Number.isFinite()用来检查一个数值是否为有限的（finite）
        Number.isFinite(15); // true
        Number.isFinite(0.8); // true
        Number.isFinite(NaN); // false
    Number.isNaN()用来检查一个值是否为NaN
        Number.isNaN(NaN) // true
        Number.isNaN(15) // false

  3 Number.EPSILON的实质是一个可以接受的误差范围
        5.551115123125783e-17 < Number.EPSILON // true
  
  4 Math.trunc() 方法用于去除一个数的小数部分，返回整数部分
        Math.trunc(4.1) // 4
    对于非数值，Math.trunc内部使用Number方法将其先转为数值,对于空值和无法截取整数的值，返回NaN。

  5 Math.sign() 用来判断一个数到底是正数、负数、还是零。
        参数为正数，返回+1；
        参数为负数，返回-1；
        参数为0，返回0；
        参数为-0，返回-0;
        其他值，返回NaN。

  6 指数运算符（**）
        2 ** 2 // 4
        2 ** 3 // 8

```

## 数组方法
```js
  1 Array.from() 将伪数组转成数组
    let arrayObj = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    // ES5的写法
    var arr1 = [].slice.call(arrayObj);
    // ES6的写法
    let arr2 = Array.from(arrayObj); 

  2 Array.of() 用于将一组值，转换为数组。
        Array.of(3, 11, 8) // [3,11,8]

  3 entries()，keys()和values()——用于遍历数组返回一个遍历器对象,不是数组---Iterator 只能使用for..of遍历,
    keys()是对键名
    values()是对键值
    entries()是对键值对
    可以配合扩展运算符 转成 真正的数组
      > var arr = ['1' , '2' , 'a']
      undefined
      > var arr2 = [...arr.keys()]
      undefined
      > arr2
      [ 0, 1, 2 ]
```

## 函数的扩展
```js
  1 函数的length属性:返回没有指定默认值的参数个数
    (function (a) {}).length // 1

  2 从ES5开始，函数内部可以设定为严格模式。
    只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

  3 箭头函数里面的this，绑定定义时所在的作用域.而不是指向运行时所在的作用域.
    箭头函数里面根本没有自己的this，而是引用外层的this。

  4 函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
      foo::bar;
      // 等同于
      bar.bind(foo);
    如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
      var method = obj::obj.foo;
      // 等同于
      var method = ::obj.foo;
    由于双冒号运算符返回的还是原对象，因此可以采用链式写法
      document.querySelectorAll("div.myClass")
      ::find("p")
      ::html("hahaha");

  5 尾调用 优化
      尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
        function f(x){
          return g(x);
        }
      '尾调用优化 '的意义:即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存
  
  6 尾递归 :函数调用自身，称为递归。如果尾调用自身，就称为尾递归
    递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
      function factorial(n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
      }
      factorial(5) // 120
      // 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
      function factorial(n, total) {
        if (n === 1) return total;
        return factorial(n - 1, n * total);
      }

      factorial(5, 1) // 120

    斐波那契尾递归:
      function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
        if( n <= 1 ) {return ac2};

        return Fibonacci2 (n - 1, ac2, ac1 + ac2);
      }
      Fibonacci2(100) // 573147844013817200000

    递归改尾递归: 
     1 把所有用到的内部变量改写成函数的参数
     2 尾递归函数之外，再提供一个正常形式的函数。
    
    小知识: 柯里化（currying），意思是将多参数的函数转换成单参数的形式
```


## 对象
```js
  1 属性名表达式 表达式放在属性的方括号内. 注意要和属性值一起使用,否则会报错
    let propKey = 'foo';
    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };
  
  2 对象方法也具有name属性返回函数名字

  3 Object.is(值1 , 值2) 判断两个值是否完全相同
  可以解决:  NaN与自身相等,  +0和-0不等
    // ES5实现：
    Object.defineProperty(Object, 'is', {
      value: function(x, y) {
        if (x === y) {
          // 针对+0 不等于 -0的情况
          return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况:如果两个值和自身都不相同就是NaN
        return x !== x && y !== y;
      },
      configurable: true,
      enumerable: false,
      writable: true
    });

  4 Object.assign(目标对象 , 数据对象1 , 数据对象2) 
    var target = {a:1}
    var source1 = {b:2}
    var source2  = {c:3}

    Object.assign(target , source1 , source2)
    //  target === {a:1 , b:2 , c:3}
    1 如果有参数和目标有同名属性,值后来居上
    2 如果参数不是对象则会先转换成对象再做处理.注意: null undefined 不能转对象,做参数会报错
    3 Object.assign() 是浅拷贝,复杂数据类型值整合的是地址

    作用: 
    1 给对象添加属性/方法
    2 克隆对象
        // 只克隆实例,不能克隆原型方法
        function clone(paramObj){
          return Object.assign({}, paramObj)
        }
        // 克隆的对象同时有属和方法
        function clone(paramObj){
          // 克隆参数对象属性
          let tmp = Object.assign({} , paramObj)
          // 绑定原型
          tmp.__proto__ = paramObj.__proto__
          return tmp
        }
    3 合并多个对象
      const merge =  (...args)=>Object.assign({} , ...args)
  5 对象属性的可枚举性
    对象的每个属性都一个描述对象(Descriptor),用来控制该属性的行为
    Object.getOwnPropertyDescriptor() 可以获取对象属性的描述对象
        let obj = {foo : 123}
        Object.getOwnPropertyDescriptor('foo')
        -->结果 { value:123 , writable:true , enumerable:true , configurable:true }
  6 ES6中 所有Class的原型方法都是不可枚举的

```
## 对象属性遍历:
```js
  1 for...in 循环遍历对象自身的和继承的可枚举属性,不含Symbol属性
  2 Object.keus(obj) 返回一个标书组包括对象自身所有可枚举属性, 不含继承和Symbol
  3 Object.getOwnPropertyNames(obj) 返回一个数组,包含自身所有属性,包含不可枚举属性,不包括Symbol
  4 Object.getOwnPropertySymbols(obj) 返回一个数组,包含对象自身所有的Symbol属性
  5 Reflect.ownKeys(obj) 返回对象所有的  所有的属性组成的数组
```

## 设置对象属性
```js
  Object.setPrototypeOf() 和 __proto__相同用来设置对象原型对象,是ES6推荐的设置原型方法的方法
      Object.setPrototypeOf(tempObj,prototype)
      var o = Object.setPrototypeOf({}, null)---------不懂, 不如直接修改实例的__proto__属性直观

      属性继承:
        let fu = {}
        let zi = {a:10}
        Object.setPropertyOf(zi , fu )
        fu.a = 1
        fu.b = 2
        console.log(zi.a)//10  自己有就用自己的
        console.log(zi.b)//2   自己没有就用父对象的
```
## 获取原型对象
```js
  读取一个对象的prototype对象
  Object.getPrototypeOf(实例对象)
```

## 获取对象属性, 值, 键值对
```js
  let obj = {
    a: 1,
    b: 2,
    c: 3
  }

   Object.keys(obj)//[ 'a', 'b', 'c' ] 将对象所有属性组成数组返回
   Object.values(obj)//[ 1, 2, 3 ] 将对象所有值 组成数组返回
   Object.entries(obj)//[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]  将对象键值对修改为多个两个项的数组, [[键,值] , [键,值]]
```

## Symbol
```js
  JS中第七种原始数据类型: 表示独一无二的值
  其他6中数据:  undefined  null boolean string number object
  Symbol值通过Symbol函数生成,对象的属性名现在可以有两种类型:  
    1 之前的字符串类型属性
    2 新增Symbol类型,凡是属性名属于Symbol类型都是独一无二的,可以保证与其他属性名 不会冲突
      let s = Symbol()
      typeof s
  解决问题: 在使用对象 并给其添加属性时不会再出现属性名相同,覆盖旧属性值 或者 添加新属性失败的问题
  注意: 在创建时不能使用new关键字, 因为Symbol类型不是对象,它很接近于字符串类型.
  在创建时,可以结构一个字符串做参数,表示对Symbol实例的描述,主要是为了在控制台显示. 或者转为字符串的会后比较容易区分
      var s1 = Symbol('foo')
      var s2 = Symbol('bar')
      s1.toString() // 'Symbol(foo)'
      s2.toString() // 'Symbol(bar)'
  即使描述传参相同的Symbol数据, 值也是不同的,因为Symbol数据类型就是为了唯一性

  Symbol值不能与其他数据类型的值进行运算,会报错
  但是，Symbol值可以显式转为字符串 或 布尔值, 不能转成数字
      String(Symbol('test'))
      Symbol('test2').toString()
  使用Symbol类型数据做方法名: 
      let obj = {
        [Symbol('fn')](...args){}
      }
  

```