import React from "react"

import styles from "./InfoRow.module.css"

export const InfoRow = ({infos}) => {
    return (
        <div className={styles.inforow}>
            { Object.keys(infos).map((k, i) => <span className={styles.textfield}>{ infos[k] }</span>)}
        </div>
    )
}

export default InfoRow;