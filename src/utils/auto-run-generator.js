function run(gen) {
  //把返回值包装成promise
  return new Promise((resolve, reject) => {
    var g = gen()

    function _next(val) {
      //错误处理
      try {
        var res = g.next(val)
      } catch (err) {
        return reject(err)
      }
      if (res.done) {
        return resolve(res.value)
      }
      //res.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(res.value).then(
        val => {
          _next(val)
        },
        err => {
          //抛出错误
          g.throw(err)
        }
      )
    }
    _next()
  })
}

function* myGenerator() {
  try {
    console.log(yield Promise.resolve(1))
    console.log(yield 2) //2
    console.log(yield Promise.reject('error'))
  } catch (error) {
    console.log(error)
  }
}

const result = run(myGenerator) //result是一个Promise
//输出 1 2 error
