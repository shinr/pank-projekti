import React from "react"

import styles from "./form.module.css"

export const TextInputField = ({ label, password, change, blur }) => {
    const input = <input
    className={styles.textinputfield}
        onChange={change}
        onBlur={blur}
        type={password ? "password" : "text"} />
    return ( label ? <label>{label} {input}</label> : input)
}

export default TextInputField;
