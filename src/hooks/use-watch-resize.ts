import React, { useRef, useState, useEffect } from 'react'
import { resizeWatch } from '../utils/resize-watcher'

interface Size {
  width: number
  height: number
}

/**
 * 监听元素尺寸变化
 * @returns {Array} [React.RefObject<T>, Size]
 */
export function useWatchResize<T extends Element>(): [React.RefObject<T>, Size] {
  const elRef = useRef<T>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  })
  useEffect(() => {
    let isUnmount = false
    let cancelFn: () => void
    if (elRef.current) {
      cancelFn = resizeWatch(elRef.current, ({ width, height }: DOMRect) => {
        !isUnmount && setSize({ width, height })
      })
    }
    return () => {
      isUnmount = true
      cancelFn && cancelFn()
    }
  }, [elRef])
  return [elRef, size]
}

export default useWatchResize
