import React from "react"

import Member from "../../components/utils/Member";
import { useAppStateValue } from "../../state/state"

import styles from "./MemberList.module.css"

export const MemberList = () => {
    const [{ memberOrganizations }, dispatch] = useAppStateValue()
    return (<div className={styles.memberlist}>
    <h1>Jäsenorganisaatiot</h1>
        {memberOrganizations.map(l => <Member {...l} />)}</div>)
}