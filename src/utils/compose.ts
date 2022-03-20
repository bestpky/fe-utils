export function compose(...fns: Function[]) {
  return function (...arg: unknown[]) {
    return fns.reduce((acc, cur) => {
      // 第一次acc是函数，之后是结果，所以要加个判断
      return typeof acc === 'function' ? cur(acc(...arg)) : cur(acc)
    })
  }
}

function fn1(x: number) {
  return x + 1
}
function fn2(x: number) {
  return x * 10
}
function fn3(x: number) {
  return x - 1
}
let x = 10

console.log(fn3(fn2(fn1(x)))) // 109

const composeFunc = compose(fn1, fn2, fn3)
console.log(composeFunc(x)) // 109
