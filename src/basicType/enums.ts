
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