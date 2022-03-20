import { RefObject, useEffect, useRef, useState } from 'react'
import { debounce } from 'throttle-debounce'

/**
 * 滚动到底部
 * @param {Function} action 执行的函数
 * @returns {Array} [ref, 是否ready]
 */
const useBottom = <T extends Element>(action: () => void): [RefObject<T>, boolean] => {
  const containerRef = useRef<T>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function doInBottom(e: WheelEvent) {
      const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement
      if (scrollTop + clientHeight + 10 > scrollHeight) {
        return action()
      }
    }
    const debounceDoInBottom = debounce(300, e => {
      doInBottom(e)
    })
    const handleMouseEnter = () => setReady(true)
    const dom = containerRef.current
    if (dom) {
      dom.addEventListener('scroll', debounceDoInBottom)
      dom.addEventListener('mouseenter', handleMouseEnter)
    }
    return () => {
      if (dom) {
        dom.removeEventListener('scroll', debounceDoInBottom)
        dom.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  }, [action])

  return [containerRef, ready]
}

export default useBottom
