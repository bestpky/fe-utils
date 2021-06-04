/**
 * 延迟执行
 */
function delay(t: number) {
    if (t <= 0) {
        return Promise.resolve()
    }
    return new Promise(r => {
        setTimeout(() => {
            r(null)
        }, t)
    })
}

export { delay }
