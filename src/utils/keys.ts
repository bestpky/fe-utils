/** 收窄Object.keys的类型
 * @see https://github.com/microsoft/TypeScript/pull/13971
 */
export const keys = <{ <T>(o: NonNullable<T>): (keyof T)[] }>Object.keys
