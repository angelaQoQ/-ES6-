var arr = [1, 2, 3, 4, 5, 4]

var itor = new Set(arr).keys()

for (let key of itor) {
  console.log(key)
}