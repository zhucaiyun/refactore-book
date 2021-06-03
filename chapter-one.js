/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-06-03 16:06:23
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-06-03 18:36:29
 * @Description  : example-001
 */
function statement (invoice,plays) {
  let totalAmount = 0;
  let volumeCredits=0; //发票积分
  let result = `Statement for ${invoice.customer}\n`; // 客户名？？？？
  const format = new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits: 2}).format;
  for(let perf of invoice.performances) {
    const play = plays[perf.playID]; // 获取到名字和type
    let thisAmount = 0; // 只是什么


    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if(perf.audience>30) {
          thisAmount += 1000*(perf.audience-30); // ?超过30个人每个人1000 总数增加
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if(perf.audience>20) {
          thisAmount += 10000+500*(perf.audience-200);
        }
        thisAmount+=300*perf.audience;
        break;
        default:
          throw new Error(`unknow type :${play.type}`)
    }

    // 积分累加
    volumeCredits+=Math.max(perf.audience-30,0) // 超过30 就累加积分 最小为0？？？
    
    // 喜剧的积分不一样吗？
    if("comedy"===play.type) {
      volumeCredits+=Math.floor(perf.audience/5) // 每5个就增加一个积分？？？
    }

    // 打印订单 
    result += `${play.name}:${format()}`
  }
  
}