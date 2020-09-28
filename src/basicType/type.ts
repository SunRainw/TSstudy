/*
 * @Author: your name
 * @Date: 2020-09-28 22:19:19
 * @LastEditTime: 2020-09-28 23:29:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \TSstudy\src\basicType\type.ts
 */
// todo 类型推论
// ? 类型推论，即可以根据初始化时的变量和成员，设置默认参数值和决定函数返回值时的类型来进行推论
// ? 如果无法推论时，需要自己给定类型，否则会为联合类型

// let zoo: Animal[] = [new Rhino(), new Elphant(), new Snake()] // ! 如果不指定类型则为联合数组类型，(Rhino | Elephant | Snake)
// ? TypeScript 可以根据上下文进行推论类型
const newLocal = window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);
};

// todo 类型兼容性
// ? TypeScript里的类型兼容性时基于结构子类型的
// ? TypeScript通过判断两者之间是否具有相同的属性类兼容
interface Named {
    name: string;
}

let xm: Named;
let y = { name: 'Alice', location: 'Seattle' };
xm = y; //  ? 此时x与 y时兼容的

// * 函数比较
let fun1 = (a: number) => 0;
let fun2 = (b: number, s: string) => 0;

fun2 = fun1; // OK
// fun1 = fun2; // Error

// todo 