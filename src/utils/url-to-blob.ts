import { isDataUrl } from './is-data-url'
import { isImage } from './is-image'
import { isObjectUrl } from './is-object-url'
import { loadImage } from './load-image'

/**
 * url转blob对象
 * @param url http url | data url | blob url
 * @param param1
 * @returns
 */
export async function urlToBlob(url: string, { withCredentials = false, imgThroughXhr = true } = {}) {
  const _isImage = isImage(url)
  if (!_isImage || imgThroughXhr) {
    return new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      if (!isObjectUrl(url) && !isDataUrl(url)) {
        xhr.withCredentials = withCredentials
      }
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response as Blob)
        }
      }
      xhr.onerror = () => {
        reject(new Error('urlToBlob load error'))
      }
      xhr.send()
    })
  }
  const img = await loadImage(url)
  return new Promise<Blob>((resolve, reject) => {
    const c = document.createElement('canvas')
    c.width = img.naturalWidth
    c.height = img.naturalHeight
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
    c.toBlob(result => {
      if (result) {
        resolve(result)
      } else {
        reject(new Error('Convert blob error'))
      }
    }, 'image/png')
  })
}
