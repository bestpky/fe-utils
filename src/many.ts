/**
 * 将非数组 target 转为数组
 * @param target
 */
function many<T>(target: T | T[]) {
  if (Array.isArray(target)) {
    return target;
  }
  return [target] as T[];
}
