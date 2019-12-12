import React from "react"

import styles from "./Tabs.module.css"

export const Tab = ({children}) => {
    return <div className={styles.tab}>{ children }</div>
}

export default Tab
