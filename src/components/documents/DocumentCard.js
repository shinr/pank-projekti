import React, { useState } from "react"

import { getDocument } from "../../services/api";

export const DocumentCard = ({headline, content, fileId, fileName}) => {
    const [ expanded, expand ] = useState(false)

    return <div>
        <label onClick={() => expand(!expanded)}>{headline} (näytä lisää)</label>
        { expanded ? <div>{content}<div onClick={() => getDocument(fileId, fileName)}>lataa file</div></div> : <div></div>}
    </div>
}

export default DocumentCard;