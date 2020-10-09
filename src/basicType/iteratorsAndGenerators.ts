// todo 可迭代性
// ? 当一个对象实现了Symbol.iterator属性时，即认为它是可迭代的。
// ? Array，Map，Set，String，Int32Array，Uint32Array等都已经实现了各自的Symbol.iterator。

// todo for .. of
// ? for..of会遍历迭代的对象，调用对象上的Symbol.iterator方法
let someArray = [1, "string", false]
for (let entry of someArray) {
    console.info(entry) // 1, "string", false
}

// ? for..of和 for..in的区别在于for..in迭代的是对象的键列表而for..of迭代对象的键对应的值
let list1 = [4, 5, 6]
for (let i in list1) {
    console.info(i) // 0, 1, 2
}
for (let i of list1) {
    console.info(i) // 4, 5, 6
}

let pets = new Set(["Cat", "Dog", "Hamster"])
pets["species"] = "mammals"

for (let pet in pets) {
    console.info(pet) // "species"
}

for(let pet of pets) { 
    console.info(pet) // "Cat", "Dog", "Hamster"
}
// ? 当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。在非数组值上使用 for..of语句会得到一个错误，就算这些非数组值已经实现了Symbol.iterator属性。
// ? 当目标为兼容ECMAScipt 2015的引擎时，编译器会生成相应引擎的for..of内置迭代器实现方式。

