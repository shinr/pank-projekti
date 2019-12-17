import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDocuments } from '../../services/api';
import { when } from "../../utils/clojure"
import { payloadAction, actions } from "../../state/actions"
import { useAppStateValue, useUserStateValue } from '../../state/state';

import DocumentBrowser from '../../ui/documents/DocumentBrowser';
import { Tabs } from "../../ui/tabs/Tabs"
import { Tab } from "../../ui/tabs/Tab"
import DocumentUploadForm from '../../ui/documents/DocumentUploadForm';
import { Spinnered } from "../../components/utils/Spinnered"

import styles from "../views.module.css"


export const Documents = ({ match }) => {
    const [{ tags, fetching, refresh, documents }, dispatchApp] = useAppStateValue();
    const [{ role }, dispatchUser] = useUserStateValue();
    const { currentTab } = match.params
    useEffect(() => {
        const getData = async () => {
            const data = await getDocuments(dispatchApp)
            when(documents.length !== data.length, () => dispatchApp(payloadAction(actions.SAVE_DOCUMENTS, { documents: data })))
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
                    <Tabs rootPath="documents" currentTab={currentTab || "tietopankki"}>
                        <Tab id={"tietopankki"} icon={<FontAwesomeIcon icon="download" />} title="Tietopankki">
                            <DocumentBrowser documents={documents} tags={tags} />
                        </Tab>
                        <Tab id={"normit"} icon={<FontAwesomeIcon icon="download" />} title="Asfalttinormit">
                            <DocumentBrowser documents={documents} tags={tags} useTag={1} />
                        </Tab>
                        <Tab id={"urakka-asiakirjat"} icon={<FontAwesomeIcon icon="download" />} title="Urakka-asiakirjat">
                            <DocumentBrowser documents={documents} tags={tags} useTag={2} />
                        </Tab>
                    </Tabs>

                </section>
            </section>
        </>
    );
}

export default Documents;