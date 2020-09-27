
// todo 枚举
function getSomeValue<T>(num: T): T{
    return num
}
// ? 枚举可以被混入到计算过的和常量成员
// ? 但是不能放在不带初始化的枚举的第一个位置，
enum E { 
    B,
    A = getSomeValue(1),
}

// todo 字符串枚举
// ? 字符串枚举中的每个成员必须用字符串字面量或者两外一个字符串枚举成员初始化
enum Direction {
    Up = "UP",
    Down = Up,
    Left = "LEFT",
    Right = "RIGHT",
}

// todo 异构枚举
// ? 异构枚举即混合字符串和数字成员

enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// todo 计算和常量成员
// * 常量
// ? 1. 枚举的第一个成员且没有初始化，被赋予值0
enum E1 { X }
// ? 2. 不带有初始化器且它之前的枚举成员是一个数字常量。
enum E2 { X, Y, Z }

enum E3 {
    A = 1, B, C
}
// ? 3. 枚举成员使用常量表达式初始化
// ? 常量枚举表达式：
/**
 *  (1) 一个枚举表达式字面量（主要是字符串字面量或数字字面量）  // "hah", 123
 *  (2) 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的） // E1.X
 *  (3) 带括号的常量枚举表达式
 *  (4) 一元运算符 +, -, ~其中之一应用在了常量枚举表达式 // 1 + 1
 *  (5) 常量枚举表达式作为二元运算符 +, _, *, /, %, <<, >>, >>>, &, |, ^的操作对象。若常数枚举表达式求值后为NAN或Infinity，则会在编译阶段报错 // 1<<1
 */
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}

// todo 联合枚举与枚举成员的类型
// ? 字面量枚举成员， 不带有初始值的常量枚举成员，或值被初始化为如："foo", 1, -1
// ? 枚举成员成为了类型

enum ShapeKind {
    Circle,
    Square,
}

// ShapeKind的成员变成了类型Number
interface Circle {
    kind: ShapeKind.Circle
    radius: number
}

interface Square {
    kind: ShapeKind.Square
    sideLength: number
}

let cm:Circle = {
    // kind: ShapeKind.Square, // ! 错误，此时ShapeKind.Square为类型
    kind: 2,
    radius: 100
}