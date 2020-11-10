"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ConsoleWebpackPlugin = /** @class */ (function () {
    function ConsoleWebpackPlugin(options) {
        var template = options.template, includes = options.includes, excludes = options.excludes;
        this.template = template;
        this.includes = includes;
        this.excludes = excludes;
    }
    ConsoleWebpackPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.emit.tapAsync("ConsoleWebpackPlugin", function (compilation, cb) { return __awaiter(_this, void 0, void 0, function () {
            function read() {
                return new Promise(function (resolve, reject) {
                    fs.open(template, "r", function (err, fd) {
                        if (err) {
                            reject(err);
                        }
                        var buffer = new Buffer(255);
                        // 读取文件
                        fs.read(fd, buffer, 0, 10, 0, function (err, bytesRead, buffer) {
                            if (err) {
                                throw err;
                            }
                            var content = buffer.slice(0, bytesRead).toString();
                            // 关闭文件
                            fs.close(fd, function () { });
                            resolve(content);
                        });
                    });
                });
            }
            // 对目标文件写入需要添加打印的信息
            function append(file) {
                console.log("file1", file);
                // 取打包目录下html文件去除路径后的名字
                file = file.replace(/(\.\/)(?=.+?\.html)/, "");
                console.log("file2", file);
                var html = compilation.getAsset(file);
                var tempHtml = html.source.source();
                var reg = /(.*)(?=<\/body>)/;
                tempHtml = tempHtml.replace(reg, "$1" + ("<script>console.log(\"" + content + "\")</script>"));
                compilation.assets[file].source = function () {
                    return tempHtml;
                };
            }
            var _a, template, includes, excludes, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, template = _a.template, includes = _a.includes, excludes = _a.excludes;
                        if (!template) {
                            throw "must add a template!!!";
                        }
                        return [4 /*yield*/, read()];
                    case 1:
                        content = _b.sent();
                        if (Array.isArray(includes)) {
                            includes.forEach(function (file) {
                                append(file);
                            });
                        }
                        else {
                            append(includes);
                        }
                        cb();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ConsoleWebpackPlugin;
}());
module.exports = ConsoleWebpackPlugin;
