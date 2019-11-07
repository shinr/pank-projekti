import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./EventCard.module.css"

export const EventCard = ({ headline, content, date, index }) => {
    const [expanded, expand] = useState(false)
    const parsedDate = new Date(date)
    console.log(index, index % 2 === 0)
    return (
        <div className={styles.eventcard}>
            <label className={index % 2 === 0 ? styles.even : styles.odd  } onClick={() => expand(!expanded)}>
                <span><FontAwesomeIcon icon="calendar-alt" /></span>
                <span>{parsedDate.toDateString()}</span>
                <span>{headline}</span>
                <span><FontAwesomeIcon icon="caret-right" /></span>
            </label>
            {expanded ? <div className={styles.eventcard__expanded}>{content}</div> : <div></div>}
        </div>
    )
}