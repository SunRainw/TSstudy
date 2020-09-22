// todo 函数类型
function add(x: number, y: number): number {
    return x + y
}

let myAdd = function (x: number, y: number): number { return x + y }

// * 完整的函数类型
// ? 参数类型和返回值类型，使用（=>）符号在返回值类型之前
let yourAdd: (baseValue: number, increment: number) => number =
    function (x: number, y: number): number { return x + y }

// todo 可选参数和默认参数
// ? TypeScript中的每个参数都是必须的，而JavaScript中的每个参数都是可选的
// ? TypeScript只能用?实现参数可选
// ? 可选参数必须在必选参数后面
// ? 必选参数可以传undefined或null来默认初始化值

function buildName(firstName: string, lastName?: string) {
    if (lastName) return firstName + " " + lastName
    else return firstName
}

let result1 = buildName("Bod")
let result2 = buildName("Bod", "Smith")

// ? 带默认值的参数不需要放在参数后面，但是如果出现在必选参数的前面，需要传入undefined或null

function buildName2(firstName = "Will", lastName: string) {
    return firstName + " " + lastName
}

let results1 = buildName(undefined, "Tom")

// todo 剩余参数


