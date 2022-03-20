export type FileLike = { type?: string; name?: string; size?: number }

export function isFileLike(target: any): target is FileLike {
  return typeof target === 'object' && (!!target.name || !!target.type || !!target.size)
}

class LoadImageError extends Error {
  constructor(message?: string, event?: Event | string) {
    super(message)
    this.event = event
  }

  event: Event | string | undefined
}

/**
 * 加载img对象
 * @param {string | FileLike} url url 或 类文件对象
 * @returns {Promise<HTMLImageElement>}
 */
export async function loadImage(url: FileLike | string) {
  let src: string
  if (isFileLike(url)) {
    src = URL.createObjectURL(url as Blob)
  } else {
    src = url
  }
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = e => {
      const error = new LoadImageError(`load ${url} fail`, e)
      reject(error)
    }
    img.src = src
  })
}

export default loadImage
