/**
 * 数组扁平化
 * @param arr 数组
 * @returns 数组
 */
export function flatten(arr: any[]) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// export function flatten(arr: any[]) {
//     return arr.reduce((prev, cur) => {
//         return prev.concat(cur instanceof Array ? flatten(cur) : cur)
//     }, [])
// }
