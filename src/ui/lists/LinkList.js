import React from "react"
import Latoja from "latoja"

import { useAppStateValue, useUserStateValue } from "../../state/state"
import { postLink } from "../../services/api"

import { CustomTemplate } from "../../components/templater"
import { SimpleEditor } from "../editors/SimpleEditor"

import { first } from "../../utils/clojure"

export const LinkList = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    const [{ token }, du] = useUserStateValue()
    const { links } = pages
    console.log(links, pages)
    return (<div>
        <SimpleEditor fields={["Otsikko", "Linkki"]} submit={frm => {
           const procs = links[0]["template_section"]["children"].push({"template_link": { "props": { "url": frm["Linkki"], "label": frm["Otsikko"]}}})
            const payload = { id: 2, name: "links", data: links}
            postLink(payload, token)
            }} />
        {links && <Latoja>
            <CustomTemplate template={links} />
        </Latoja>}</div>)
}
