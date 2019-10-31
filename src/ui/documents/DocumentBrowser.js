import React from "react"

import { DocumentCard } from "../../components/documents/DocumentCard"

export const DocumentBrowser = ({documents}) => {
    return <div>{ documents.map((d) => <DocumentCard 
                                        headline={d.headline} 
                                        content={d.description}
                                        fileName={d.filename}
                                        fileId={d.id} />)}</div>
}

export default DocumentBrowser