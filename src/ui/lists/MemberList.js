import React from "react"
import Latoja from "latoja"

import { useAppStateValue, useUserStateValue, emptyStateObject } from "../../state/state"
import { CustomTemplate } from "../../components/templater"
import { SimpleEditor } from "../editors/SimpleEditor"
import { postMember } from "../../services/api"

import { addIn } from "../../utils/general"

import styles from "./MemberList.module.css"

export const MemberList = () => {
    const [{ pages, fetching }, dispatchApp] = useAppStateValue()
    const [{ token }, dispatchUser] = useUserStateValue()
    const { members } = pages
    const { meta: { id }, data } = members || emptyStateObject
console.log(pages)
    return (<>
        <SimpleEditor fields={["Järjestö", "Linkki"]} submit={frm => {
            const procs = addIn(data,
                [0, "template_section", "children"],
                { "template_member": { "props": { "url": frm["Linkki"], "label": frm["Järjestö"] } } })
            const payload = { id: id, name: "members", data: procs }
            postMember(payload, token, dispatchApp)
        }} />
        <div className={styles.memberList}>{data && <Latoja>
            <CustomTemplate template={data} />
        </Latoja>}</div></>)
}