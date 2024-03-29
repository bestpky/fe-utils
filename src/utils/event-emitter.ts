/**
 * 发布订阅模式的事件模型
 */
export class EventEmitter {
  events: {
    [x: string]: Function[]
  }
  constructor() {
    this.events = {}
  }
  on(type: string, cb: Function) {
    if (!this.events[type]) {
      this.events[type] = [cb]
    } else if (!this.events[type].includes(cb)) {
      this.events[type].push(cb)
    }
    return this
  }
  emit(type: string, ...rest: unknown[]) {
    const fns = this.events[type]
    if (fns) {
      fns.forEach(cb => {
        cb(...rest)
      })
    }
    return this
  }
  off(type: string, fn: Function) {
    const fns = this.events[type]
    if (fns) {
      for (let i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1)
          break
        }
      }
    }
    return this
  }
}
