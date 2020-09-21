/*
 * @Author: your name
 * @Date: 2020-09-20 20:38:05
 * @LastEditTime: 2020-09-22 00:05:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TSstudy\src\basicType\interface.ts
 */
// todo 接口
interface LabelledValue {
    label: string
}

function printLabel(labelledObj: LabelledValue) {
    console.info(labelledObj.label)
}
const myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

// todo 可选属性
// ? 可选属性与可选参数相同都是用?表示
interface SquareConfig {
    color?: string
    width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSqare = { color: 'white', area: 100 }
    if (config.color) {
        newSqare.color = config.color
    }
    if (config.width) {
        newSqare.area = config.width * config.width
    }
    return newSqare
}
let mySquare = createSquare({ color: 'black' })

// todo 只读属性
interface Point {
    readonly x: number
    readonly y: number
}
let p1: Point = { x: 10, y: 20 }

// ? readonlyArray<T>类型
let ro: ReadonlyArray<number> = [1, 2, 3, 4, 5]
let a1: number[] = ro as number[]

// ? readonly和const的区别
// * 变量使用const, 属性使用readonly

// todo 函数类型接口
interface SearchFunc {
    (source: string, subString: string): boolean
}

// ? 函数的参数名可以不需要与接口里定义的名字相匹配
let mySearch: SearchFunc
mySearch = function(src: string, sub: string) {
    // ? search的参数为正则，如果不是正则会通过new RegExp(regexp)隐式转换为正则表达式
    // ? 如果匹配会返回正则表达式在字符串中首次匹配项的索引，否则返回-1
    let result = src.search(sub)
    return result > -1
}

// todo 可索引类型的接口
// ? 下例表示通过数字索引的返回值是一个字符串
interface StringArray {
    [index: number]: string
}

let myArray: StringArray
myArray = ["Bob", "Fred"]

let myStr: string = myArray[0]
