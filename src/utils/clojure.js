export const when = (pred, body) => {
    if (pred) {
        return body()
    }
    return null
}

export const first = (arr) => {
    if (Array.isArray(arr)) {
        return Array.from(arr)[0]
    }
    throw new TypeError("first was passed a non-array")
}

export const rest = (arr) => {
    if (Array.isArray(arr)) {
        return Array.from(arr).slice(1)
    }
    throw new TypeError("first was passed a non-array")
}

export const doAll = (...fns) => () => fns.map(fn => fn())

