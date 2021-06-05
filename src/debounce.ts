export function debounce(fn: Function, delay: number) {
    let timeout: NodeJS.Timeout
    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
