import React from "react"
import Latoja from "latoja"

import { useAppStateValue } from "../../state/state"
import { CustomTemplate } from "../../components/templater"

import styles from "./MemberList.module.css"

export const MemberList = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    const { members } = pages
    return (<div className={styles.memberList}>{members && <Latoja>
            <CustomTemplate template={members} />
        </Latoja>}</div>)
}