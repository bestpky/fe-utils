/**
 * 解析url查询字符串为对象
 * @param url 如baidu?name=abc&age=12&isMan
 * @returns obj
 */
export function parseUrlQuery(url: string) {
  let result: {
    [key: string]: string | number | true | any[]
  } = {}
  const arr = /.+\?(.+)$/.exec(url) // 将 ? 后面的字符串取出来
  if (!arr) {
    return
  }
  const queryStr = arr[1]
  if (!queryStr) {
    return result
  }
  const queryArr = queryStr.split('&') // 将字符串以 & 分割后存到数组中
  // 将 params 存到对象中
  queryArr.forEach(param => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split('=') // 分割 key 和 value
      let value: string | number = decodeURIComponent(val) // 解码
      value = /^\d+$/.test(value) ? parseFloat(value) : value // 判断是否转为数字

      if (result.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        const temp = result[key]
        result[key] = Array.isArray(temp) ? [...temp, value] : [result[key], value]
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        result[key] = value
      }
    } else {
      // 处理没有 value 的参数
      result[param] = true
    }
  })

  return result
}
