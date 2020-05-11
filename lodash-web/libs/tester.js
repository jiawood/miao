var test = (function() {
  return test

  function test(fn, fnContext, testCases, base, baseContext) {
    // if (fn.name === 'ary') {
    //   debugger
    // }
    if (!fn) { //如果传过来的函数为空，则为未实现
      return null
      return [{
        pass: false,
        type: 'NotImplemented',
      }]
    }
    if (!Array.isArray(testCases)) { //测试那些简单算法的时候用的
      testCases = testCases.testData
    }
    return testCases.map(function(testCase) {
      if (Array.isArray(testCase)) {
        return compareTest(fn, fnContext, testCase, base, baseContext)
      }
      if (typeof testCase == 'object') {
        return outputTest(fn, fnContext, testCase)
      }
      if (typeof testCase == 'function') {
        return customTest(fn, fnContext, testCase)
      }
    })
  }

  /**
   * 将一个对象转换为其对应源代码
   * 原因是JSON.stringify无法正确处理NaN,undefined,正则,函数等
   */
  function toSource(val, indent = 0) {
    function wrap(str) {
      return '#####' + str + '#####'
    }
    return JSON.stringify(val, function(key, val) {
      if (val instanceof Number) {
        return wrap(`new Number(${val.valueOf()})`)
      }
      if (val instanceof String) {
        return wrap(`new String('${val.valueOf()}')`)
      }
      if (val instanceof Boolean) {
        return wrap(`new Boolean(${val.valueOf()})`)
      }
      if (val !== val) {//NaN
        return wrap('NaN')
      }
      if (typeof val === 'function') {
        return wrap(val.toString())
      }
      if (val === undefined) {
        return wrap('undefined')
      }
      if (Object.prototype.toString.call(val) === '[object RegExp]') {
        return wrap(val.toString())
      }
      if (Object.prototype.toString.call(val) === '[object Date]') {
        return wrap('new Date(' + val.getTime() + ')')
      }
      return val
    }, indent).replace(/"#####|#####"/g, '').replace(/\\r\\n/g, '\r\n')
  }

  function stringifyFunction(key, value) {
    if (typeof value == 'function') {
      return value.toString()
    } else if (Object.prototype.toString.call(value) === '[object RegExp]') {
      return value.toString()
    } else {
      return value
    }
  }

  /**
   * 以数据case分别测试fn和base两个函数，两个context分别为其前一个参数的context
   * 
   *
   *
   */
  function compareTest(fn, fnContext, testCase, base, baseContext) {
    var expectedOutput = base.apply(baseContext, _.cloneDeep(testCase))
    var output
    try {
      output = fn.apply(fnContext, _.cloneDeep(testCase))
    } catch (e) {
      if (e.type == 'InfiniteLoop') {
        return {
          pass: false,
          type: e.type,
          input: `${fn.name}(${_.escape(toSource(testCase).slice(1,-1))})`,
          source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
        }
      }
      if (e.type == 'SyntaxError') {
        return {
          pass: false,
          type: e.type,
          error: e.error,
          // source: _.escape(infiniteLoopDetector.unwrap(e.source)),
        }
      }

      return {
        pass: false,
        type: 'RuntimeError',
        error: e.stack,
        input: `${fn.name}(${_.escape(toSource(testCase).slice(1,-1))})`,
        expect: _.escape(toSource(expectedOutput)),
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    }
    if (_.isEqual(expectedOutput, output)) {
      return {
        pass: true,
        input: `${fn.name}(${_.escape(toSource(testCase).slice(1,-1))})`,
        output: _.escape(toSource(output)),
        expect: _.escape(toSource(expectedOutput)),
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    } else {
      return {
        pass: false,
        type: 'WrongAnswer',
        input: `${fn.name}(${_.escape(toSource(testCase).slice(1,-1))})`,
        output: _.escape(toSource(output)),
        expect: _.escape(toSource(expectedOutput)),
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    }
  }

  /**
   * 算法的输入出输出已经确定的情况
   * 此时testCase是一个Object，包含input与output字段
   */
  function outputTest(fn, fnContext, testCase) {
    try {
      var output = fn.apply(fnContext, _.cloneDeep(testCase.input))
    } catch (e) {
      if (e.type == 'InfiniteLoop') {
        return {
          pass: false,
          type: e.type,
          input: `${fn.name}(${_.escape(toSource(testCase.input).slice(1,-1))})`,
          source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
        }
      }
      if (e.type == 'SyntaxError') {
        return {
          pass: false,
          type: e.type,
          error: e.error,
        }
      }
      return {
        pass: false,
        type: 'RuntimeError',
        error: e,
        input: `${fn.name}(${_.escape(toSource(testCase.input).slice(1,-1))})`,
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    }
    if (_.isEqual(output, testCase.output)) {
      return {
        pass: true,
        input: `${fn.name}(${_.escape(toSource(testCase.input).slice(1,-1))})`,
        output: _.escape(toSource(output)),
        expect: _.escape(toSource(testCase.output)),
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    } else {
      return {
        pass: false,
        type: 'WrongAnswer',
        input: `${fn.name}(${_.escape(toSource(testCase.input).slice(1,-1))})`,
        output: _.escape(toSource(output)),
        expect: _.escape(toSource(testCase.output)),
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    }
  }

  /**
   * 自定义测试函数
   * 使用场景一般是输出不固定的情况比如输出随机数或者小数
   * 此时testCase实际上是一个写好的函数，运行这个函数返回true/false得到是否通过测试
   */
  function customTest(fn, fnContext, testCase) {
    var pass = false
    try {
      pass = testCase(fn.bind(fnContext))
    } catch (e) {
      if (e.type == 'InfiniteLoop') {
        return {
          pass: false,
          type: e.type,
          source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
        }
      }
      if (e.type == 'SyntaxError') {
        return {
          pass: false,
          type: e.type,
          error: e.error,
        }
      }
      return {
        pass: false,
        type: 'RuntimeError',
        error: e,
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    }
    if (pass) {
      return {
        pass: true,
        input: '\n' + js_beautify(testCase.toString()),
        output: '返回函数的高阶函数不展示输出',
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    } else {
      return {
        pass: false,
        type: 'WrongAnswer',
        source: _.escape(js_beautify(infiniteLoopDetector.unwrap(fn.toString()))),
      }
    }
  }
}())