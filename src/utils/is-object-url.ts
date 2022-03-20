/**
 * 判断一个字符串是不是objectUrl
 * @param str
 */
export function isObjectUrl(url: string): url is `blob:${string}` {
  return url.startsWith('blob:')
}
