// todo as操作符
// ? tsx中禁用了使用尖括号的断言类型，只能使用as

// todo 固有元素
// ? 固有元素使用特殊的接口JSX.IntrinsicElements来查找
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
    interface Element {
        foo: string
    }
}
<div>
    <foo />
    <bar />
</div>

// todo 基于值的元素
// * 1. 无状态函数组件
interface FooProp {
    name: string
    X: number
    Y: number
}
declare function AnotherComponent(prop: { name: string })

function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name={prop.name} />
}

const Button2 = (prop: { value: string }, context: { color: string }) => <button />

// ? 由于无状态函数组件是简单的JavaScript函数，所以可以利用函数重载
interface ClickableProps {
    children: JSX.Element[] | JSX.Element
}
interface HomeProps extends ClickableProps {
    home: JSX.Element
}
interface SlideProps extends ClickableProps {
    side: JSX.Element | string
}

function MainButton(prop: HomeProps): JSX.Element
function MainButton(prop: SlideProps): JSX.Element {
    return <foo name={prop} />
}

// * 2. 类组件
// ? 如果MyComponent是ES6的类，那么类类型就是类的构造函数和静态部分，如果MyComponent是个工厂函数，类类型就是这个函数
// ? 实例类型由类构造器或调用签名的返回值的联合构成。，如果是工厂函数，实例类型为这个函数返回值类型

class MyComponent {
    render() { }
}

const myComponent = new MyComponent()

// 元素类的类型 => MyComponent
// 元素实例的类型 => { render: () => void }

function MyFactoryFunction() {
    return {
        render: () => { }
    }
}

const myComponent2 = MyFactoryFunction()

// 元素类的类型 => MyFactoryFunction
// 元素实例的类型 => { render: () => void }

// todo 属性类型检查
// ? 属性类型检查的第一步是确定元素属性类型。
// 固有元素是JSX.IntrinsicElemnets属性的类型
declare namespace JSX {
    interface IntrinsicElements {
        foo: { bar?: boolean }
    }
}

<foo bar />

// ? 基于值得元素取决于先前确定的在元素实例类型上的某个属性的类型
declare namespace JSX {
    interface ElementAttributesProperty {
        props // 指定用来使用的属性名
    }
}

class MyComponent3 {
    props: {
        foo?: string
    }
}

<MyComponent3 foo="bar" />

// todo 子孙类型检查
// ? children是元素属性类型的一个特殊属性，子JSXExpression将会被插入到属性里
declare namespace JSX {
    interface ElementChildrenAttribute {
        children: {}
    }
}

// 如果不特殊指定子孙的类型，将使用React typings里的默认类型
{/* <div>
    <h1>hello</h1>
</div> */}

// const CustomComp = (props) => <div>props.children</div>

<div>
    <CustomComp>
        <div>Hello World</div>
        {"This is just a JS expression" + 1000}
    </CustomComp>
</div>

// todo 嵌入的表达式
var a5 = <div>
    {['foo', 'bar'].map(i => <span>{i / 2}</span>)}
</div>

// todo React整合
interface Props {
    foo: string
}
class MyComponent4 extends RTCIceCandidate.Component<Props, {}> {
    render () {
    return <span>{this.props.foo}</span>
    }
}