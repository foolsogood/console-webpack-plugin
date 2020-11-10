const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const webpackBaseConf = require("./webpack.config");
const ConsoleWebpackPlugin = require("../lib/index");

module.exports = webpackMerge(webpackBaseConf, {
  mode: "production",
  plugins: [
    new ConsoleWebpackPlugin({
      template: "./hire.txt",
      includes: ["./index.html", "./demo.html", "./a/index.html"],
      excludes: ["./no_console.html"]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"] //移除console
          }
        }
      })
    ]
  }
});
