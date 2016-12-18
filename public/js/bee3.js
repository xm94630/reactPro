/*
 * 之前的 bee.js 和 bee2.js 都是用es6的形式写的
 * 我这里采用兼容amd\commonJS\window 的形式来写。
 * 另外，下面这种写法，因为在复合成一个整体的好处是，所有的局部变量都被
 * 放置到一个闭包中，非常干净利索。
 */

;(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory;
  } else {
    root.MockSchema = factory;
  }
}(this,function(global){

  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');


  var bee = (function(bee){

    /*
     * 实例1:案例
     */
    bee.caseA1 = function(){

    }

    return bee;
  })(bee||{});

  return bee;

}(this)));


