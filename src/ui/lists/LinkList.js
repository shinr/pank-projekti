import React from "react"

import { useAppStateValue } from "../../state/state"

import styles from "./LinkList.module.css"
import LinkItem from "../../components/utils/LinkItem";

export const LinkList = () => {
    const [{ externalLinks }, dispatch] = useAppStateValue()
    return (<div className={styles.linklist}>
    <h1>Linkkejä</h1>
        {externalLinks.map(l => <LinkItem {...l} />)}</div>)
}