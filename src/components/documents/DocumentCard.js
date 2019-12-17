import React, { useState } from "react"
import { Link } from 'react-router-dom';

import { getDocument } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./DocumentCard.module.css"
import { useAppStateValue } from "../../state/state";

export const DocumentCard = ({ headline, content, fileId, fileName, tags }) => {
    const [app, dispatchApp] = useAppStateValue();
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
            <button onClick={(e) => preventStopAnd(e, () => getDocument(fileId, fileName, dispatchApp))}>
                <FontAwesomeIcon icon="download" />
            </button>
        </label>
        {expanded ? <div className={styles.documentcard__content}>{content}
            <Link to={`/download/${fileId}/${btoa(fileName)}`}>
                <FontAwesomeIcon icon="server" />Lataa tiedosto {fileName}
            </Link>
        </div> : <div></div>}
    </div>
}
export default DocumentCard;