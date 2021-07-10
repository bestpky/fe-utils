export type Obj = { [key: string]: unknown }

const isObject = (target: unknown): target is Obj =>
    (typeof target === 'object' || typeof target === 'function') && target !== null

/**
 * 深拷贝
 * @param target
 * @param map
 * @returns
 */
export function deepClone(target: unknown, map = new WeakMap()) {
    if (isObject(target)) {
        if (map.get(target)) {
            return target
        }
        // 获取当前值的构造函数：获取它的类型
        let constructor = target.constructor
        // 检测当前对象target是否与正则、日期格式对象匹配
        if (/^(RegExp|Date)$/i.test(constructor.name)) {
            // 创建一个新的特殊对象(正则类/日期类)的实例
            // @ts-ignore
            return new constructor(target)
        }
        map.set(target, true) // 为循环引用的对象做标记
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (const prop in target) {
            // 避免复制到原型链上的同名属性
            if (target.hasOwnProperty(prop)) {
                Reflect.set(cloneTarget, prop, deepClone(target[prop], map))
            }
        }
        return cloneTarget
    } else {
        return target
    }
}
