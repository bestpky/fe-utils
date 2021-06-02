// TODO: 暂时只是写了图片类型

const rArr = [/^image\/(\w+)$/, /^(?:text|application)\/(json)$/]
const type2ext: { [mime: string]: string } = {}
/**
 * 将mimeType转成后缀名
 * @param mime mimeType
 */
export const mimeToExt = (mime: string) => {
    mime = mime.toLowerCase()
    if (type2ext[mime]) return type2ext[mime]
    for (let i = 0; i < rArr.length; i++) {
        const r = rArr[i]
        const m = mime.match(r)
        if (m) {
            return m[1]
        }
    }
    return ''
}
