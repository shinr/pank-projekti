const formatFns = {
    is: (v) => `=eq.${v}`,
    select: (v) => `select=${v}`
}

const urlFormatter = (method, value) => {
    return `${formatFns[method](value)}`
}
// helper function that builds URLs that are understood by postgrest
export const urlBuilder = (parameters) => {
    const url = Object.keys(parameters).reduce((acc, current) => {
        const prefix = acc.length > 1 ? `${acc}&` : acc
        if(typeof parameters[current] === "object") {
            return prefix.concat(current, urlBuilder(parameters[current]))
        } else {
            return acc.length > 1 ? urlFormatter(current, parameters[current]) :
                `?${urlFormatter(current, parameters[current])}`
        }
    }, "?")
    return url
}