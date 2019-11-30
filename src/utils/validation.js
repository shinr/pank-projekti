export const isFormValid = validities => !!Object.keys(validities).filter(k => validities[k]).length

export const notEmpty = val => {
    switch (typeof val) {
        case "string":
            return !!val.length
        case "object":
            return Array.isArray(val) ? !!val.length : Object.keys(val).length === 0 && val.constructor === Object
        default:
            return false
    }
}