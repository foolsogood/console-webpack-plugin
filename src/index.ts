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
        function read(): Promise<string | Error> {
          return new Promise((resolve, reject) => {
            var rs = fs.createReadStream(template);
            rs.setEncoding("utf8");
            var data = "";
            rs.on("data", function(chunk) {
              data += chunk;
            });
            rs.on("end", function() {
              resolve(`${data}`);
            });
            rs.on("error", function(err: NodeJS.ErrnoException | null) {
              reject(err);
            });
          });
        }
        // 对目标文件写入需要添加打印的信息
        function append(file: string, content: string): void {
          // 取打包目录下 该html文件绝对路径的名字
          file = file.replace(/(\.\/)(?=.+?\.html)/, "");

          const html = (compilation as any).getAsset(file);

          let tempHtml = html.source.source();
          const reg = /(.*)(?=<\/body>)/;
          tempHtml = tempHtml.replace(
            reg,
            "$1" + `<script>console.log(${JSON.stringify(content)})</script>`
          );
          compilation.assets[file].source = function() {
            return tempHtml;
          };
        }
        let content!: string;
        content = await read();
        if (Array.isArray(includes)) {
          includes.forEach(file => {
            append(file, content);
          });
        } else {
          append(includes, content);
        }
        cb();
      }
    );
  }
}
module.exports = ConsoleWebpackPlugin;
