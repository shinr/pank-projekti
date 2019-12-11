import React from "react"

import styles from "./Tag.module.css"

export const Tag = ({ id, selected, name, click }) => {
    return (<div className={selected ? styles.tagselected : styles.tag} onClick={click}>{name}</div>)
}