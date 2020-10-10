
// todo 命名空间(内部模块)
// ? 为了便于记录多个验证器类型的同时不与其他对象产生命名冲突。将验证器包裹到一个命名空间内

namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean
    }

    const lettersRegexp = /^[A-Za-z]+$/
    const numberRegexp = /^[0-9]+$/

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s)
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s)
        }
    }
}

let strings1 = ["Hello", "980502", "102"]
let validators: { [s: string]: Validation.StringValidator } = {}
validators["ZIP code"] = new Validation.ZipCodeValidator()
validators["Letters only"] = new Validation.LettersOnlyValidator()

for (let s of strings1) {
    for (let name in validators) {
        console.info(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`)
    }
}
// todo 多文件的命名空间
// ? 将validation命名空间分割成多个文件，尽管是不同的文件，它们仍是同一个命名空间

// todo 别名
// ? 另一种简化命名空间操作的方法是使用import q = x.y.z
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons
let sq = new polygons.Square()

// todo 外部命名空间
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection
            (element: EventTarget): Selection
        }
    }
    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base

 //? 使用/// <refernce>引用模块文件是错误的，应该使用import