var arr = [1, 2, 2, 1, 1]
var s = new Set(arr)
var arr2 = [...s]
console.log(arr2)


var arr3 = [1, 2, 3, 4, 5, 3, 1, 2]
var arr4 = Array.from(new Set(arr3))
console.log(arr4)