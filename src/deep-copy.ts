export type Obj = { [key: string]: unknown } | Function | null

const isObject = (target: Obj) => (typeof target === 'object' || typeof target === 'function') && target !== null

/**
 * 深拷贝
 * @param target
 * @param map
 * @returns
 */
export function deepClone(target: Obj, map = new WeakMap()) {
    if (target) {
        if (map.get(target)) {
            return target
        }
        if (isObject(target)) {
            map.set(target, true) // 为循环引用的对象做标记
            const cloneTarget = Array.isArray(target) ? [] : typeof target !== 'function' ? {} : target
            if (typeof target !== 'function') {
                for (const prop in target) {
                    if (target.hasOwnProperty(prop)) {
                        // 避免复制到原型链上的同名属性
                        const value = target[prop] as Obj
                        Reflect.set(cloneTarget, prop, deepClone(value, map))
                    }
                }
            }
            return cloneTarget
        } else {
            return target
        }
    } else {
        return target
    }
}
