'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

//这个react-addons是有问题的，我们用下面这个代替就好了。
//var addons = require('react-addons');
var cssTransitionGroup = require('react-addons-css-transition-group');

//这个是为案例1引入的一个插件：
import {mock,createSchema} from 'mockschema';

/*
 * 这里的和bee.js中定义了同一个变量，其实他们并不是相同的一个。
 * 因为每个某块都是有独立的。
 */
var bee = (function(bee){

  /*
   * 实例1:案例
   * 本案例中使用了mockschema插件。这个是我在github上看到的。
   * 案例语法使用的是es6的，所以我正好这里使用一把。
   * 插件地址
   * https://github.com/luisvinicius167/mockschema
   * 我看了这个，发现其实非常简单的功能，我自己也能写一个
   * 上周的时候我自己已经掌握了npm插件的编写
   * 否则的话，这个案例正好供我写一个简单的插件来学习。
   * 源码还不到100行呢。
   * 不过里面出现了一个比较新鲜的玩样，是es6的 Object.assign
   * 我会在接下来的案例中学习。
   */
  bee.caseA1 = function(){

    createSchema({
      fish: {
        age: 25,
        name:'lala'
      },
      bird:{
        age: 19,
        width:200
      }
    });

    //如此一来就以数组的形式，模拟出了2个 fish 的数据
    var arr = mock('fish', 2);
    l(arr);
  }

  /*
   * 实例2: Object.assign (es6)
   */
  bee.caseA2 = function(){
    
    //这个用法类似于“$.extend”进行扩展
    //这里第一个参数作为源对象，后面的参数依次对其进行扩展。最后返回扩展后的源对象。
    //对象中有相同的字段的时候，后面的覆盖前面的！
    var obj = {a:1};
    var result = Object.assign(obj,{a:{b:123}},{c:999});
    l(obj);
    l(result);
    l(obj==result);

    //从这个例子中可以看出来，其实这个不适合深度复制的。
    //也就是，他仅仅对于第一个层级进行了处理。
    var b = {b:1};
    var a = {a:b};
    var c = Object.assign({},a);
    l(c)
    b.b = 123456;
    l(c)

    var o2 = { [Symbol("foo")]: 2 };
    l(o2)
  }

  /*
   * 实例3: Object.assign 的高级用法
   */
  bee.caseA3 = function(){
    
    //继承属性和不可枚举属性是不能拷贝的
    var obj = Object.create({foo: 1}, { // foo 是个继承属性。
        bar: {
            value: 2  // bar 是个不可枚举属性。
        },
        baz: {
            value: 3,
            enumerable: true  // baz 是个自身可枚举属性。
        }
    });

    var copy = Object.assign({}, obj);
    console.log(copy); // { baz: 3 }

    //默认一个普通的对象的属性是不可以枚举的。
    l(Object.prototype.propertyIsEnumerable({a:1}.a))

    //这里例子中的a属性是不可以枚举的，为何也是可以的。
    //和 上面的Object.create 的区别在于：
    //那个obj中的属性是在原型上的。
    //这里的是直接在对象自身就有的。
    //也就是准确的来说：原型的可枚举的属性，也能被 Object.assign 生效！！
    l(Object.assign({}, {a:123}))

  }

  /*
   * 实例4: Symbol 数据类型
   * Symbol 的文档也有不少内容，看着头痛。其实只要知道一点就好了：
   * 就是他作为唯一标示用的。常常作为对象的key来使用的。类似于：
   * {'456342374295424623647':123}
   */
  bee.caseA4 = function(){
    var a = Symbol("foo");
    var b = {[Symbol("foo")]:123};
    l(a);
    l(b);
    //唯一性，不和任何的值相等
    l(Symbol("foo")==Symbol("foo"));
  }

  /*
   * 实例5: Reflect.ownKeys 
   */
  bee.caseA5 = function(){
    function Fish(){
      this.age = 123;
    }
    Fish.prototype.type='fish'; 
    var fish = new Fish();
    var obj = Object.create(fish);
    l(fish)    
    l(obj)    
    obj[Symbol('xxx')] = 123;
    //Reflect.ownKeys 可以获取对象自己的key值(包含Symbol类型的)，不包括原型上的
    l(Reflect.ownKeys(obj));
  }

  /*
   * 实例6: Object.getOwnPropertySymbols 
   * 获取对象自己的symbol属性，不会把普通的字段显示出来
   */
  bee.caseA6 = function(){
    var obj = {
      name:'lala'
    }
    obj[Symbol('yy')]= 'haha'
    l(Object.getOwnPropertySymbols(obj))
  }


  /*
   * 实例7:
   */
  bee.caseA7 = function(){

  }
  bee.caseA7();



  return bee;
})(bee||{});


export default bee;



