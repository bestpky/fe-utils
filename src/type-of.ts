/**
 * 检查一个值的类型
 * @param args 任何类型
 * @returns stirng
 */
export function typeOf(args: unknown) {
    return Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
}
