const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index"],
      filename: "index.html",
      title: "index"
    }),
    new HtmlWebpackPlugin({
      template: "./demo.html",
      filename: "demo.html",
      title: "demo"
    }),
    new HtmlWebpackPlugin({
      template: "./no_console.html",
      filename: "no_console.html",
      title: "no_console"
    }),
    new HtmlWebpackPlugin({
      template: "./a/index.html",
      filename: "a/index.html",
      title: "a_index"
    })
  ]
};
