// todo 装饰器
//  ? 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。
// ? 装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入
function sealed1(target: any): void {

}

// todo 装饰器工厂
// ? 装饰器工厂是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { } // 这是装饰器
}

// todo 装饰器组合
/**
 * ? 在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤
 * ? 1. 由上至下依次对装饰器表达式求值
 * ? 2. 求值的结果会被当做函数，由下至上依次调用
 */

function f1() {
    console.info("f(): evaluated")
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.info("f(): called")
    }
}

function g() {
    console.info("g(): evaluated")
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.info("g(): called")
    }
}

class Co {
    @f1()
    @g()
    method() {

    }
}
//  运行结果
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

// todo 装饰器求值
/**
 * ? 类中不同声明上的装饰器将按以下规定的顺序应用：
 * ?    1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员
 * ?    2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员
 * ?    3. 参数装饰器应用到构造函数
 * ?    4. 类装饰器应用到类
 */

// todo 类装饰器
// ? 类装饰器在类声明之前被声明
// ? 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义
// ? 类装饰器不能用在声明文件中(.d.ts)，也不能用在任何外部上下文中(比如declare的类)

@sealed
class Greeter4 {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "Hello, " + this.greeting
    }
}

function sealed(constructor: Function) {
    // ? Object.seal密封一个对象，让其不能添加新属性，所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。
    Object.seal(constructor)
    Object.seal(constructor.prototype)
}

function classDecorator<T extends {new(...args: any[]):{}}>(constructor: T) {
    return class extends constructor {
        newProperty = "new property"
        hello = "override"
    }
}
@classDecorator
class Greeter5 {
    property = "property"
    hello: string
    constructor (m: string) {
        this.hello = m
    }
}
console.info(new Greeter("world"))

// todo 方法装饰器
// ? 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。它会被应用到方法的属性描述符上。可以用来监视，修改或者替换方法定义
// ? 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数
/**
 * ? 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * ? 2. 成员的名字
 * ? 3. 成员的属性描述符(如果输出目标版本小于ES5，属性描述符将会是undefined)
 */

class Greeter6 {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    @enumerable(false)
    greet() {
        return "hello, " + this.greeting
    }
}

function enumerable(value: boolean) {
    return function ()
}