// 时间戳版:函数触发是在时间段内开始的时候
export function throttle1(fn: Function, delay: number) {
    let last = Date.now()
    return (...args: any[]) => {
        const now = Date.now()
        if (now - last >= delay) {
            fn(...args)
            last = Date.now()
        }
    }
}
// 定时器版:函数触发是在时间段内结束的时候
export function throttle2(fn: Function, delay: number) {
    let timeout: NodeJS.Timeout
    return (...args: any[]) => {
        if (!timeout) {
            timeout = setTimeout(() => {
                fn(...args)
                clearTimeout(timeout)
            }, delay)
        }
    }
}

// 综合版
export function throttle(fn: Function, delay: number) {
    let timer: NodeJS.Timeout,
        last = Date.now()
    return (...args: any[]) => {
        const now = Date.now()
        let remaining = delay - (now - last)
        clearTimeout(timer)
        if (remaining <= 0) {
            fn(...args)
            last = Date.now()
        } else {
            // 最后一次加多一次
            timer = setTimeout(() => {
                // 只有最后一次才会执行
                fn(...args)
            }, delay)
        }
    }
}
