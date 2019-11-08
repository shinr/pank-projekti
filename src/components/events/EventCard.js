import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { timestampToObject } from "../../utils/date"

import styles from "./EventCard.module.css"

export const EventCard = ({ headline, content, date, index }) => {
    const [expanded, expand] = useState(false)
    const parsedDate = timestampToObject(new Date(date))
    console.log(index, index % 2 === 0)
    return (
        <div className={styles.eventcard}>
            <div className={`${styles.eventcard__content} ${index % 2 === 0 ? styles.even : styles.odd}`} onClick={() => expand(!expanded)}>
                <div className={styles.eventcard__date}>
                    <span>{parsedDate.date}</span>
                    <span>{parsedDate.month}</span>
                </div>
                <div className={styles.eventcard__title}>
                    <div>{headline}</div>
                    <div>Energia areena</div>
                </div>
                <div className={styles.eventcard__icon}>
                    <FontAwesomeIcon icon={expanded ? "caret-down" : "caret-right"} size="2x" />
                </div>
            </div>
            {expanded ? <div className={styles.eventcard__expanded}>
                <span>{`${parsedDate.day}na ${parsedDate.date}. ${parsedDate.month}ta ${parsedDate.year}`}</span>
                {content}
            </div> : <div></div>}
        </div>
    )
}