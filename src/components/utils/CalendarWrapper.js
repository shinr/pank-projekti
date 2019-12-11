import React from "react"

import Calendar from "react-calendar"

export const CalendarWrapper = ({ onChange, value }) => {
    return (<Calendar
        navigationLabel={({ date, view, label }) => `${date.toLocaleDateString()}`}
        prevAriaLabel="Edellinen kuukausi"
        nextAriaLabel="Seuraava kuukausi"
        next2AriaLabel="Seuraava vuosi"
        prev2AriaLabel="Edellinen vuosi"
        minDetail="month"
        maxDetail="month"
        minDate={new Date()}
        onChange={onChange}
        value={value} />)
}

export default CalendarWrapper