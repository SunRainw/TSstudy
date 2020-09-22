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

// todo 类类型的接口
// ? 接口描述了类的公共部分，但没有检查类的私有成员
interface ClockInteface {
    currentTime: Date
    setTime(d: Date)
}

class Clock implements ClockInteface {
    currentTime: Date
    setTime(d: Date) {
        this.currentTime = d
    }
    constructor(h: number, m: number) {}
}

// * 类静态部分与实例部分的区别
// ? 类具有两个类型： 静态部分的类型和实例的类型
// ? 当类实现一个接口时，只对其实例部分进行类型检查。而constructor存在于类的静态部分
// interface ClockConstructor {
//     new (hour: number, minute: number)
// }
// class Clock1 implements ClockConstructor {
//     currentTime: Date
//     constructor(h: number, m: number)
// }

interface ClockConstructor {
    new(hour: number, minute: number): ClockInteface1
}
interface ClockInteface1 {
    tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInteface1 {
    return new ctor(hour, minute)
}

class DigitalClock implements ClockInteface1 {
    constructor(h: number, m: number) {}
    tick() {
        console.info("beep beep")
    }
}

class AnalogClock implements ClockInteface1 {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tick")
    }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

// todo 继承接口
interface Shape {
    color: string
}

interface Square extends Shape {
    sideLength: number
}

// let square: Square = {}
let square = <Square>{}
square.color = "blue"
square.sideLength = 10

// ? 一个接口可以继承多个接口，创建出多个接口的合成接口
interface PenStroke {
    penWidth: number
}

interface Square extends Shape, PenStroke {
    sideLength: number
}

// todo 混合类型的接口
interface Counter {
    (start: number): string
    interval: number
    reset(): void
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {}
    counter.interval = 123
    counter.reset = function () {}
    return counter
}

let c1 = getCounter()
c1(10)
c1.reset()
c1.interval = 5.0

// todo 接口继承类
// ? 接口继承类，会继承类的成员但不包括实现，接口同样会继承累的private和protected成员，
// ? 而如果该类有私有或保护成员时，该接口也只能被该类和其子类所实现
class Control {
    private state: any
}
// 接口继承了类
interface SelectableControl extends Control {
    select(): void
}
// 该类的子类可以实现该接口
class Button extends Control implements SelectableControl {
    select() {}
}

