import React, { useState } from "react"

export const EventCard = ({headline, content}) => {
    const [ expanded, expand ] = useState(false)
    return <div>
        <label onClick={() => expand(!expanded)}>{headline} (näytä lisää)</label>
        { expanded ? <div>{content}</div> : <div></div>}
    </div>
}