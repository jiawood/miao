var infiniteLoopDetector = (function() {
  var map = {}
  var timeRestrict = 200//循环时间限制，单位ms
  var frequencyRestrict = 200//执行频率限制，单位为 次/ms

  function infiniteLoopDetector(id) {
    if (id in map) { //非首次执行
      map[id].count++
      var duration = Date.now() - map[id].start
      if (duration > timeRestrict && map[id].count / duration > frequencyRestrict) {
        delete map[id]
        throw {
          type: 'InfiniteLoop',
          message: 'Loop runing too long!',
        }
        // throw new Error('Loop runing too long!')
      }
    } else { //首次运行，之所有把非首次运行的判断写在前面的if里是因为上面会执行更多次
      map[id] = {
        start: Date.now(),
        count: 0
      }
      setTimeout(function() {
        delete map[id]
      }, timeRestrict)
    }
  }

  infiniteLoopDetector.wrap = function(code) {
    return code.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(line) {
      var id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
      return `infiniteLoopDetector(${id});${line}infiniteLoopDetector(${id});`
    })
  }

  infiniteLoopDetector.unwrap = function(codeStr) {
    return codeStr.replace(/infiniteLoopDetector\([0-9]*?\);/g, '')
  }

  return infiniteLoopDetector

  // How to use
  // use .wrap to wrap your code by this
  // var loopid = Math.random()
  // infiniteLoopDetector(loopid)
  // for (;;) {
  //   infiniteLoopDetector(loopid)
  // }
}())