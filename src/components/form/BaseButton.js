import React from "react"

import styles from "./BaseButton.module.css"

export const BaseButton = ({ label, onClick }) => {
    return (
        <button
            className={styles.basebutton}
            onClick={onClick}>{ label }</button>)
}

export default BaseButton;
