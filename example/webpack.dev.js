const merge = require("webpack-merge");
const webpack = require("webpack");
const webpackBaseConf = require("./webpack.config");

module.exports = merge(webpackBaseConf, {
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    open: true
  }
});
