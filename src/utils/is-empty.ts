import { isArrayLike } from './is-array-like'
import { typeOf } from './type-of'
import { isPrototype } from './is-prototype'

/**
 * 是否为空
 * @param {*}
 * @returns {boolean}
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true
  }
  const t = typeOf(value)
  if (isArrayLike(value) && (Array.isArray(value) || typeof value === 'string' || t === 'arguments')) {
    return !value.length
  }
  if (t == 'set' || t == 'map') {
    return !value.size
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length
  }
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}
