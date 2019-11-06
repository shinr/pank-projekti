import React, { useState } from "react"

import { getDocument } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./DocumentCard.module.css"

export const DocumentCard = ({ headline, content, fileId, fileName, tag }) => {
    const preventStopAnd = (e, fn) => {
        e.preventDefault()
        e.stopPropagation()
        return fn()
    }
    const [expanded, expand] = useState(false)
    return <div className={styles.documentcard}>
        <label>
            <span>{headline}</span>
            <button onClick={() => expand(!expanded)}>
                <FontAwesomeIcon icon={expanded ? "caret-down" : "caret-right"} />
            </button>
            <button onClick={(e) => preventStopAnd(e, () => getDocument(fileId, fileName))}>
                <FontAwesomeIcon icon="download" />
            </button>
        </label>
        {expanded ? <div className={styles.documentcard__content}>{content}<div onClick={() => getDocument(fileId, fileName)}>lataa file</div></div> : <div></div>}
    </div>
}

export default DocumentCard;