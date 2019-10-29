export const actions = {
    LOGIN: "login"
}

export const payloadAction = (type, payload) => ({ type: type, payload: { ...payload } })
