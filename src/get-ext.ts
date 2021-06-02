import { mimeToExt } from './mime-to-ext'
import { isFileLike, FileLike } from './is-file-like'

const rExt = /\.\w+$/

/**
 * 获取目标的文件名
 * @param target
 */
export function getFileName(target: string) {
    const queryIndex = target.indexOf('?')
    if (queryIndex !== -1) {
        target = target.substring(0, queryIndex)
    }
    const lastSlashIndex = target.lastIndexOf('/')
    if (lastSlashIndex !== -1) {
        target = target.substr(lastSlashIndex + 1)
    }
    return target
}

/**
 * 获取目标的后缀名
 * @param target
 */
export function getExt(target: string | FileLike) {
    let file: FileLike | undefined
    let name: string | undefined
    if (isFileLike(target)) {
        file = target
        ;({ name } = target)
    } else {
        name = target
    }

    if (name) {
        target = getFileName(name)
        const extIndex = target.search(rExt)
        if (extIndex !== -1) {
            return target.substring(extIndex + 1)
        }
    }

    if (file) {
        const mime = file.type
        if (mime) {
            return mimeToExt(mime)
        }
    }
    return ''
}
