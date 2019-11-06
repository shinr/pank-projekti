import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { TextInputField } from "../../components/form/TextInputField"
import { LoginButton } from "../../components/form/LoginButton.js"
import { useUserStateValue } from "../../state/state";
import NavButton from "../../components/navbar/NavButton";

import styles from "./Login.module.css"

export const Login = (props) => {
    const [loginFormOpen, openLoginForm] = useState(false)
    const [{ user, token }, dispatch] = useUserStateValue()
    const [loginInfo, setLogin] = useState({ email: null, password: null })
    return (<>
        <NavButton classes={[styles.login_button]}>
            <div
            className={styles.login_button} 
            onClick={() => openLoginForm(!loginFormOpen)}>
                <FontAwesomeIcon icon="user" /> Kirjaudu
            </div>
        </NavButton>
        {loginFormOpen &&
            <div className={styles.login_form}>
                {token
                    ? <div>Kirjauduttu {user}</div>
                    : <div>
                        <TextInputField
                            change={(e) => setLogin({ ...loginInfo, email: e.target.value })} />
                        <TextInputField
                            change={(e) => setLogin({ ...loginInfo, password: e.target.value })} password={true} />
                        <LoginButton
                            loginInfo={loginInfo} />
                    </div>}
            </div>
        }
    </>)
}

export default Login;