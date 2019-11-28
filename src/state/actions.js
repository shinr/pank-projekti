export const actions = {
    LOGIN: "action_login",
    SAVE_TAGS: "action_save_tags",
    SAVE_PAGES: "action_save_pages"
}

export const payloadAction = (type, payload) => ({ type: type, payload: { ...payload } })
