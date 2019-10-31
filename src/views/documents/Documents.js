import React, { useState, useEffect } from 'react';

import { getDocuments } from '../../services/api';

import { when } from "../../utils/clojure"
import DocumentBrowser from '../../ui/documents/DocumentBrowser';

export const Documents = () => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getDocuments()
            when(documents.length !== data.length, () => setDocuments(data))
        }
        getData()
    })
    return (
        <section>
            <div>Tämä on PANKin tietopankki</div>
            <DocumentBrowser documents={documents} />
        </section>
    );
}

export default Documents;