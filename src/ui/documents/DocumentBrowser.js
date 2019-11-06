import React, { useState } from "react"
import { filters } from "../../utils/filters"

import { DocumentCard } from "../../components/documents/DocumentCard"
import { Tag } from "../../components/utils/Tag"

import styles from "./DocumentBrowser.module.css"

export const DocumentBrowser = ({ documents, tags }) => {
    const { allowAll, matchProperty } = filters
    const [browserState, setBrowserState] = useState({ filter: allowAll(), freeTextFilter: allowAll() })
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
                <label>Vapaa tekstihaku</label>
                <input
                    type="text"
                    placeholder="Vapaa haku"
                    onChange={(e) => {
                        const filterText = e.target.value
                        setBrowserState({
                            ...browserState,
                            freeTextFilter: (entity) => entity.headline.indexOf(filterText) !== -1
                        })
                    }} /></div>
            <div>
                <label>Rajaa tageilla</label>
                <div className={styles.documentbrowser__tags}>{tags.map(t => <Tag id={t.id} name={t.name} click={() => setBrowserState({ ...browserState, filter: matchProperty("tag", t.id) })} />)}</div>
            </div>
            <div></div>
            <div>{
                _d.length === 0 ? <div>Ei dokumentteja</div> : _d
            }</div>
        </div>)
}

export default DocumentBrowser