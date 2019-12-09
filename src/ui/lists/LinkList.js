import React from "react"
import Latoja from "latoja"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppStateValue, useUserStateValue } from "../../state/state"
import { postLink } from "../../services/api"

import { CustomTemplate } from "../../components/templater"
import { SimpleEditor } from "../editors/SimpleEditor"
import Spinnered from "../../components/utils/Spinnered";

// adds property to hash map or entity to list
const addTo = (obj, val) => {
    return Array.isArray(obj) ? [...obj, val] : val
}

// if path length = 0 assoc obj key val
// if path length > 0 try to assoc in in next obj
const addIn = (obj, path, val) => {
    const updated = path.length > 0
        ? addIn(obj[path[0]], path.slice(1), val)
        : addTo(obj, val)
    return path.length === 0 ? updated : Array.isArray(obj) ? [updated] : { ...obj, [path[0]]: updated }
}

export const LinkList = () => {
    const [{ pages, fetching }, dispatchApp] = useAppStateValue()
    const [{ token }, dispatchUser] = useUserStateValue()
    const { links } = pages
    console.log(links)
    return (<div>
        <Spinnered fetching={fetching}>
            <SimpleEditor fields={["Otsikko", "Linkki"]} submit={frm => {
                const procs = addIn(links,
                    [0, "template_section", "children"],
                    { "template_link": { "props": { "url": frm["Linkki"], "label": frm["Otsikko"] } } })
                const payload = { id: 2, name: "links", data: procs }
                postLink(payload, token, dispatchApp)
            }} />
        </Spinnered>
        {links && <Latoja>
            <CustomTemplate template={links} />
        </Latoja>}</div>)
}
