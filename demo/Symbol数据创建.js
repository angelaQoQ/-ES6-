// let s = new Symbol() // 不能使用new  因为Symbol不是构造函数
let s = Symbol() // 直接调用Symbol创建Symbol类型的数据--唯一数据
console.log(s)
let s2 = Symbol()
console.log(s == s2)

// 加标识符
let sym1 = Symbol('name')
let sym2 = Symbol('age')
let sym3 = Symbol('age')

console.log(sym3 === sym2)