import { ReactNode, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * createPortal
 * @returns {Function}
 */
const useCreatePortal = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  if (wrapperRef.current === null && typeof document !== 'undefined') {
    const div = document.createElement('div')
    div.setAttribute('data-body-portal', '')
    wrapperRef.current = div
  }
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || typeof document === 'undefined') {
      return
    }
    document.body.appendChild(wrapper)
    return () => {
      document.body.removeChild(wrapper)
    }
  }, [])
  return (children: ReactNode) => wrapperRef.current && createPortal(children, wrapperRef.current)
}

export default useCreatePortal
