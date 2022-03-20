/**
 * 延迟执行函数
 * @param {number} ms 毫秒数
 * @returns {Promise}
 */
export function delay(ms: number) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  )
}

export default delay
