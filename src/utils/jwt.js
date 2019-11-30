export const decodePayload = token => {
    const decoded = atob(token.split('.')[1])
    return JSON.parse(decoded)
}

export const withToken = token => ({"Authorization": `Bearer ${token}`})