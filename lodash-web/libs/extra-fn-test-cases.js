// testCases.arrayToLinkedList = [{
//   input: [[1,2]],
//   output: {
//     next: {
//       value: 1,
//       next: {
//         value: 2,
//         next: null,
//       }
//     }
//   }
// }, {
//   input: [[]],
//   output: {
//     next: null
//   }
// }]
testCases.parseJson = [{
  input: [`"true"`],
  output: "true"
}, {
  input: [`23`],
  output: 23
}, {
  input: [`[1,2,3]`],
  output: [1,2,3]
}, {
  input: [`true`],
  output: true
}, {
  input: [`null`],
  output: null
}, {
  input: [`{"a":1}`],
  output: {a:1}
}, {
  input: [`[{"a":1,"b":true},2]`],
  output: [{a:1,b:true},2]
}, {
  input: [`{"a":[1,2]}`],
  output: {a:[1,2]}
}, {
  input: [`[[1,2],[3,4]]`],
  output: [[1,2],[3,4]]
}, {
  input: [`{"a":{"b":3}}`],
  output: {a:{b:3}}
}, ]

testCases.stringifyJson = [{
  input: [{a:1}],
  output: '{"a":1}'
}, {
  input: [[1,2,3,4,5]],
  output: '[1,2,3,4,5]'
}, {
  input: [{
    a:1,
    b: true,
    c: null,
    d: [1,2,{
      x: 5,y:6,
      z: {
        i: "foobar",
        j: 3.45
      }
    }]
  }],
  output: JSON.stringify({
    a:1,
    b: true,
    c: null,
    d: [1,2,{
      x: 5,y:6,
      z: {
        i: "foobar",
        j: 3.45
      }
    }]
  })
}]

