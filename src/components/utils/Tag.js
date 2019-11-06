import React from "react"

import styles from "./Tag.module.css"

export const Tag = ({ id, name, click }) => {
    return (<div className={styles.tag} onClick={click}>{name}</div>)
}