export function throttle(fn: Function, delay: number) {
    let timer: NodeJS.Timeout, last: number
    return (...args: any[]) => {
        const now = Date.now()
        if (last && last + delay > now) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                last = now
                fn(...args)
            }, delay)
        } else {
            last = now
            fn(...args)
        }
    }
}
