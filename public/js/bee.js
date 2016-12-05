'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var addons = require('react-addons');
var cssTransitionGroup = require('react-addons-css-transition-group');
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
   *
   * 这个是浏览器端标准的写法，没有babel这个插件也可以呢~~
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
        return { count: this.props.start };
      },
      handleClick: function () {
        this.setState({
          count: this.state.count + 1,
        });
      },
      render: function () {
        //这里之前用的是常见的创建DOM元素的过程，这里采用了这样子的方法。其实也是超级好理解的
        return (
          //在这里变量的获取用{}
          <button onClick={this.handleClick}>
            我被点击了: {this.state.count} 次
          </button>
        );
      }
    });
    ReactDOM.render(
      //这种标签的写法，其实和从工厂生成一个实例是一样的！
      //另外这里传入属性的值的时候，也需要用{}，这样子才好识别
      <Counter start={100} />,
      //<Counter></Counter>,  //和上面的一样的
      document.getElementById('container')
    );
  }

  /*
   * 实例3: 有了babel.js 还可用标签的形式引入别的jsx文件
   * 这里是node跑的，就不模拟了。
   * <script type="text/babel" src="example.js"></script>
   */
  bee.caseA3 = function(){
  }

  /*
   * 实例4: 结合ES6的写法
   * 案例1浏览器端是标准的react写法
   * 案例2是js中使用了标签的写法
   * 案例3也js中使用了标签的写法，不过是通过页面引js文件的形式
   *
   * 这里是开始使用es6的语法了：
   * 这里使用了Class来代替之前的构造函数，其实是一样的。
   * 这里使用的 extends，是继承了 React.Component组件，其实本质上和之前的 React.createClass 是一样一样的。
   * 另外在渲染的时候，用了箭头函数，其实也没有别的了。
   */
  bee.caseA4 = function(){

    class Fish extends React.Component {
      render() {
        return <p>{this.props.run}</p>;
      }
    }
    setInterval(() => {
      ReactDOM.render(
        <Fish run={'小鱼跑啊跑'} />,
        document.getElementById('container')
      );
    }, 50);
  }

  /*
   * 实例5: 结合ES6的写法2
   */
  bee.caseA5 = function(){

    class Fish extends React.Component {
      //注意这里是和之前不是es6，最大的区别了！！！
      //以前我们用 getInitialState 来设置初始的状态值
      //这里我们不会在类中 写getInitialState 了，写了就报错
      //然后我就不知道去哪里写初始状态了，好在网上有了答案。
      //有人就问 React.createClass 和 extends Component 的区别，下面是答案：
      //These two ways depend on if you are using ES6 syntax or not, and they also change the way you set up your initial state.
      //When using ES6 classes, You should initialize state in the constructor.
      //When using React.createClass you have to use the getInitialState function.
      //讲解的非常好，正是我想要的结果！
      constructor(props) {
        super(props);
        this.state = {
          a:100
        };
      }
      myFun(e) {
        var value = e.target.value;
        this.setState({
          a:value
        });
      }
      render() {
        var a = this.state.a;
        //这里变量的渲染都是放在{}中的，这里的bind的使用也在我的理解之中
        return <input type="number" value={a} onChange={this.myFun.bind(this)}/>;
      }
    }

    ReactDOM.render(
      <Fish onChange={this.myFun} />,
      document.getElementById('container')
    );
  }


  /*
   * 实例6:把案例5 还原成非ES6的写法
   */
  bee.caseA6 = function(){

    var Fish = React.createClass({
      getInitialState:function(){
        return {a:100};
      },
      myFun:function(e) {
        var value = e.target.value;
        this.setState({
          a:value
        });
      },
      render:function() {
        var a = this.state.a;
        //关键要看看这里的事件绑定：
        //直接使用 this.myFun 就可以解析解析到正确的上下文
        //我觉得原因是这样子的：这里的语法（在js中使用标签）本来就是需要额外的解析工具来解析的
        //所以在提取 this.myFun 已经帮你内部完成了上下文的绑定就不需要你自己来手动绑定了(不过上面案例不支持，好奇怪)
        return <input type="number" value={a} onChange={this.myFun}/>;
        
        //用这个的时候，就会报错：道理已经说的很明白了！
        //Warning: bind(): 
        //You are binding a component method to the component. 
        //React does this for you automatically in a high-performance way, 
        //so you can safely remove this call. See Fish
        //return <input type="number" value={a} onChange={this.myFun.bind(this)}/>;
      }
    })

    ReactDOM.render(
      <Fish onChange={this.myFun} />,
      document.getElementById('container')
    );
  }

  /*
   * 实例7:同实例6
   */
  bee.caseA7 = function(){

    var Fish = React.createClass({
      getInitialState:function(){
        return {a:50};
      },
      myFun:function(canshu,e) {
        var value = e.target.value;
        this.setState({
          a:value
        });
      },
      render:function() {
        var a = this.state.a;
        //在这个案例中，使用bind就没有报错了，和上例的区别在于我提供了参数，
        //这样子，它认为你使用bind是有别的目的的——传参数，所以你就可以这样做。
        return <input type="number" value={a} onChange={this.myFun.bind(this,'传额外的参数就好了！')}/>;

        //然而这种写法也是对的...
        //这里吧this,改成了null,关键看null在bind中的意思了，
        //如果是表示，不改变this原来的指向，那理解起来就没有什么问题了。
        //我网上找到了答案，差不多意思：
        // using `null` here because we don't care about
        // the `this` hard-binding in this scenario, and
        // it will be overridden by the `new` call anyway!

        //return <input type="number" value={a} onChange={this.myFun.bind(null,'传额外的参数就好了！')}/>;
      }
    });

    ReactDOM.render(
      <Fish onChange={this.myFun} />,
      document.getElementById('container')
    );
  }


  /*
   * 实例8: react 结合 WebComponent
   * 目前谷歌浏览器就是支持这个 WebComponent，没有额外的插件
   */
  bee.caseA8 = function(){

    // 定义 WebComponent
    // 
    // attachedCallback : 是向文档中插入时候用到的回调方法
    // createdCallback  : 元素创建后调用
    // detachedCallback : 从文档中移除元素后调用
    // 
    // 我特意研究了 Object.create 才看懂这个。
    // 第二个参数是要符合属性配置的写法，这里的意思是：
    // 最后返回的例子，会新增一个 attachedCallback 的方法，方法的内容就是value对应的那个。
    // attachedCallback上面已经解释了~

    var proto = Object.create(HTMLElement.prototype, {
      attachedCallback: {
        value: function() {
          var mountPoint = document.createElement('span');
          this.createShadowRoot().appendChild(mountPoint);

          //原来例子中的代码是用下面的react再次渲染
          //我在理解了这个例子之后，就写了这个~~ 没有问题哈，说明已经掌握！！
          mountPoint.innerHTML = ('啊哈哈~~');
          //在这里再次使用了react渲染
          /*var name = this.getAttribute('name');
          var url = 'https://www.baidu.com/s?wd=' + name;
          ReactDOM.render(<a href={url}>{name}</a>, mountPoint);*/

        }
      }
    });
    //使用之前要注册了才能用哦~~
    document.registerElement('my-fish', {prototype: proto});

    //这部分是我已经非常熟悉的react的写法
    //不同是，这里渲染的时候使用了 WebComponent 定义的标签 my-fish
    //需要注意的是 my-fish 的命名格式必须是“xxx-xxx”这样子的写法
    class Fish extends React.Component {
      render() {
        return <div>我是：<my-fish name={this.props.name} /></div>;
      }
    }
    ReactDOM.render(<Fish name="小鱼" />, document.getElementById('container'))

  }


  /*
   * 实例9:  react-addons-css-transition-group 插件
   * 如果在浏览器中要使用 CSSTransitionGroup 这个类的话，必须引入 react-addon.js
   * 然而在我这个node的环境中需要引入的是 react-addons-css-transition-group 插件
   * 当然node中也有一个名字为react-addon，在使用CSSTransitionGroup的时候视乎是有问题的
   *
   * 这个文件还需要配合 transition.css 这个样式哦
   * 所以这个例子还涉及到css动画的的知识，看来也是我的弱点哟
   *
   * 其实这个里也是 “组件嵌套使用” 的一个很好的例子。
   * 外层的组件是 Fish , 内层的组件是 CSSTransitionGroup
   *
   * 另外，从视觉效果上来看，好像产生了很多的实例，但是，其实就是就是通过定时器，每次都渲染出3个div（被应用了动画）
   * 第二次渲染的时候，同样道理。所以并没有
   */
  bee.caseA9 = function(){

    //cssTransitionGroup是node已经进入的一个插件。
    //它就像是react中默认定义好的一个“类”，直接可以为我们使用。
    //就好像我这里的“Fish”是同样的概念。
    var CSSTransitionGroup = cssTransitionGroup;

    var INTERVAL = 5000;

    var Fish = React.createClass({
      getInitialState: function() {
        return {current: 0};
      },

      //组件被添加的时候触发的回调
      componentDidMount: function() {
        this.interval = setInterval(this.tick, INTERVAL);
      },

      //组件被移除的时候触发的回调
      componentWillUnmount: function() {
        clearInterval(this.interval);
      },

      tick: function() {
        this.setState({current: this.state.current + 1});
      },

      render: function() {
        var children = [];
        var pos = 0;
        var colors = ['#3F92D2', '#FF9200', '#FFC373'];
        for (var i = this.state.current; i < this.state.current + colors.length; i++) {
          var style = {
            left: pos * 100,
            background: colors[i % colors.length]
          };
          pos++;
          //children这个数组中每次会保存三个dom元素
          children.push(<div key={i} className="animateItem" style={style}>{i}</div>);
        }
        return (
          //CSSTransitionGroup本身是没有刷新的，我想当子类组件给他传递值的时候，就会接受到事件。
          //它处理元素的速度要和内部的定时器保持一致，否则的话会出现页面中元素越来越多的情况。
          <CSSTransitionGroup
            className="animateExample"
            transitionEnterTimeout={5000}
            transitionLeaveTimeout={5000}
            transitionName="example">
            {children}
          </CSSTransitionGroup>
        );
      }
    });

    ReactDOM.render(
      <Fish />,
      document.getElementById('container')
    );


    /*
     * 这个例子略有难度，我先按下不表。
     */

  }



  return bee;
})(bee||{});


export default bee;



