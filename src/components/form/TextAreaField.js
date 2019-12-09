import React from "react"

import styles from "./form.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TextAreaField = ({ label, change, blur, valid = true }) => {
    return (
        <>
            <label>{label && label} {!valid && <FontAwesomeIcon icon="exclamation-triangle" />}</label>
            <textarea
                rows="10"
                className={styles.textareafield}
                onChange={change}
                onBlur={blur}
            />
        </>)
}

export default TextAreaField;
