// todo 布尔值(boolean)
const isDone: boolean = false

// todo 数字(number)
// ? Ts的所有数字都是浮点数（和js相同）
const decLiteral: number = 6 // 十进制
const helxLiteral: number = 0xf00d // 十六进制
const binaryLiteral: number = 0b1 // 二进制
const octalLteral: number = 0o744 // 八进制

// todo 字符串(String)
let userName: string = 'bob'
userName = 'smith'

// * 模板字符串
let sentence: string = `My name is ${userName}`

// todo 数组(Array)
// ? 两种定义方式
let list: number[] = [1, 2, 3]
let list2: Array<number> = [4, 5, 6]

// todo 元组(Tuple)
//? 元组就是一个已知子元素类型和数量的数组

let x: [string, number] = ['hah', 10] // String和Number类型的元组
// x = [10, 'heih'] // ! error, 只能根据规定的类型顺序

// 访问的方式与数组相同
// console.info(x[0].substring(1))

/** 
 * ? 目前官方文档上说可以越界访问，测试后发现不能
 * ? 可以通过push强行添加元组元素，同时打印时可以将元素打印出来，但是无法通过索引访问到该元素，
 * ? ts的静态类型并不属于强类型，所以声明约束了数组的长度，还是可以通过push添加元素，同时打印时可以将元素打印出来，但是无法通过索引访问到该元素，
 * interface NumStrTuple extends Array<number | string> {
    0: number;
    1: string;
    length: 2; // using the numeric literal type '2'
}
 */

// x[3] = 'world' // ! 无法越界
x.push('world') // 可以push
// x[3] // ! 但无法通过所以访问
// console.info(x) // [ 'hah', 10, 'world' ] 可以打印出添加的元素

// todo 枚举(Enum)
/**
 * ? 默认情况下枚举中的元素是从0开始的，即Red = 0, Blue = 1, Green = 2
 * ? 当给枚举的第一个值赋为1后，后续若未赋值则相应加1， 即Red = 1, Blue = 2, Green = 3
 * ? 当给枚举的非第一个值赋后，后续若未赋值则相应加1，前面的值则根据第一位从0开始一次增加
 */
enum Color { Red, Blue, Green }
let c: Color = Color.Green
// console.info(Color) // 0, 1, 2

enum Color2 {Red = 1, Blue, Green}
// console.info(Color2) // 1, 2, 3

enum Color3 {Red, Blue = 5, Green}
// console.info(Color3) // 0, 5, 6

// todo Any类型
let notSure: any = 4
notSure = "haha"
notSure = false
let listAny: any[] = [1, true, 'haha'] // 可以定义不同子元素类型的数组

// todo 无返回类型(Void)
function warnUser(): void {
    console.info("不需要返回")
}
// ? 用void声明的变量只能赋值为undefined和null
let unusable: void = undefined

// todo Null和 Undefined
// ? null 和 undefined是所有类型的子类型，可以将其赋值给其他类型
let u: undefined = undefined;
let n: null = null;
// u = 1  // ! strictNullChecks为false时可以使用

// todo Never类型
// ? never类型是任何类型的子类型，也可以赋值给任何类型，但没有类型是neber的子类型或可以赋值给never类型(除never本身外)
// ? / * 返回never的类型必须存在无法到达的终点
function errorFunc(message: string): never {
    throw new Error(message)
    // return 1 错误
}
// * 推断的返回值类型为never
function fail(): any {
    return errorFunc("fail");
}

// todo 对象(Object)
// declare function create(o: object | null): void;
// create({ prop: 0 })
// create(null)

// todo 类型断言
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length // ? 断言someValue的类型为string
let stringLength2: number = (someValue as string).length // ? 断言的另一种写法通过as

// todo let 和 const
// ? let 和 const 都是块级作用域，let声明的变量可以修改，const声明的变量外部不能修改，内部可以修改

// todo 解构
// ? 1. 解构数组
const input = [1, 2]
const [first, second] = input
console.info(first, second) // 1, 2

let [one, ...rest] = [1, 2, 3, 4]
console.info(one, rest) // 1  [2, 3, 4]

// ? 解构对象
let o = {
    a: "foo",
    b: 12,
    c: false
}
let {a, b} = o
let {c, ...}

