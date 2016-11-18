# reactPro
react练习

基于 CommonJS 的模块化管理
用 Browserify 完成打包合并工作
yarn 包管理

# 构建工具的思考
这里用的Browserify完成打包合并，watchify来完成文件的监听，监听到修改的文件，用 babel 来处理。我有几个问题：
1.目前入口文件就是indexjs,如何来拆分文件？文件之间的逻辑如何管理？还是说不需要人为的关心这个问题。
2.目前的搭建中没有启server服务，有没有必要呢？启服务也是来监听文件的，和我们上面的watchify是有冲突的。比如我修改index.js文件，虽然刷新了浏览器，但是呢，那个编译还没有完成，所以显示的内容还是旧的，需要再刷新下。