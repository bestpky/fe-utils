/**
 * 在树的数组中根据id查找元素
 * @template T
 * @param {number | string} id 主键
 * @param {T[]} trees 树的数组
 * @param {Object} params 参数
 * @param {string} params.idName 主键名
 * @param {string} params.childrenName 子元素名
 * @returns {T} 元素
 */
export function findItemInTrees<T extends Record<string, unknown>>(
  id: number | string,
  trees: T[],
  params: {
    idName: string
    childrenName: string
  }
): T | null {
  const { idName = 'id', childrenName = 'children' } = params
  for (const item of trees) {
    if (Reflect.get(item, idName) === id) {
      return item
    }
    if (Reflect.get(item, childrenName)) {
      const res = findItemInTrees<T>(id, Reflect.get(item, childrenName), params)
      if (res) {
        return res
      }
    }
  }
  return null
}

export default findItemInTrees
