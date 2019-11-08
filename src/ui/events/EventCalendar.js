import React, { useState, useEffect } from "react"

import { EventCard } from "../../components/events/EventCard"
import { getEvents } from "../../services/api"

import { when } from "../../utils/clojure"

export const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getEvents()
            when(events.length !== data.length, () => setEvents(data))
        }
        getData()
    })
    const _e = events.bad
        ? <div>Tietokannan yhteysvirhe tapahtumia haettaessa</div>
        : events.map((e, index) => <EventCard
            key={`event-card-${index}`}
            index={index}
            date={e.event_date}
            headline={e.headline}
            content={e.content} />)
    return <div><h2>Tapahtumat</h2>
        {_e || 'Ei tapahtumia'}</div>
}

export default EventCalendar