export const decodePayload = token => {
    const decoded = atob(token.split('.')[1])
    console.log(JSON.parse(decoded))
    return JSON.parse(decoded)
}