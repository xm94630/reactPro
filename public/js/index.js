/***********************************
 * react 启程
 ***********************************/
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

//模块1：一个常量
import {module1} from './myModule1.js'
import {module1 as zhangsan} from './myModule1.js';//别名的写法
l(module1)
l(zhangsan)
//模块2：一个对象
import {module2} from './myModule2.js'
l(module2)
//模块3：多个
import {mini1,mini2,mini3} from './myModule3.js'
l(mini1,mini2,mini3)
//模块4：as
import {cat} from './myModule4.js'
l(cat)
//模块5：default 这种情况下可以随便命名，大括号也不是必须的
import xxx from './myModule5.js'
l(xxx)
//模块6：利用其他模块，间接使用模块1
import yyy from './myModule6.js'
l(yyy)
//模块7：混合
import lala from './myModule7.js'
import {tree} from './myModule7.js'
l(lala)
l(tree)
//模块8：default
import jj2 from './myModule8.js'
l(jj2)
//模块9：综合
import x from './myModule9.js'
l(x)
import {ji,foo} from './myModule9.js'
l(ji,foo)
//这里获取全部的导出，在myModule9对象中！另外它有个私有属性__esModule
import * as myModule9 from './myModule9.js'
l(myModule9)  


//import这个方法只有es6才得到支持，目前在node中都是不支持的。
//当然在我们这里使用是没有问题的。
//import ReactDOM from'react-dom';


var bee = (function(bee){
  
  /*
   * 实例1:简单的开始
   */
  bee.caseA1 = function(){

    var ExampleApplication = React.createClass({
      render: function() {
        var elapsed = Math.round(this.props.elapsed  / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        var message =
          '记录时间开始2===>' + seconds;

        return <p>{message}</p>;
      }
    });
    var start = new Date().getTime();
    setInterval(function() {
      ReactDOM.render(
        <ExampleApplication elapsed={new Date().getTime() - start} />,
        document.getElementById('container')
      );
    }, 50);
  }


  /*
   * 实例2:
   */
  bee.caseA2 = function(){
  }



  return bee;
})(bee||{});

bee.caseA1();





