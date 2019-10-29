import React, { useState } from "react"

import { TextInputField } from "../../components/form/TextInputField"
import { LoginButton } from "../../components/form/LoginButton.js"
import { useUserStateValue } from "../../state/state";

export const Login = (props) => {
    const [{ user, token }, dispatch] = useUserStateValue()
    const [loginInfo, setLogin] = useState({ email: null, password: null })
    return (token ? <div>Kirjauduttu {token}</div> : <div>
        <TextInputField change={(e) => setLogin({ ...loginInfo, email: e.target.value })} />
        <TextInputField change={(e) => setLogin({ ...loginInfo, password: e.target.value })} password={true} />
        <LoginButton
            loginInfo={loginInfo} />
    </div>)
}

export default Login;