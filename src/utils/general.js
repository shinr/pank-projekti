export const isEmpty = (o) => {
    for(var k in o) {
        if(o.hasOwnProperty(k)) {
            return false
        }
    }
    return true
}