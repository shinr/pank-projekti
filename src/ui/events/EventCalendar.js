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
    return <div>{ events.map((e) => <EventCard 
                                        headline={e.headline} 
                                        content={e.content} />)}</div>
}

export default EventCalendar