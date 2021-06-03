/**
 * 将数组分成两部分，符合filterIterator的在左边
 * @param arr
 * @param filterIterator
 */
function separate<T, S extends T>(
  arr: T[],
  filterIterator: (item: T, index: number, arr: T[]) => item is S,
) : [S[], Exclude<T, S>[]];
function separate<T>(
  arr: T[],
  filterIterator: (item: T, index: number, arr: T[]) => boolean,
) {
  const result: [T[], T[]] = [[], []];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (filterIterator(item, i, arr)) {
      result[0].push(item);
    } else {
      result[1].push(item);
    }
  }
  return result;
}

export { separate };

export default separate;
