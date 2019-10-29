import React from "react"

import styles from "./BaseButton.module.css"

export const BaseButton = ({ onClick }) => {
    return (
        <input
            className={styles.basebutton}
            type="button"
            value="click"
            onClick={onClick} />)
}

export default BaseButton;