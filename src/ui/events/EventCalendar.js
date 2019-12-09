import React, { useState, useEffect } from "react"

import { EventCard } from "../../components/events/EventCard"
import { getEvents } from "../../services/api"

import { when } from "../../utils/clojure"
import { useAppStateValue } from "../../state/state"
import { payloadAction, actions } from "../../state/actions"

export const EventCalendar = () => {
    const [{ refresh, events }, dispatch] = useAppStateValue()
    useEffect(() => {
        const getData = async () => {
            const data = await getEvents(dispatch)
            when(events.length !== data.length, () => dispatch(payloadAction(actions.SAVE_EVENTS, { events: data })))
        }
        when(refresh.events, () => getData())
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