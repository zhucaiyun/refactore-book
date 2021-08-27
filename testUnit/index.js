// <!--
//  * @Author       : zhucaiyun1@xdf.cn
//  * @Date         : 2021-07-22 18:31:43
//  * @LastEditors  : zhucaiyun1@xdf.cn
//  * @LastEditTime : 2021-08-27 12:57:26
//  * @Description  : 构筑测试体系
// -->
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
      this.addProducer(new producers(this, d))
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
  get demandValue() { return Math.min(this._demand,this.totalProduction)}
  get actualTotalPrice() { return this.price*this.demandValue } // 总售价
  get producersTotalCost() { // 成本总
    this._producers.reduce((all, item) => {
      return all+item.cost*item.production
    },0)
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