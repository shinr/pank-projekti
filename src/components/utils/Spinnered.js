import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Spinnered = ({ fetching, children }) => {
    return (<div>{ fetching ?
        <FontAwesomeIcon icon="spinner" pulse size="3x" />
    : children }</div>)

}

export default Spinnered
