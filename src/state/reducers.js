import { actions } from './actions'

export const userReducer = (state, action) => {
    const { LOGIN } = actions;
    const { type, payload } = action
    switch(type) {
        case LOGIN:
            const { id, email, role, token } = payload;
            return { id:id, email: email, role: role, token: token }
        default:
            throw new Error();
    }
}

export const appReducer = (state, action) => {
    const { SAVE_TAGS, SAVE_PAGES } = actions
    const { type, payload } = action
    switch(type) {
        case SAVE_TAGS:
            const { tags } = payload;
            return { ...state, tags: tags } 
        case SAVE_PAGES:
            const { pages } = payload
            return { ...state, pages: pages }
        default:
            return state
    }
}