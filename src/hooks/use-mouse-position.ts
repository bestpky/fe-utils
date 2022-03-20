import { useEffect, useState } from 'react'

export interface IPosition {
  x: number
  y: number
}

const initialPos = { x: 0, y: 0 }

/**
 * 获取鼠标位置和target data-属性
 * @param dom 元素
 * @param dataKey data-属性
 * @returns
 */
export const useMousePosition = <T>(dom: HTMLElement | null, dataKey?: string) => {
  const [pos, setPos] = useState<IPosition>(initialPos)
  const [data, setData] = useState<T>()
  useEffect(() => {
    if (!dom) {
      setPos(initialPos)
      setData(undefined)
    }
    const getMousePos = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
        const scrollY = document.documentElement.scrollTop || document.body.scrollTop
        const x = e.pageX || e.clientX + scrollX
        const y = e.pageY || e.clientY + scrollY

        setPos({ x, y })

        if (dataKey && typeof e.target.dataset[dataKey] === 'string') {
          const obj = JSON.parse(e.target.dataset[dataKey]!)
          setData(obj)
        }
      }
    }
    dom?.addEventListener('mousemove', getMousePos)
    return () => dom?.removeEventListener('mousemove', getMousePos)
  }, [dom, dataKey])

  return { pos, data }
}
