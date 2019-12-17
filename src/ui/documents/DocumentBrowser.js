import React, { useState } from "react"
import { filters } from "../../utils/filters"

import { DocumentCard } from "../../components/documents/DocumentCard"
import { Tag } from "../../components/utils/Tag"
import { Spinnered } from "../../components/utils/Spinnered"

import styles from "./DocumentBrowser.module.css"
import { useAppStateValue } from "../../state/state"

export const DocumentBrowser = ({ documents, tags }) => {
    const { allowAll, matchPropertyArray } = filters
    const [browserState, setBrowserState] = useState({ filter: allowAll(), freeTextFilter: allowAll() })
    const [{ fetching }, dispatchApp] = useAppStateValue()
    const _d = documents.bad
        ? <div>Yhteysvirhe! Dokumentteja ei saatu haettua</div>
        : documents
            .filter(browserState.filter)
            .filter(browserState.freeTextFilter)
            .map((d) => <DocumentCard
                headline={d.headline}
                content={d.description}
                fileName={d.filename}
                tag={d.tag}
                fileId={d.id} />)
    return (
        <div className={styles.documentbrowser}>
            <div>
                <label>Voit hakea haluamaasi dokumenttia alla olevalla hakukohdalla</label>
                <input
                    type="text"
                    placeholder="Hae tästä"
                    onChange={(e) => {
                        const filterText = e.target.value
                        setBrowserState({
                            ...browserState,
                            freeTextFilter: (entity) => entity.headline.indexOf(filterText) !== -1
                        })
                    }} /></div>
            <div>
                <label>Rajaa tageilla</label>
                <div className={styles.documentbrowser__tags}>{tags.map(t =>
                    <Tag
                        id={t.id}
                        name={t.name}
                        click={() =>
                            setBrowserState({
                                ...browserState,
                                filter: matchPropertyArray("tags", t.id)
                            })} />)}</div>
            </div>
            <div></div>
            <Spinnered fetching={fetching}>
                <div>{
                    _d.length === 0 ? <div>Ei dokumentteja</div> : _d
                }</div>
            </Spinnered>
        </div>)
}

export default DocumentBrowser
