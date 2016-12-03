'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
//import这个方法只有es6才得到支持，目前在node中都是不支持的。
//当然在我们这里使用是没有问题的。
//import ReactDOM from'react-dom';

var bee = (function(bee){

  /*
   * 实例0:案例
   */
  bee.caseA0 = function(){

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
   * 实例1:简单的开始
   * 我在baseTask项目中，就模拟了本案例中React的实现
   * 所以下面这个对我来说是最简单的开始。
   */
  bee.caseA1 = function(){
    var Text = React.createClass({
      render: function() {
        return React.DOM.p(null, this.props.thisName+'是个文字组件，啥也没有干哟');
      }
    });
    var myFactory = React.createFactory(Text);
    ReactDOM.render(
      myFactory({thisName:'XXX'}),
      document.getElementById('container')
    );
  }

  /*
   * 实例2: js语法 + HTML便签
   * 这个项目是用node在监听的，所以直接就支持了es6+react(jsx)的写法
   * 如果没有node协助的话，只需要再引入一个js文件就好了：
   * browser.min.js（其实也就是常说的babel）
   *
   * 另外，在弄这个实例的时候，我在baseTask项目中做了react的实现
   * 所以下面这个就变得更加好理解了呢。
   */
  bee.caseA2 = function(){

    //创建类
    var Counter = React.createClass({
      getInitialState: function () {
        return { count: 0 };
      },
      handleClick: function () {
        this.setState({
          count: this.state.count + 1,
        });
      },
      render: function () {
        //这里之前用的是常见的创建DOM元素的过程，这里采用了这样子的方法。其实也是超级好理解的
        return (
          <button onClick={this.handleClick}>
            Click me! Number of clicks: {this.state.count}
          </button>
        );
      }
    });
    ReactDOM.render(
      //这种标签的写法，其实和从工厂生成一个实例是一样的！
      <Counter />,
      //<Counter></Counter>,  //和上面的一样的
      document.getElementById('container')
    );
  }

  return bee;
})(bee||{});


export default bee;




