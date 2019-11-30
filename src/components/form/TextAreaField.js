import React from "react"

import styles from "./form.module.css"

export const TextAreaField = ({ label, change, blur }) => {
    const textarea = <textarea
    rows="10"
    className={styles.textareafield}
    onChange={change}
    onBlur={blur}
    />
    return ( label ? <label>{label} {textarea}</label> : textarea)
}

export default TextAreaField;
