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
   * 实例1: Object.assign
   * es6的 Object.assign
   */
  bee.caseA2 = function(){

  }



  return bee;
})(bee||{});


export default bee;



