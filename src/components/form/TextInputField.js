import React from "react"

import styles from "./form.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TextInputField = ({ label, password, change, blur, valid }) => {
    return (
        <>
            <label>{label && label} {!valid && <FontAwesomeIcon icon="exclamation-triangle" />}</label>
            <input
                className={styles.textinputfield}
                onChange={change}
                onBlur={blur}
                type={password ? "password" : "text"} />
        </>)
}

export default TextInputField;
