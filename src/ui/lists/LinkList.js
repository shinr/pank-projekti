import React from "react"
import Latoja from "latoja"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppStateValue, useUserStateValue, emptyStateObject } from "../../state/state"
import { postLink } from "../../services/api"

import { CustomTemplate } from "../../components/templater"
import { SimpleEditor } from "../editors/SimpleEditor"
import Spinnered from "../../components/utils/Spinnered";

import { addIn } from "../../utils/general"

export const LinkList = () => {
    const [{ pages, fetching }, dispatchApp] = useAppStateValue()
    const [{ token }, dispatchUser] = useUserStateValue()
    const { links } = pages
    const { meta: { id }, data = [] } = links || emptyStateObject

    return (<div>
        <Spinnered fetching={fetching}><h1>Lisää järjestö</h1>
            <SimpleEditor fields={["Otsikko", "Linkki"]} submit={frm => {
                const procs = addIn(data,
                    [0, "template_section", "children"],
                    { "template_link": { "props": { "url": frm["Linkki"], "label": frm["Otsikko"] } } })
                const payload = { id: id, name: "links", data: procs }
                postLink(payload, token, dispatchApp)
            }} />
        </Spinnered>
        {data && <Latoja>
            <CustomTemplate template={data} />
        </Latoja>}</div>)
}
