/**
 * 判断一个字符串是不是dataUrl
 * @param str
 */
export function isDataUrl(str: string): str is `data:${string}` {
  return str.startsWith('data:')
}
