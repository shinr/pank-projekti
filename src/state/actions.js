export const actions = {
    LOGIN: "action_login",
    SAVE_TAGS: "action_save_tags"
}

export const payloadAction = (type, payload) => ({ type: type, payload: { ...payload } })
