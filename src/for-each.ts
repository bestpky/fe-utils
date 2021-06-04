import { isArrayLike } from './is-array-like'

type PlainObject<T> = {
    [key in string | number]: T
}

function objectEach<T>(
    object: PlainObject<T>,
    iteratee: (value: T, key: string | number, object: PlainObject<T>) => boolean | void
): PlainObject<T> {
    const props = Object.keys(object)
    let { length } = props
    let index = -1

    while (length--) {
        const key = props[++index]
        if (iteratee(object[key], key, object) === false) {
            break
        }
    }
    return object
}

function arrayEach<T>(array: T[], iteratee: (item: T, index: number, array: T[]) => boolean | void): T[] {
    let index = -1
    const length = array.length

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break
        }
    }
    return array
}

function forEach<T>(
    collection: T[] | PlainObject<T>,
    iteratee: (item: T, index: string | number, array: T[] | PlainObject<T>) => boolean | void
): T[] | PlainObject<T> {
    if (isArrayLike(collection)) {
        return arrayEach(collection, iteratee)
    } else {
        return objectEach(collection, iteratee)
    }
}

export { forEach }
