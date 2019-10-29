import React from "react"

import { BaseButton } from "./BaseButton"
import { login } from "../../services/api"
import { when } from "../../utils/clojure"
import { useUserStateValue } from "../../state/state";
import { payloadAction, actions } from "../../state/actions"

export const LoginButton = ({loginInfo}) => {
    const { email, password } = loginInfo;
    const [state, dispatch] = useUserStateValue()
    const loginFn = ({ user, role, token, bad }) => when(!bad, () => dispatch(payloadAction(actions.LOGIN, { user: user, role: role, token: token })))
    return (<BaseButton onClick={async () => loginFn(await login(email, password))} />)
}