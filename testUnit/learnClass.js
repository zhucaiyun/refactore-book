/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-08-27 14:50:19
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-08-29 12:07:10
 * @Description  : 学习类的用法
 */
function Person(name,age,gender) {
  this.name = name
  this.age = age
  this.gender = gender
}
Person.prototype.sayHi = function () {
  const appellation = this.gender===0?'Ms':'Mr'
  return `Hi ${appellation} ${this.name}, I am ${this.age}`
}
const zhucaiyun = new Person('zcy', 18, 0)
console.log(zhucaiyun.sayHi())

/*
* 实例的属性除非显式定义在其本身即this上，否则都是定义在原型上即class的原型上
* 所以constructor是实例化 把实例传给类
*/
let classProperty = 'classProperty'
// Class写法
class Human {
  // constructor在new对象的时候就会自动执行，并返回实例的this
  // 将实例和类的实例关联？？？
  constructor(name, age, gender) {
    this.name=name
    this.age=age
    this.gender=gender
  }
  sayHi() {
    const appellation = this.gender === 0 ? 'Ms' : 'Mr'
    return `Hi ${appellation} ${this.name}, I am ${this.age} : ${this.realAge}`
  }
  // set和get是拦截某个属性的存取行为
  set realAge(val) {
    this.age = val+'岁'
  }
  get realAge() {
    return this.age + '哈哈'
  }
  [classProperty](){
    return '这是一个表达式'
  }
}
let p1 = new Human('一一', 18, 1)
let p2 = new Human('二二', 28, 0)
// class 表达式属性
console.log(p1[classProperty]())

// set get拦截属性的存取
p1.realAge = 20
console.log(p1.sayHi())

// 类的所有实例共享一个原型
console.log('proto')
console.log(p1.__proto__)

p1.__proto__.printName = function () { return 'Oops' }
console.log(p2.printName()) // Oops

// 类本身就是指向构造函数的
console.log(Human === Human.prototype.constructor)

// test sort 默认是比较字符串的前后顺序
function sortTest(a) {
  // a.sort((i, m) => { return i - m })
  a.sort((i,m)=>m-i)
  console.log(a)
}
sortTest([5, 3, 2, 6, 100, 1, 6, 3, 2, 1])

// test foreach return 会终止吗
const forE = [1, 2, 3, 4, 5, 6]
forE.forEach(element => {
  console.log('b'+element)
  if (element > 4) return
  console.log(element)
})

