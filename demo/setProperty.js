let obj = {
  set name(value){
    // this.name = 1//栈溢出
    console.log(value)
    // value = 1
  }
}

obj.name = 2

console.log(obj.name)
