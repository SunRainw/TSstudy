// todo 装饰器
//  ? 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。
// ? 装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入
function sealed(target) {

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

function f() {
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
    @f()
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