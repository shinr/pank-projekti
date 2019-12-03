import React from "react"

import styles from "./FileInputField.module.css"

export const FileInputField = ({ label, onChange }) => {
    
    return (<>
        <label>{label && label}</label>
        <input
            onChange={onChange}
            id="fileinputfield"
            className={styles.fileinputfield} type="file" />
    </>
    )
}

export default FileInputField