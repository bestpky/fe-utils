export function swapByIndex<T>(arr: T[], fromIndex: number, toIndex: number) {
  const newArr = [...arr]
  newArr.splice(fromIndex, 0, ...arr.splice(toIndex, 1))
  return newArr
}
