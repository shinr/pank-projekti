export const actions = {
    LOGIN: "action_login",
    SAVE_TAGS: "action_save_tags",
    SAVE_PAGES: "action_save_pages",
    SAVE_EVENTS: "action_save_events",
    SAVE_DOCUMENTS: "action_save_documents",
    FETCHING: "action_fetching"
}

export const payloadAction = (type, payload) => ({ type: type, payload: { ...payload } })
