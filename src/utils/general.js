export const isEmpty = (o) => {
    for(var k in o) {
        if(o.hasOwnProperty(k)) {
            return false
        }
    }
    return true
}

export const toBase64 = async (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})


// adds property to hash map or entity to list
export const addTo = (obj, val) => {
    return Array.isArray(obj) ? [...obj, val] : val
}

// if path length = 0 assoc obj key val
// if path length > 0 try to assoc in in next obj
export const addIn = (obj, path, val) => {
    const updated = path.length > 0
        ? addIn(obj[path[0]], path.slice(1), val)
        : addTo(obj, val)
    return path.length === 0 ? updated : Array.isArray(obj) ? [updated] : { ...obj, [path[0]]: updated }
}