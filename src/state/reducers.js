import { actions } from './actions'

export const userReducer = (state, action) => {
    const { LOGIN } = actions;
    const { type, payload } = action
    switch(type) {
        case LOGIN:
            const { login, role, token } = payload;
            return { login: login, role: role, token: token }
        default:
            throw new Error();
    }
}

export const appReducer = (state, action) => {
    const { SAVE_TAGS } = actions
    const { type, payload } = action
    switch(type) {
        case SAVE_TAGS:
            const { tags } = payload;
            return state.tags = tags 
        default:
            return state
    }
}