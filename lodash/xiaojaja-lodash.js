var xiaojaja = {
  isNull:function(val){
    if(val === null){
      return true
    }else{
      return false
    }
  },
  isNaN:function(val){
    if(typeof val === "object"){

      return val.toString() === "NaN"
    }else{
      return val !== val
    }
  },

  chunk:function(arr,size=1){
    let res = []
    let n = arr.length
    while(n > size){
      res.push(arr.slice(0,size))
      n -= size
      arr = arr.slice(size)
    }
    res.push(arr)
    return res
  },
  compact:function(arr){
    return arr.filter(a => a)
  },
  concat:function(arr,...values){
    return arr.concat(...values)
  },

  //difference  寻找不同数组中的交集
  difference:function(arr,...args){
    let map = {}
    for(let i=0;i<args.length;i++){
      for(let j=0;j<args[i].length;j++){
        if(map[args[i][j]] === undefined){
          map[args[i][j]] = 1
        }
      }
    }
    const res = []
    for(let i of arr){
      if(map[i] != 1){
        res.push(i)
      }
    }
    return res
  },

  //drop 丢掉前n个数
  drop:function(arr,n=1){
    return arr.slice(n)
  },

  //drop 丢掉后n个数
  dropRight:function(arr,n=1){
    if(n === 0){
      return arr
    }else{
      return arr.slice(0,-n)
    }
  },
  //fill 根据start和end对原数组进行填充
  fill:function(arr,str,start=0,end=arr.length){
    for(let i=start;i<end;i++){
      arr[i] = str
    }
    return arr
  },
  // flatten 将数组中第一层数组展开
  flatten:function(arr){
    let res = []
    for(let i = 0; i<arr.length;i++){
      res = res.concat(arr[i])
      //res = res.push(...arr[i])
    }
    return res
  },
  //flattenDeep 深度展开
  flattenDeep:function(arr){


    function helper(arr,res){
      for(let i of arr){
        if(!Array.isArray(i)){
          res.push(i)
        }else{
          helper(i,res)
        }
      }
      return res

    }
    return helper(arr,[])
  },
  //head 头
  head:function(arr){
    return arr[0]
  },
  //indexOf
  indexOf:function(arr,val,fromIndex=0){
    let n = arr.length
    if(fromIndex<0 && n > -fromIndex){
      fromIndex = n + fromIndex
    }else if(n <= -fromIndex){
      fromIndex = 0
    }
    for(let i=fromIndex;i<arr.length;i++){
      if(arr[i] = val){
        return i
      }
    }
    return -1
  },
  //inital 除了最后一个
  initial:function(arr){
    return arr.slice(0,arr.length-1)
  },
  join:function(arr,sep=","){
    let res = ""

    for(let i of arr){
      res += i + String(sep)
    }
    return res.slice(0,res.length-1)
  },
  last:function(arr){
    return arr[arr.length - 1]
  },
  nth:function(arr,n){
    if(n>=0){
      return arr[n]
    }else{
      return arr[arr.length + n]
    }
  },
  //sortedIndex二分查找
  sortedIndex:function(arr,val){
    let l = 0
    let r = arr.length - 1
    while(l < r){
      let mid = (l + r ) >> 1  //右中位数
      if(arr[mid] < val){
        l = mid + 1
      }else{
        r = mid
      }
    }
    return l
  },
  tail:function(arr){
    arr.shift()
    return arr
  },
  //unzip
  unzip:function(arr){
    let n = arr.length
    let res = new Array(arr[0].length)
    for(let i = 0;i<arr[0].length;i++){
      res[i] = []
      for(let j = 0;j<n;j++){
        res[i].push(arr[j][i])
      }
    }
    return res
  },
  //size  长度
  size(value){
    if((value instanceof Array) || (typeof value === "string")){
      return value.length
    }else if(value instanceof Object){
      let num = 0
      for(let i in value){
        num++
      }
      return num
    }
  },
  //ciel 向上取整 但是增加了精度
  ciel(val,precision=0){
      return Math.ciel(val * Math.pow(10,precision)) / Math.pow(10,precision)
  }













}
