import { actions } from './actions'

export const userReducer = (state, action) => {
    const { LOGIN } = actions;
    const { type, payload } = action
    switch (type) {
        case LOGIN:
            const { id, email, role, token } = payload;
            return { id: id, email: email, role: role, token: token }
        default:
            throw new Error();
    }
}

export const appReducer = (state, action) => {
    const { SAVE_TAGS, SAVE_PAGES, SAVE_EVENTS, SAVE_DOCUMENTS, SAVE_NEWS, FETCHING } = actions
    const { type, payload } = action
    switch (type) {
        case FETCHING:
            const { fetching, refresh } = payload
            return { ...state, fetching: fetching, refresh: refresh ? { ...state.refresh, [refresh]: false } : state.refresh }
        case SAVE_EVENTS:
            const { events } = payload;
            return { ...state, events: events }
        case SAVE_DOCUMENTS:
            const { documents } = payload;
            return { ...state, documents: documents }
        case SAVE_TAGS:
            const { tags } = payload;
            return { ...state, tags: tags }
        case SAVE_PAGES:
            const { pages } = payload
            return { ...state, pages: pages }
        case SAVE_NEWS:
            const { news } = payload
            return { ...state, news: news }
        default:
            return state
    }
}