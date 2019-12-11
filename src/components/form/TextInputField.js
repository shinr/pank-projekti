import React from "react"

import styles from "./form.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TextInputField = ({ label, disabled, password, change, blur, valid }) => {
    return (
        <>
            <label>{label && label} {!valid && <FontAwesomeIcon icon="exclamation-triangle" />}</label>
            <input
                disabled={!!disabled}
                className={styles.textinputfield}
                onChange={change ? e => change(e.target.value) : () => {}}
                onBlur={blur ? e => blur(e.target.value) : () => {}}
                type={password ? "password" : "text"} />
        </>)
}

export default TextInputField;
