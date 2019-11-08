import React, { useState, useEffect } from 'react';

import { getDocuments } from '../../services/api';

import { when } from "../../utils/clojure"
import DocumentBrowser from '../../ui/documents/DocumentBrowser';

import styles from "../views.module.css"
import { useAppStateValue } from '../../state/state';

export const Documents = (props) => {
    const [documents, setDocuments] = useState([]);
    const [{ tags }, dispatch] = useAppStateValue();
    useEffect(() => {
        const getData = async () => {
            const data = await getDocuments()
            when(documents.length !== data.length, () => setDocuments(data))
        }
        getData()
    })
    return (
        <>
        <section className={styles.general_row}>
                <section className={styles.general_column}>
                <h1>TietoPANKki</h1>
                <DocumentBrowser documents={documents} tags={tags} />
                </section>
            </section>
        </>
    );
}

export default Documents;