let obj = {
  a: 1,
  b: 2,
  c: 3
}

// let keysArr = obj.keys()//TypeError: obj.keys is not a function

let keysArr = Object.keys(obj)//[ 'a', 'b', 'c' ] 将对象所有属性组成数组返回

let valuesArr = Object.values(obj)//[ 1, 2, 3 ] 将对象所有值 组成数组返回

let res = Object.entries(obj)//[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]  将对象键值对修改为多个两个项的数组, [[键,值] , [键,值]]

console.log(keysArr)
console.log(valuesArr)
console.log(res)