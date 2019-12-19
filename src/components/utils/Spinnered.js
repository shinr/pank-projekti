import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "../utils/Spinnered.module.css"

export const Spinnered = ({ fetching, children }) => {
    return (<div className={styles.spinnered}>{ fetching ?
        <FontAwesomeIcon icon="spinner" pulse size="3x" />
    : children }</div>)

}

export default Spinnered
