import React, { useState } from "react"
import { Link } from 'react-router-dom';

import styles from "./Tabs.module.css"

export const Tabs = ({ children, currentTab }) => {
    const titles = children.map(({ props }, index) => ({ title: props.title, index: index, id: props.id, icon: props.icon }))
    const current = { tab: children.filter(kid => kid.props.id === currentTab), id: currentTab }
    return (
        <div className={styles.tabs}>
            <div className={styles.tabs_switcher}>{
                titles.map(t =>
                    <Link
                        className={current.id === t.id ? styles.tabs_tab__activated : styles.tabs_tab}
                        to={`/pank/${t.id}`}>{t.icon || ''}{t.title}</Link>)
            }
            </div>
            {current.tab}
        </div>)
}
// <button  
// onClick={() => setTab({ tab: children[t.index], id:t.id })}>{ t.icon || '' }{t.title}</button>
export default Tabs