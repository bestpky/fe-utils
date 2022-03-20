/**
 * map方法，相当于Array.prototype.map
 * @param array
 * @param iteratee
 * @returns
 */
export function map<T, R>(array: T[], iteratee: (item: T, index: number, array: T[]) => R): R[] {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
