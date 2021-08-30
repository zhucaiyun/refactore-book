/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-08-30 10:11:14
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-08-30 11:10:01
 * @Description  : 测试脚本
 */

var add = require('../learnMocha.js')
var expect = require('chai').expect
describe('加法函数测试', function () {
  it('1+1=2', function () {
    expect (add(1,1)).to.be.equal(2) // 断言库
   })
})
