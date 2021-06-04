import {delay} from './delay'

type Options = { types?: string[] | null; timeout?: number; folder?: boolean; noCancel?: boolean; multiple?: boolean }
const defaultOptions = {
    timeout: 2000,
    types: null,
    folder: false,
    noCancel: false,
    multiple: false
}
function selectFiles(options?: {
    types?: string[]
    timeout?: number
    folder?: boolean
    noCancel?: boolean
    multiple?: boolean
}): Promise<File[]>
function selectFiles(types?: string[], timeout?: number): Promise<File[]>
function selectFiles(...args: any[]): Promise<File[]> {
    let options: Required<Options>
    if (typeof args[0] === 'object') {
        options = {
            ...defaultOptions,
            ...args[0]
        }
    } else {
        options = {
            ...defaultOptions,
            types: args[0] ?? defaultOptions.types,
            timeout: args[1] ?? defaultOptions.timeout
        }
    }
    const { types, timeout, folder, noCancel, multiple } = options
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    if (types) {
        fileInput.accept = types.map(e => `.${e}`).join(', ')
    }
    if (multiple) {
        fileInput.multiple = multiple
    }
    if (folder) {
        // @ts-ignore
        fileInput.webkitdirectory = true
    }
    document.body.appendChild(fileInput)
    fileInput.click()

    return new Promise<File[]>((resolve, reject) => {
        let cancel: ((..._args: any[]) => any) | null = null
        // eslint-disable-next-line prefer-const
        let confirm: (..._args: any[]) => any
        let unbind: ((..._args: any[]) => any) | null = () => {
            if (cancel) {
                window.removeEventListener('focus', cancel)
            }
            fileInput.removeEventListener('change', confirm)
            document.body.removeChild(fileInput)
            unbind = null
        }
        if (!noCancel) {
            cancel = async () => {
                await delay(timeout)
                // reject(AppError.abort);
                unbind?.()
            }
        }
        confirm = async () => {
            // @ts-ignore
            resolve(fileInput.files)
            unbind?.()
        }
        if (cancel) {
            window.addEventListener('focus', cancel)
        }
        fileInput.addEventListener('change', confirm)
    })
}
export { selectFiles }
