
// todo 高级类型
// todo 交叉类型（Intersection Types）
function extend<T, U>(first: T, second: U): T & U {
    // ? result 拥有T和U两种类型的成员
    let result = <T & U>{}
    for (let id in first) {
        (<unknown>result)[id] = (<unknown>first)[id]
    }
    for (let id in second) {
        // ? hasOwnProperty: 指示对象自身属性中是否具有指定的属性
        if (!result.hasOwnProperty(id)) {
            (<unknown>result)[id] = (<unknown>second)[id]
        }
    }
    return result
}
class Personp {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void
}
class ConsoleLogger implements Loggable {
    log() { }
}

let jim = extend(new Personp("Jim"), new ConsoleLogger())
const namep = jim.name
jim.log()

// todo 联合类型
// ? 使用竖线(|)分割每个类型，表示其中一种类型
function padLeft1(value: string, padding: string | number) {

}

// ? 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}
class Zoo implements Bird {
    fly() { }
    layEggs() { }
}
function getSmallPet(): Fish | Bird {

    return new Zoo
}
let pet1 = getSmallPet();
pet1.layEggs(); // okay
// pet.fly(); // 不行，只能使用共有成员

// todo  类型保护与区分类别
let pet2 = getSmallPet()
// ? 使用类型断言
if ((<Fish>pet2).swim) {
    (<Fish>pet2).swim()
} else {
    (<Bird>pet2).fly()
}

// todo typeof 类型保护
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// todo instanceof 类型保护
// ? instanceof的右侧要求是一个构造函数，TypeScript将细化为：
// ? 1. 此构造函数的prototype属性的类型，如果它的类型不为any的话
// ? 2. 构造签名所返回的类型的联合

// todo 添加！后缀可以去除null和undefined
function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    }
    name = name || "Bob";
    return postfix("great");
}

function fixed(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
}

// todo 类型别名(type)
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameResolver): Name {
    return typeof n === "string" ? n : n()
}

// ? 泛型
type Container<T> = { value: T }
type Tree<T> = {
    value: T
    left: Tree<T>
    righr: Tree<T>
}

// todo 接口和类型别名的区别
// ? 类型别名不能被extends和implements（自己也不能 extends和 implements其它类型）。 因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

// todo 字符串字面量类型
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); // 不允许

// todo 数字字面量类型
// ? 与字符串字面量类型相似
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    return 1
}

// todo 可辨识联合
// ? 合并单例类型，联合类型，类型保护和类型别名叫做可辨识联合，也称作标签联合或代数数据类型
/*
* 1. 具有普通的单例类型属性——可辨识的特征
* 2. 一个类型别名包含了那些类型的联合——联合
* 3. 此属性上的类型保护
*/

// ? kind为可辨识的特征或标签
interface Square1 {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle1 {
    kind: "circle";
    radius: number;
}

// ? 联合类型包含所有
type Shape1 = Square1 | Rectangle | Circle1

// ? case 类型保护
function area(s: Shape1): number {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

// todo 完整性检查
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area1(s: Shape1) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

// todo 多态的this类型
// * 多态的this类型表示的是某个包含类或接口的子类型，被称作F-bounded多态性，它能很容易的表现连贯接口间的继承
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value
    }
    public add(operand: number): this {
        this.value += operand
        return this
    }
    public multiply(operand: number): this {
        this.value *= operand
        return this
    }
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue()

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v2 = new ScientificCalculator(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();

// todo 索引类型
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}

interface Personm {
    name: string
    age: number
}
let personm: Personm = {
    name: 'Jarid',
    age: 35
}
let strings: string[] = pluck(personm, ['name'])

// * keyof T, 索引类型查询操作符。对于任何类型T,keyof T的结果为T上已知的公共属性名的联合
let personProps: keyof Personm // 'name' | 'age'

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
let namef: string = getProperty(personm, 'name');
let age: number = getProperty(personm, 'age');
// let unknown = getProperty(personm, 'unknown'); // !  错误的，只能是name和 age

// todo 索引类型和字符串索引签名
interface Map<T> {
    [key: string]: T
}
let keys: keyof Map<number> // string
let value: Map<number>['foo'] // number

// todo 映射类型
type ReadonlyNew<T> = {
    readonly [P in keyof T]: T[P]
}
type PartialNew<T> = {
    [P in keyof T]?: T[P]
}

type PersonPartial = PartialNew<Personm>
type ReadonlyPerson = ReadonlyNew<Personm>

type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }

/**
 * 1. 类型变量K，他会依次绑定到每个属性
 * 2. 字符串字面量联合的Keys，它包含了要迭代的属性名的集合
 * 3. 属性的结果类型
 */

type NullablePerson = { [P in keyof Personm]: Personm[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }

// ? 属性列表是keyof T 且结果类型是T[P]的变体，这类转换是同态的
// ? Readonly, Partial，Pick是同态的，而Record不是，因为Record并不需要输入类型来拷贝属性

type Proxy<T> = {
    get(): T
    set(value: T): void
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function proxify<T>(o: T): Proxify<T> {
    return
}

type PickNew<T, K extends keyof T> = {
    [P in K]: T[P]
}

type RecordNew<K extends string, T> = {
    [P in K]: T
}

type ThreeStringProps = RecordNew<'prop1' | 'prop2' | 'prop3', string>

// todo 由映射类型进行推断
// ? 同态的映射类型，可以使用拆包推断，如果映射类型不是同态的，需要给拆包函数一个明确的类型参数
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T
    for (const k in t) {
        result[k] = t[k].get()
    }
    return result
}

// todo 预定义的有条件类型
/**
 * Exclude<T, U> -- 从T中剔除可以赋值给U的类型
 * Extract<T, U> -- 提取T中可以赋值给U的类型
 * NonNullable<T> -- 从T中剔除null和undefined
 * ReturnType<T> -- 获取函数返回值类型
 * Instance<T> -- 获取构造函数类型的实例类型
 */

type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // 'b' | 'd'
type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // 'a' | 'c'

type T02 = Exclude<string | number | (() => void), Function> // string | number
type T03 = Extract<string | number | (() => void), Function> // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C1 {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
// type T17 = ReturnType<string>;  // Error
// type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C1>;  // C1
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
// type T23 = InstanceType<string>;  // Error
// type T24 = InstanceType<Function>;  // Error
