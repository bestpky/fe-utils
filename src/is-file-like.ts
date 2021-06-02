export type FileLike = { type?: string; name?: string; size?: number }

export function isFileLike(target: any): target is FileLike {
    return typeof target === 'object' && (!!target.name || !!target.type || !!target.size)
}
