type FindIterator<T> = (item: T, index: number, obj: T[]) => unknown;
/**
 * 从数组里去掉一个元素
 * @template T
 * @param {T[]} from 数组
 * @param {T} item 元素
 * @returns {number?} 如果执行了删除，则返回index
 */
export function remove<T, U extends FindIterator<T>>(
  from: T[],
  item: T | U
): number | undefined {
  const index =
    typeof item === "function" ? from.findIndex(item as U) : from.indexOf(item);
  if (index !== -1) {
    from.splice(index, 1);
    return index;
  }
  return undefined;
}

export default remove;
