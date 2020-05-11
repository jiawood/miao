var testCasesByHand = {
  cloneDeep: [
    [1],
    [new RegExp('foo','i')],
    [{a:1}],
    [{a:1, b:{c:1}}],
    [{a:1, b:[1,2,3,4]}],
    [[1,2,{a:1}, {b:[3,4]}]],
  ],
  identity: [
    [{a:1}],
    [[1,2,3]],
  ],
  map: [
    [[1, 2, 3], function(v,i,o) {return v+i+o.length*2}],
    [[1, 2, 3, 4, 5], function(v,i,o) {return (v+i)%2==0}],
  ],
  filter: [
    [[1,2,3,4,5,6], function(x) {return x % 3 == 0}],
    ['the quick brown fox jumps over the lazy dog'.split(' '), function(s) {return s.length > 4}],
  ],
  partition: [
    [[1,2,3,4,5,6,7,8,9,10,11], (x)=>{if (x==2||x==3||x==5||x==7||x==11) {return true} else {return false}}],
  ],
  every: [
    [[true, 1, null, 'yes'], Boolean],
  ],
  some: [
    [[true, 1, null, 'yes'], Boolean],
  ],
  reject: [
    [[1,2,3,4,5,6], function(x) {return x % 3 == 0}],
    ['the quick brown fox jumps over the lazy dog'.split(' '), function(s) {return s.length > 4}],
  ],
  reduce: [
    [[1,2,3,4,5,6,7], function(a,b){return a+b}, 100],
    [[1,2,3,4,5,6,7], function(a,b){return a+b}],
  ],
  includes: [
    [[1, 2, 3, 4, 5, 6, 7, 5], 3, 5],
  ],
  groupBy: [
    [[1.3, 2.1, 2.4], function(num){ return Math.floor(num) }],
    [['one', 'two', 'three'], 'length'],
  ],
  keyBy: [
    [[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}], 'age'],
    [[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}], 'age'],
  ],
  isMatch: [
    [{a:1,b:{c:1}}, {b:{c:1}}],
    [{a:33,f:7,g:{x:{y:15}}}, {g:{x:{y:15}}}],
  ],
  isEqual: [
    [22, 23],
    [1,2],
    [2,2],
    ['foo','foo'],
    [[1,2,3], [1,2,3]],
    [[1,2], {0:1,1:2,length:2}],
    [[{},{}],[{},{}]],
    [{a:1,b:2}, {a:1,b:2,c:3}],
    [{a:1,b:2}, {b:2,a:1}],
    [[{a:1}],[{a:1}]],
    [[{a:1,b:1}],[{a:1,b:2}]],
    [{a:[1,2,3]},{a:[1,2,3]}],
    [{a:[1,2,3]},{a:[1,2,4]}],
  ],
  at: [
    [{ 'a': [{ 'b': { 'c': 3 } }, 4] }, ['a[0].b.c', 'a[1]']],
  ],
  has: [
    [{ 'a': { 'b': 2 } }, 'a.b']
  ],
  invert: [
    [{ 'a': 1, 'b': 2, 'c': 1 }]
  ],
  ceil: [
    [4.006],
    [6.004, 2],
    [6040, -2],
  ],
  chunk: [
    [['a', 'b', 'c', 'd'], 2],
    [['a', 'b', 'c', 'd'], 3],
  ],
  compact: [
    [[0, 1, false, 2, '', 3]],
    [[1, 0, false, '', NaN]],
  ],
  concat: [
    [[1], 2, [3], [[4]]],
  ],
  difference: [
    [[2, 1], [2, 3]],
    [[1,2,3,4], [2,3,4,5]],
    [[1,2,3,4], [1,3], [4]],
    [[1,2,3,4,5,6,7,8], [1,3], [4,8], [6]],
  ],
  differenceBy: [
    [[2, 1], [2, 3], it => it],
    [[1,2,3,4], [2,3,4,5]],
    [[1,2,3,4], [1,3], [4]],
    [[1,2,3,4,5,6,7,8], [1,3], [4,8], [6], it => it],
  ],
  drop: [
    [[1, 2, 3], 5],
    [[1, 2, 3]],
  ],
  dropWhile: [
    [[1,2,3,4,5,6], it => it == 5]
  ],
  dropRight: [
    [[1, 2, 3], 5],
    [[1, 2, 3]],
  ],
  fill: [
    [[4, 6, 8, 10], '*', 1, 3],
    [Array(3), 2],
    [[1, 2, 3], 'a'],
  ],
  flatten: [
    [[1, [2, [3, [4]], 5]]],
  ],
  flattenDeep: [
    [[1, [2, [3, [4]], 5, [6, [7,8]]]]],
  ],
  fromPairs: [
    [[['a', 1], ['b', 2]]],
  ],
  head: [
    [[1, 2, 3]],
    [[]],
  ],
  indexOf: [
    [[1, 2, 1, 2], 2],
    [[1, 2, 1, 2], 2, 2],
    [[1, 2, 1, 2], 2, -12],
    [[1, NaN, 1, 2], NaN],
  ],
  initial: [
    [[1, 2, 3]]
  ],
  intersection: [
    [[2, 1], [2, 3]]
  ],
  join: [
    [['a', 'b', 'c'], '~'],
    [[1, 2, 3], 4],
  ],
  last:[
    [[1, 2, 3]]
  ],
  lastIndexOf: [
    [[1, 2, 1, 2], 2, 2],
    [[1, 2, 1, 2], 2, -22],
    [[1, NaN, 1, 2], NaN],
  ],
  nth: [
    [['a', 'b', 'c', 'd'], -2],
    [['a', 'b', 'c', 'd'], -5],
    [['a', 'b', 'c', 'd'], -8],
    [['a', 'b', 'c', 'd'], 9],
  ],
  pull: [
    [['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c']
  ],
  pullAll: [
    [['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']]
  ],
  pullAt: [
    [['a', 'b', 'c', 'd'], [1, 3]]
  ],
  reverse: [
    [[1, 2, 3]]
  ],
  sortedIndex: [
    [[30, 50], 40],
    [[1,2,2,2,2,3], 2]
  ],
  tail: [
    [[1, 2, 3]]
  ],
  take: [
    [[1, 2, 3], 5]
  ],
  takeRight: [
    [[1,2,3,4], 2]
  ],
  union: [
    [[2], [1, 2], [3, 4]]
  ],
  uniq: [
    [[2, 1, 2, 1, 3, 'a', 'a', 'b']]
  ],
  unzip: [
    [[['a', 1, true], ['b', 2, false]]]
  ],
  zip: [
    [['a', 'b'], [1, 2], [true, false]],
    [['a', 'b'], [1], [true, false,'v'],['v']],
  ],
  without: [
    [[2, 1, 2, 3], 1, 2]
  ],
  xor: [
    [[2, 1], [2, 3]],
    [[1,2,3,4], [2,3,4,5],[2,4,5,6,7],[5,6,7,8]],
  ],
  get: [
    [{a:{b:[1,2,[3,4,[{foo:42},6]]]}}, 'a.b[2][2][0].foo']
  ],
  isBoolean: [
    [new Boolean(true)],
  ],
  // 以下为字符串相关函数的测试数据
  camelCase: [
    ['Foo Bar'],
    ['--foo-bar--'],
    ['__FOO_BAR__']
  ],
  capitalize: [
    ['FRED']
  ],
  endsWith: [
    ['abc', 'c'],
    ['abc', 'b'],
    ['abc', 'b', 2]
  ],
  escape: [
    ['fred, barney, & pebbles']
  ],
  escapeRegExp: [
    ['[lodash](https://lodash.com/)']
  ],
  kebabCase: [
    ['Foo Bar'],
    ['fooBar'],
    ['__FOO_BAR__']
  ],
  lowerCase: [
    ['--Foo-Bar--'],
    ['fooBar'],
    ['__FOO_BAR__']
  ],
  lowerFirst: [
    ['Fred'],
    ['FRED']
  ],
  pad: [
    ['abc', 8],
    ['abc', 8, '_-'],
    ['abc', 3]
  ],
  padEnd: [
    ['abc', 6],
    ['abc', 6, '_-'],
    ['abc', 3]
  ],
  padStart: [
    ['abc', 6],
    ['abc', 6, '_-'],
    ['abc', 3]
  ],
  parseInt: [
    ['08']
  ],
  repeat: [
    ['*', 3],
    ['abc', 2],
    ['abc', 0]
  ],
  replace: [
    ['Hi Fred', 'Fred', 'Barney']
  ],
  snakeCase: [
    ['Foo Bar'],
    ['fooBar'],
    ['--FOO-BAR--']
  ],
  split: [
    ['a-b-c', '-', 2]
  ],
  startCase: [
    ['--foo-bar--'],
    ['fooBar'],
    ['__FOO_BAR__']
  ],
  deburr: [
    ['déjà vu']
  ],
  // 以下为高阶函数人肉测试数据
  matches: [function(fn) {
    return fn({a:1})({a:1}) === true
  }],
  property: [function(fn) {
    return fn('name')({name: 'damiao'}) === 'damiao'
  }],
  ary: [function(fn) {
    return fn(parseInt, 1)('13', 16) === 13
  }],
  unary: [function(fn) {
    return fn((a,b) => b)(1,2) === undefined
  }],
  negate: [function(fn) {
    return fn(a => a % 2)(2) === true
  }],
  once: [function(fn) {
    a = fn(a => Math.random())
    var firstReturn = a()
    return firstReturn === a()
  }],
  spread: [function(fn) {
    return fn((a,b)=>a+b)([1,2]) === 3
  }],
  curry: [function(fn) {
    return fn((a,b,c,d) => a+b+c+d)(1)(2,3)(4) === 10
  }],
  once: [function(fn) {
    var i = 0
    var onced = fn(() => i++)
    onced()
    onced()
    return onced() === 0
  }],
  memoize: [function(fn) {
    var i = 0
    var med = fn(it => {
      i++
      return it
    })
    med(5)
    med(5)
    return i === 1
  }],
  flip: [function(fn) {
    return fn((a,b,c) => a+b+c)('a','b','c') === 'cba'
  }],
  conforms: [function(fn) {
    return [{b:1},{b:2},{b:3}].filter(fn({b: (b) => b>=2})).length === 2
  }],
  constant: [function(fn) {
    return fn(8)() === 8
  }],
  flow: [function(fn) {
    var add = (a,b) =>a+b
    var square = a => a*a
    var double = x => x*2
    return fn([add, square, double])(4,6) === 200
  }],
  method: [function(fn) {
    return fn('a.b', 1,2)({a:{b:(x,y) => x+y}}) === 3
  }],
  methodOf: [function(fn) {
    return fn({a:{b:(x,y) => x*y}}, 3,4)('a.b') === 12
  }],
  nthArg: [function(fn) {
    return fn(2)(1,2,3,4,5) === 3
  }],
  propertyOf: [function(fn) {
    return fn([1,2,3])(1) === 2
  }],
}
