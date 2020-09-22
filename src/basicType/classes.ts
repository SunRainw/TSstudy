
// todo 类
class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "hello, " + this.greeting
    }
}
let greeter = new Greeter("world")

// todo 继承
class Animal {
    name: string
    constructor(theName: string) {
        this.name = theName
    }
    move(distanceInMeters: number = 0) {
        console.info(`Animal moved ${distanceInMeters}m`)
    }
}

class Dog extends Animal {
    bark() {
        console.info('woof! woof!')
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distanceInMeters = 5) {
        console.info("Slithering...")
        super.move(distanceInMeters)
    }
}
class Horse extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distanceInMeters = 5) {
        console.info("Galloping...")
        super.move(distanceInMeters)
    }
}

let sam = new Snake("Sammy the Python")
let tom: Animal = new Horse("Tommy the Palomino")

// const dog = new Dog()
// dog.bark()
// dog.move(10)
// dog.bark()

sam.move()
tom.move(35)

// todo 共有修饰符(public)
// ? 成员默认是public
class Animal1 {
    public name: string
    public constructor(theName: string) {
        this.name = theName
    }
    public move(distanceInMeters: number) {
        console.info(`${this.name} moved ${distanceInMeters}m`)
    }
}

// todo 私有修饰符(private)
// ? 当成员被标记成private时， 他就不能在声明它的类的外部访问
class Animal2 {
    private name: string  // ! 不能通过new Animal2("hah").name进行访问
    constructor(theName: string) {
        this.name = theName
    }
}

// ? TS使用结构性类型系统，当比较两种不同的类型时，如果所有成员的类型是兼容的，我们就认为他们的类型是兼容的
// ? 如果带有private和 protected成员， 两个类的private或protected成员必须在同一处声明，才能认为两种类型是兼容的

class Rhino extends Animal2 {
    constructor() {
        super("Rhino")
    }
}
class Employee {
    private name: string
    constructor(theName: string) {
        this.name = theName
    }
}

let animal = new Animal2("Goat")
let rhino = new Rhino()
let employee = new Employee("Bob")

animal = rhino
// animal = employee // ? 声明的name私有成员，不是在同一处声明的

// todo 保护修饰符(protected)
// ? protected与private的不同在于，protected成员在派生类中仍然可以访问
class Person {
    protected name: string
    constructor(name: string) {
        this.name = name
    }
}

class Employees extends Person {
    private department: string
    constructor(name: string, department: string){
        super(name)
        this.department = department
    }
    public getElevatorPitch() {
        // ? 如果Person的name为private, 此时不能访问name
        return `Hello, my name is ${this.name} and I work in ${this.department}`
    }
}

let howard = new Employees("Howard", "Sales")
console.info(howard.getElevatorPitch())
// console.info(howard.name) // 不能访问

// ? 如果构造函数被标记为protected，那么该类不能再包含它的类外被实例化，但是能够继承
// ? 如果被标记为private，则不能被继承

class Person2 {
    protected name: string
    protected constructor(name: string) {
        this.name = name
    }
}
class Employees2 extends Person2 {
    private department: string
    constructor(name: string, department: string){
        super(name)
        this.department = department
    }
    public getElevatorPitch() {
        // ? 如果Perosn的name为private, 此时不能访问name
        return `Hello, my name is ${this.name} and I work in ${this.department}`
    }
}

// let john = new Person2("John") // ! person2构造函数被保护不能实例化

// todo 类成员的readonly
// ? 只读属性必须在声明时或者构造函数里被初始化
class Octopus {
    readonly numberOfLegs: number = 8
    constructor(readonly name: string, private h: string, private e: string) {
        // ? 在构造函数参数前面添加一个访问限定符来声明(readonly, private, public, protected),限定一个参数属性会声明并初始化一个私有成员
        // ? 测试发现多个也行，是理解错误还是没有开启严格模式？
        console.info(this.name, this.h, this.e)
    }
}
let dad = new Octopus("呵呵","哈哈", "ss")

// todo 存取器
// ? TS通过getters/setters来截取对对象成员的访问
// ? 如果只有getter没有setter即为只读

let passcode = "secret"
class Employer {
    private _fullName: string
    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        if(passcode && passcode === "secret") {
            this._fullName = newName
        } else {
            console.info("Error: Unauthorized update of employee!")
        }
    }
}

let employer = new Employer()
employer.fullName = "Bob Smith"
if (employer.fullName) {
    console.info(employer.fullName)
}
