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
