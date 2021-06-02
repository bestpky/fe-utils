import { getExt } from './get-ext'
import { isFileLike, FileLike } from './is-file-like'

const rImageMime = /^image\//

/**
 * 检查一个文件后缀是不是图片
 * @param ext - 后缀
 */
export function isExtImage(ext: string) {
    return ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)
}
/**
 * 检查一个mime是否一个图片
 * @param mime - mimeType
 */
export function isMimeImage(mime: string) {
    return rImageMime.test(mime)
}
/**
 * 判断目标是否一个图片，暂时支持FileLike和string类型
 * @param target - 目标
 * @returns - 是否为图片，undefined则为无法得知
 */
export function isImage(target: FileLike | string) {
    let name: string | undefined
    if (isFileLike(target)) {
        if (target.type) {
            return isMimeImage(target.type)
        }
        ;({ name } = target)
    } else {
        name = target
    }
    if (typeof name === 'string') {
        const ext = getExt(name)
        if (ext) {
            return isExtImage(ext)
        }
    }
    return undefined
}
