/***********************************
 * react 启程
 ***********************************/
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

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
          '记录时间开始===>' + seconds;

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





