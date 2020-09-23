// todo 泛型
// ? 泛型即可以用一个类型变量来捕获函数的类型，从而实现支持多种类型
function identity<T>(arg: T): T {
    return arg
}
// ? 泛型的使用有两种，如下
let output = identity<string>("myString") // ? 直接传入
let output2 = identity("myString") // ? 类型推论，通过传入的值判断T的类型

// todo 使用泛型变量
// ? 使用泛型变量时，需要将变量当做通用类型使用，而不同使用某种特定类型的方法
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.info(arg.length)
    return arg
}

// todo 泛型类型
let myIdentity: <T>(arg: T) => T = identity
let myIdentity2: <U>(arg: U) => U = identity // ? 泛型参数名可以不同
// ? 可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity3: { <T>(arg: T): T } = identity

// * 泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T
}
let myIdentity4: GenericIdentityFn = identity

// ? 可以定义接口时给接口规定泛型，使用接口时再规定泛型的类型，便于接口里的其他成员知道参数的类型
interface GenericIdentityFn2<T> {
    (arg: T): T
}
let myIdentity5: GenericIdentityFn2<number> = identity

// todo 泛型类
// ? 泛型类与泛型接口相似
// ? 类的静态属性不能使用泛型类型
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
    return x+ y
}