## console-webpack-plugin

该插件可用于以下情况:当你的生产环境去除了 console.log 但是又需要添加一些信息到控制台显示，比如招聘信息之类，那么可以考虑这个插件

## 安装

- npm i console-webpack-plugin
- yarn add console-webpack-plugin

## 在线演示

[狠狠戳我](https://foolsogood.github.io/console-webpack-plugin/index.html)

## usage

```
const ConsoleWebpackPlugin = require("console-webpack-plugin");
plugins: [
    new ConsoleWebpackPlugin({
      template: "./hire.txt",
      includes: ["./index.html", "./demo.html","./a/index.html"],
      excludes: "./no_hire.html"
    })
  ],
```

## 说明

| 属性     | 说明                                     | 类型                   |
| -------- | ---------------------------------------- | ---------------------- |
| template | 需要显示的信息文件                       | string                 |
| includes | 需要添加的目标文件，可传数组或字符串     | Array<string>\| string |
| excludes | 不需要被添加的目标文件，可传数组或字符串 | Array<string>\| string |
