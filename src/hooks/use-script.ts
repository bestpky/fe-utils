import { useEffect } from 'react'

/**
 * 使用第三方脚本
 * @param {string} url url
 * @param {Function} cb 回调
 */
export const useScript = (url: string, cb?: () => void) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true
    script.type = 'text/javascript'

    document.body.appendChild(script)

    script.onload = () => {
      cb?.()
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [url, cb])
}

export default useScript
