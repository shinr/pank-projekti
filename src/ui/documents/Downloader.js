import React, { useEffect, useState } from "react"

import { getDocument } from "../../services/api";
import { useAppStateValue } from "../../state/state";
import { when, doAll } from "../../utils/clojure"

import styles from "../../views/views.module.css"
import BaseButton from "../../components/form/BaseButton";

export const Downloader = ({ match, history }) => {
    const { id, filename } = match.params
    const decodedFilename = atob(filename)
    const [state, dispatchApp] = useAppStateValue()
    const [downloading, startDownloading] = useState(false)
    useEffect(() => {
        when(!downloading && (id && filename), doAll(
            () => getDocument(id, decodedFilename, dispatchApp),
            () => startDownloading(true)))
    })
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                <h1>Ladataan {decodedFilename}</h1>
                <BaseButton onClick={() => history.goBack()} label="Palaa takaisin" />
            </section>
        </section>)
}

export default Downloader