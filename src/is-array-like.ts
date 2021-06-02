export type ArrayLike = {
    length: number
}
const MAX_SAFE_INTEGER = 9007199254740991

function isLength(value: number) {
    return typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

/**
 * 是否类数组
 *
 * @param {*}
 * @returns {boolean}
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */
export function isArrayLike(value: any): value is ArrayLike {
    return value != null && typeof value !== 'function' && isLength(value.length)
}