/*
testCases = _.merge(testCases, {
  "dellTo3355": {
    description: '输入单词，输出在电话拔号盘上按出这个单词所需要的数字',
    testData: [{
      input: ['dell'],
      output: 3355,
    }]
  },
  "isPrime": {
    description: '输入n，判断n是否为素数',
    testData: [{
      input: [97],
      output: true,
    }]
  },
  "最大公约数": {
    description: '输入m和n，输出m和n的最大公约数',
    testData: [{
      input: [56, 25],
      output: 2,
    }]
  },
  "大整数相加": {
    description: '输入两个代表大整数的数组，输出它们的和，同样用大整数表示',
    testData: [{
      input: [[1,1,1,1,1],[9,9,9,9]],
      output: [2,1,1,1,0]
    }]
  },
  "n-m之间的素数": {
    description: '输入m和n，输出一个数组包含m和n之间所有的素数，包含m和n',
    testData: [{
      input: [2,17],
      output: [2,3,5,7,11,13,17]
    }]
  },
  "求数组最大项": {
    description: '输入一个数组，输出其中的最大项',
    testData: [{
      input: [[1,2,4,5,6,7,8,9]],
      output: 9
    }]
  },
  "1-n的和": {
    description: '输入n，输出1到n的和，包含n',
    testData: [{
      input: [100],
      output: 5050
    }]
  },
  "1-n以内的完全数": {
    description: '输入n，输出n（包含）以内的所有完全数，放在一个数组里',
    testData: [{
      input: [6],
      output: [6]
    }]
  },
  "abc排序": {
    description: '输入三个数a，b，c，输出一个数组，包含它们按序排列的结果',
    testData: [{
      input: [3,2,5],
      output: [2,3,5]
    }]
  },
  "fibb": {
    description: '输入n，输出斐波那契列数第n项的值',
    testData: [{
      input: [5],
      output: 5
    }]
  },
  "isInteger": {
    description: '输入n，判断n是否为整数',
    testData: [{
      input: [1],
      output: true
  }, {
    input: [1.5],
    output: false
    }]
  },
  "m的n次方": {
    description: '输入m和n，输出m的n次方',
    testData: [{
      input: [2,5],
      output: 32
    }]
  },
  "Sin-Taylor": {
    description: '输入x，输出sin(x)的值',
    testData: [function(fn){
      return fn(2.5) - Math.sin(2.5) < 0.001
    }]
  },
  "round": {
    description: '输入n，输出n被四舍五入后的结果',
    testData: [{
      input: [1,2],
      output: 3
    }]
  },
  // "毕达哥拉斯三元组": {
  //   description: '忘记了',
  //   testData: [{
  //     input: [],
  //     output: []//忘记是多少了
  //   }]
  // },
  // "等差数列前n项和": {
  //   description: '',
  //   testData: [{
  //     input: [1,2],
  //     output: 3
  //   }]
  // },
  "第一次只出现一次的字符": {
    description: '输入一个字符串，输出这个字符串中第一次只出现一次的字符',
    testData: [{
      input: ['lksdjlfoiejfsdfisdf'],
      output: 'k'
    }]
  },
  "反向输出一个三位数": {
    description: '输入一个整数n，输出这个数倒序后的字符串形式',
    testData: [{
      input: [3510],
      output: "0153"
    }]
  },
  "分解质因数": {
    description: '输入n，输出把n分解成质因数的结果，放在数组中，从小到大放置，例：输入8，输出[2,2,2]',
    testData: [{
      input: [8],
      output: [2,2,2]//TODO
    }]
  },
  "猴子选王": {
    description: '输入猴子个数m，报数个数n，输出最终为王的猴子',
    testData: [{
      input: [10,2],
      output: 5
    }]
  },
  "评委打分": {
    description: '输入一个数组表示评委的打分，输出去掉一个最高分去掉一个最低分后的平均分',
    testData: [{
      input: [[1,2,3,4,5,6,7,8,9,10]],
      output: 5.5
    }]
  },
  "敲7": {
    description: '输入n，输出n（包含）以内所有7的倍数及数位中有7的数，从小到大放在数组中',
    testData: [{
      input: [20],
      output: [7,14,17]
    }]
  },
  "求平方根": {
    description: '输入n，求n的平方根，不得调用sqrt',
    testData: [{
      input: [9],
      output: 3
    }]
  },
  "日历": {
    description: '输入年份y，月份m，输出这一年的这一个月的第一天是周几，1表示周一，0表示周日',
    testData: [{
      input: [2016,12],
      output: 4
    }]
  },
  // "扫雷游戏": {
  //   description: '',
  //   testData: [{
  //     input: [1,2],
  //     output: 3
  //   }]
  // },
  // "数字转换成字符串": {
  //   description: '',
  //   testData: [{
  //     input: [3456],
  //     output: '3456'
  //   }]
  // },
  // "水仙花数": {
  //   description: '',
  //   testData: [{
  //     input: [1,2],
  //     output: 3
  //   }]
  // },
  "四舍五入": {
    description: '输入一个数n，输出它四舍五入后的结果',
    testData: [{
      input: [1.4],
      output: 1
  }, {
    input: [1.5],
    output: 2
    }]
  },
  // "素数判定优化": {
  //   description: '',
  //   testData: [{
  //     input: [1,2],
  //     output: 3
  //   }]
  // },
  // "随机数与概率算法": {
  //   description: '',
  //   testData: [{
  //     input: [1,2],
  //     output: 3
  //   }]
  // },
  "向量点积": {
    description: '输入两个数组表示两个向量，数组的长度表示向量的维度，输出向量的点积',
    testData: [{
      input: [[1,2], [3,4]],
      output: 11
    }]
  },
  "字符串展开": {
    description: '输入一个字符串，输出把其中省略的字符补上的完整字符串，例：输入a-c，输出abc',
    testData: [{
      input: ['a-d'],
      output: 'abcd'
    }]
  },
  "最小公倍数": {
    description: '输入两个数，输出它们的最小公倍数',
    testData: [{
      input: [1,2],
      output: 2
    }]
  },
  "最大公约数": {
    description: '输入两个数，输出它们的最大公约数',
    testData: [{
      input: [1,2],
      output: 1
    }]
  },
  "最小的能被1-n整除的数": {
    description: '输入n，输出最小的能被1-n整除的数',
    testData: [{
      input: [3],
      output: 6
    }]
  },
})

*/