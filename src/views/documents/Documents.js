import React, { useState, useEffect } from 'react';

import { getDocuments } from '../../services/api';

import { when } from "../../utils/clojure"
import DocumentBrowser from '../../ui/documents/DocumentBrowser';

import styles from "../views.module.css"
import { useAppStateValue, useUserStateValue } from '../../state/state';
import DocumentUploadForm from '../../ui/documents/DocumentUploadForm';
import { Spinnered } from "../../components/utils/Spinnered"
import { payloadAction, actions } from "../../state/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Documents = (props) => {
    const [{ tags, fetching, refresh, documents }, dispatchApp] = useAppStateValue();
    const [{ role }, dispatchUser] = useUserStateValue();
    useEffect(() => {
        const getData = async () => {
            const data = await getDocuments(dispatchApp)
            when(documents.length !== data.length, () => dispatchApp(payloadAction(actions.SAVE_DOCUMENTS, {documents: data})))
        }
        when(refresh.documents === true, () => getData())
    })
    return (
        <>
            <section className={styles.general_row}>
                <section className={styles.general_column}>
                    <h1>TietoPANKki</h1>

                    {role && <Spinnered fetching={fetching}>
                        <DocumentUploadForm />
                    </Spinnered>}
                    <DocumentBrowser documents={documents} tags={tags} />
                </section>
            </section>
        </>
    );
}

export default Documents;