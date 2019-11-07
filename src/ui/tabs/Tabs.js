import React, { useState } from "react"

import styles from "./Tabs.module.css"

export const Tabs = ({ children, initialTab }) => {
    const titles = children.map(({ props }, index) => ({ title: props.title, index: index, id:props.id, icon:props.icon }))
    const [current, setTab] = useState({ tab: children.filter(kid => kid.props.id === initialTab), id: initialTab })
    return (
        <div className={styles.tabs}>
            <div className={styles.tabs_switcher}>{
                titles.map(t =>
                    <button className={current.id === t.id ? styles.tabs_tab__activated : styles.tabs_tab} onClick={() => setTab({ tab: children[t.index], id:t.id })}>{ t.icon || '' } {t.title}</button>)
            }
            </div>
            {current.tab}
        </div>)
}

export default Tabs