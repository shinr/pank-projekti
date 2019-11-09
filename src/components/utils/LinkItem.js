// named LinkItem since Link clashes with react-router
import React from "react"

import styles from "./LinkItem.module.css"

export const LinkItem = ({title, url}) => {
    return (<div className={styles.linkitem}><a href={url} >{title}</a></div>)
}

export default LinkItem