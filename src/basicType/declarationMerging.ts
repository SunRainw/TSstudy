// todo 介绍
// ? 声明合并是指编译器针对同一个名字的两个(多个)独立声明合并为单一声明。合并后的声明同时拥有原先两个(多个)声明的特性

// todo 合并接口

interface Box {
    height: number
    width: number
}

interface Box {
    scale: number
}

let box: Box = { height: 5, width: 6, scale: 10 }

// ? 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。当接口A与后来的接口A合并时，后面的接口具有更高的优先级

interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

// ? 合并后每组接口里的声明顺序保持不变，但每组接口之间的顺序是后来的接口重载出现在靠前位置
// * 合并后
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}

// ? 出现特殊签名时，如果签名里有一个参数的类型是单一的字符串字面量（比如，不是字符串字面量的联合类型），那么它将会提升到重载列表的最顶端
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

// * 合并后
interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}

// todo 合并命名空间
// ? 模块导出的同名接口进行合并，构成短衣命名空间内含合并后的接口
// ? 非导出成员仅在其原有的（合并前的）命名空间内可见
namespace Animals {
    let haveMuscles = true
    export function animalHaveMuscles() {
        return haveMuscles
    }
}

namespace Animals {
    export function doAnimalsHaveMuscles() {
        // return haveMuscles // ! 不能访问
    }
}

// todo 命名空间与类和函数和枚举类型合并
// ? 命名空间可以与其它类型的声明进行合并。只要命名空间的定义符合将要合并类型的定义。合并结果包含两者的声明类型

// todo 合并命名空间和类（函数和枚举类似）
// ? 合并后一个类带有一个内部类
class Album {
    label: Album.AlbumLabel
}

namespace Album {
    export class AlbumLabel {

    }
}

// todo 非法合并
// ? 类与类或其他变量不能合并

// todo 模块扩展
