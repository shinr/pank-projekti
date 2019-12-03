const formatFns = {
    is: (v) => `=eq.${v}`,
    select: (v) => `select=${Array.isArray(v) ? v.join(",") : v}`
}

const urlFormatter = (method, value) => {
    return `${formatFns[method](value)}`
}
// helper function that builds URLs that are understood by postgrest
export const urlBuilder = (parameters, options = { first: true }) => {
    const url = Object.keys(parameters).reduce((acc, current) => {
        const prefix = acc.length > 1 ? `${acc}&` : acc
        if(typeof parameters[current] === "object" && !Array.isArray(parameters[current])) {
            return prefix.concat(current, urlBuilder(parameters[current], { first: false }))
        } else {
            return options.first ? prefix.concat(urlFormatter(current, parameters[current])) :
            urlFormatter(current, parameters[current]) 
        }
    }, "?")
    return url
}