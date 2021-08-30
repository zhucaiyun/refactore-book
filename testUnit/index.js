// <!--
//  * @Author       : zhucaiyun1@xdf.cn
//  * @Date         : 2021-07-22 18:31:43
//  * @LastEditors  : zhucaiyun1@xdf.cn
//  * @LastEditTime : 2021-08-27 12:57:26
//  * @Description  : 构筑测试体系
// -->

const { assert } = require("chai")

// 造数据
function sampleProvinceData() {
  return {
    name: "Beijing",
    producers: [
      {name: 'xdf',cost:10,production: 9},
      {name: 'hwl',cost:12,production: 10},
      {name: 'px',cost:10,production: 6}
    ],
    demand: 30,
    price: 20
  }
}


class Province {
  constructor(doc) {
    this._name = doc._name // 省名
    this._producers = [] // 生产商们 成本 生产数量
    this._demand = doc.demand // 需求
    this._price = doc.price // 单价
    this._totalProduction = 0 // 总生产量
    // 循环遍历producers
    doc.producers.forEach(d => {
      this.addProducer(new Producer(this, d))
    })
  }
  addProducer(arg) {
    this._producers.push(arg)
    this._totalProduction+=arg.production
  }
  get name() { return this._name} // 为什么还需要get拦截呢？
  get producers() { return this._producers.slice() } // slice() 这一对象是一个由begin和end决定的原数组的浅拷贝 原数组不变
  get totalProduction() { return this._totalProduction }
  set totalProduction(arg) { this._totalProduction = arg } // 这个set和get有什么拦截的 没意义呀
  get demand() { return this._demand }
  set demand(val) { return this._demand = parseInt(val) }
  get price() { return this._price }
  set price(val) { this._price = parseInt(val) }
  get shortfall() { return this._demand - this.totalProduction } // 计算缺额
  get demandValue() { return Math.min(this._demand,this.totalProduction)} // 严谨写法
  get actualTotalPrice() { return this.price*this.demandValue } // 总售价
  get producersTotalCost() { // 成本总
    // 以下写法不严谨
    // this._producers.reduce((all, item) => {
    //   return all+item.cost*item.production
    // },0)

    // 严谨写法 需要比较提供的数量和实际需求数量的差 提供太多也用不了
    /*
    * sort 按照从小到大排
    */
    let remainedNum = this.demand
    let totalCost = 0
    this._producers.sort((a, b) => a.cost - b.cost).forEach(item => {
      if(remainedNum<=0) return
      const currentNum = Math.min(remainedNum, item.production) // 获取当前产品实际需要的数量
      totalCost += currentNum * item.cost
      remainedNum -= currentNum
    })
    return totalCost
  }
  get profile() { return this.actualTotalPrice - this.producersTotalCost } // 计算利润 --- 实际额度*price 单价-从生产商的进价的总和
}

// producer 类
class Producer {
  constructor(aProvince, data) {
    this._province = aProvince
    this._cost = data.cost // 成本
    this._name = data.name //产品名称
    this._production = data.production || 0 // 产品数量
  }
  get name() { return this._name }
  get cost() { return this._cost }
  set cost(val) { this._cost = parseInt(cost) }
  get production() { return this._production }
  set production(val) {
    // 改变总量
    const amount = parseInt(val)
    const newProduction = Number.isNaN(amount) ? 0 : amount
    this._province.totalProduction += newProduction - this._production // 更新派生数据 totalProduction not good way
    this._production = newProduction
  }
}
// 类写法的程序怎么export 然后在单独的测试js文件中写测试脚本呢？独立测试？
// 测试开发测的是什么；开发者测的是什么
// tdd和bdd
// 观察被测试类应该做的所有事情，然后对这个类的每个行为进行测试，包括各种可能使他发生的边界条件；测试应该是一种风险的驱动行为
var expect = require('chai').expect
describe('测试province', function () {
  let asia
  beforeEach(function () {
    asia = new Province(sampleProvinceData())
  })
  it('测试shortfall', function () {
    // const asia = new Province(sampleProvinceData())
    expect(asia.shortfall).equal(5)
  })
  // 测试利润
  it('测试利润 profile', function () {
    // const asia = new Province(sampleProvinceData())
    expect(asia.profile).equal(230)
  })
  it('测试 production', function () {
    asia.producers[0].production = 20
    expect(asia.shortfall).equal(-6)
    expect(asia.profile).equal(292)
  })
})


