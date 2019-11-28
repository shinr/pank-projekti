import React from "react"
import Latoja from "latoja"

import { useAppStateValue } from "../../state/state"

import { CustomTemplate } from "../../components/templater"

export const LinkList = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    const { links } = pages
    return (<div>{links && <Latoja>
            <CustomTemplate template={links} />
        </Latoja>}</div>)
}
