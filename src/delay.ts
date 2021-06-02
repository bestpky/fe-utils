/**
 * 返回一个promise对象，在特定时间后被解决
 * @param t 当t为number时，则延时该时间后，promise会被解决，如果t为date，则该时候被解决
 * @param result promise的结果
 */
function delay(t: Date | number): Promise<undefined>
function delay<T>(t: Date | number, result: T): Promise<T>
function delay(t: any = 0, result?: any) {
    let _t: number
    if (t === Infinity) {
        return new Promise(() => {})
    }
    if (t instanceof Date) {
        _t = +t - Date.now()
    } else {
        _t = t
    }
    if (_t < 0) return Promise.resolve(result)
    return new Promise(r => {
        setTimeout(() => {
            r(result)
        }, _t)
    })
}

export { delay }
export default delay
