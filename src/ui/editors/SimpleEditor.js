import React, { useState } from "react"

import styles from "./SimpleEditor.module.css"

export const SimpleEditor = ({ fields, submit, buttonLabel }) => {
    const [state, setState] = useState({ ...fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {}) })
    return (<div className={styles.simpleeditor}>
        <div className={styles.simpleWrapper}>
        {fields.map(f => <>
            <div className={styles.inputs}>
              <label htmlFor={`id-se-${f}`}>{f}</label>
              <input id={`id-se-${f}`} onBlur={e => setState({ ...state, [f]: e.target.value })} type="text" />
            </div>
        </>
        )}
        <button onClick={() => submit(state)}>{ buttonLabel || "Lisää" }</button>
    </div>
    </div>)
}
