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