import React, { useState } from "react"

import styles from "./SimpleEditor.module.css"

export const SimpleEditor = ({ fields, submit, buttonLabel }) => {
    const [state, setState] = useState({ ...fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {}) })
    return (<div className={styles.simpleeditor}>
        {fields.map(f => <>
            <label htmlFor={`id-se-${f}`}>{f}</label>
            <input id={`id-se-${f}`} onBlur={e => setState({ ...state, [f]: e.target.value })} type="text" />
        </>
        )}
        <button onClick={() => submit(state)}>{ buttonLabel || "Lähetä" }</button>
    </div>)
}