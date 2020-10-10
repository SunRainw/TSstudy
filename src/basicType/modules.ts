// todo 导出声明
//  ? 任何声明（比如变量，函数，类，类型别买或接口）都能够通过添加export关键字来导出
export interface StringValidator {
    isAcceptable(s: string): boolean
}

export const numberRegexp = /^[0-9]+$/
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s)
    }
}

// todo 导出语句
class ZipCodeValidator1 implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator1 }
export { ZipCodeValidator1 as mainValidator }

// todo 重新导出
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && parseInt(s).toString() === s;
    }
}

// 导出原先的验证器但做了重命名
// export {ZipCodeValidator1 as RegExpBasedZipCodeValidator } from "./ZipCodeValidator"

// ? 或者一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。

// todo 导入

// ? 导入一个模块的某个导出内容
// import { ZipCodeValidator } from "./ZipCodeValidator";

// import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
// let myValidator = new ZCV();

// ? 将整个模块导入到一个变量，并通过它来访问模块的导出部分
// import * as validator from "./ZipCodeValidator";
// let myValidator = new validator.ZipCodeValidator();

// todo 默认导出
// ? 每个模块都可以有一个default导出。一个模块只能有一个default导出

// declare let $: JQuery
// export default $

// import $ from "JQuery"

// ? 类和函数声明可以直接被标记为默认导出。标记为默认导出的类和函数的名字是可以省略的
// const numberRegexp = /^[0-9]+$/;

// export default function (s: string) {
//     return s.length === 5 && numberRegexp.test(s);
// }

// import validator from "./ZipCodeValidator";

// let myValidator = new validator();

// ? defaulr 导出可以导出一个值

export default "123"

// todo export = 和 import = require()
// ? 由于export default 语法并不能兼容CommonJs和AMD的exports, 为了支持CommonJs和AMD的Exports，TypeScript提供了export = 语法
// ? 若使用export =导出一个模块，则必须使用TypeScript的特定语法import module = require("module")来导入此模块。

// export = ZipCodeValidator
// import zip = require("./ZipCodeValidator")

// todo 可选的模块加载和其他高级加载场景
// ? import 定义的标识符只能在表示类型处使用(不能在会转换成JavaScript的地方)

// 使用typeof关键字
declare function require(moduleName: string): any

// import { ZipCodeValidator as Zip } form './ZipCodeValidator'

// todo 外部模块
declare module "url" {
    export interface Url {
        protocol?: string
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url
}
declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}

import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");

// todo 模块声明通配符
// ? 某些模块加载器如SystemJS和AMD支持导入非JavaScript内容。通常会使用一个前缀或后缀来表示特殊的加载语法。
declare module "*!text" {
    const content: string
    export default content
}

declare module "json!*" {
    const value: any
    export default value
}

// 导入匹配"*!text"或"json!*"的内容
import fileContent from "./xyz.txt!text"
import data from "json!http://example.com/data.json"
console.log(data, fileContent)

// todo 创建模块结构指导
// ? 如果仅导出单个class或function，使用export default
// ? 如果导出多个对象，把他们放在顶层导出
// ? 明确地列出导入的名字
// ? 使用命名空间导入模式当你要导出大量内容的时候
// ? 使用重新导出进行扩展
// ? 模块里不要使用命名空间