import webpack from "webpack";
import { IOptions } from "./interface";
import fs = require("fs");

class ConsoleWebpackPlugin implements webpack.Plugin {
  static readonly template: Pick<IOptions, "template">;
  static readonly includes: Pick<IOptions, "includes">;
  static readonly excludes: Pick<IOptions, "excludes">;

  constructor(options: IOptions) {
    const { template, includes, excludes } = options;
    this.template = template;
    this.includes = includes;
    this.excludes = excludes;
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tapAsync(
      "ConsoleWebpackPlugin",
      async (compilation, cb) => {
        const { template, includes, excludes } = this;
        if (!template) {
          throw "must add a template!!!";
        }
        function read() {
          return new Promise((resolve, reject) => {
            fs.open(template, "r", function(
              err: NodeJS.ErrnoException | null,
              fd: number
            ) {
              if (err) {
                reject(err);
              }
              const buffer = new Buffer(255);
              // 读取文件
              fs.read(fd, buffer, 0, 10, 0, function(
                err: NodeJS.ErrnoException | null,
                bytesRead,
                buffer
              ) {
                if (err) {
                  throw err;
                }
                const content = buffer.slice(0, bytesRead).toString();

                // 关闭文件
                fs.close(fd, () => {});
                resolve(content);
              });
            });
          });
        }
        // 对目标文件写入需要添加打印的信息
        function append(file: string) {
          // 取打包目录下 该html文件绝对路径的名字
          file = file.replace(/(\.\/)(?=.+?\.html)/, "");

          const html = (compilation as any).getAsset(file);

          let tempHtml = html.source.source();
          const reg = /(.*)(?=<\/body>)/;
          tempHtml = tempHtml.replace(
            reg,
            "$1" + `<script>console.log("${content}")</script>`
          );
          compilation.assets[file].source = function() {
            return tempHtml;
          };
        }
        const content = await read();
        if (Array.isArray(includes)) {
          includes.forEach(file => {
            append(file);
          });
        } else {
          append(includes);
        }
        cb();
      }
    );
  }
}
module.exports = ConsoleWebpackPlugin;
