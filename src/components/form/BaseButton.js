import React from "react"

import styles from "./BaseButton.module.css"

export const BaseButton = ({ label, disabled, onClick }) => {
    return (
        <button
            disabled={!!disabled}
            className={styles.basebutton}
            onClick={onClick}>{ label }</button>)
}

export default BaseButton;
