import React from 'react'

export const CalendarEvent = ({ event }) => {
    return (
        <div>
            <strong>{ event.title }</strong>
            <span> - Manuel Rincón</span>
         </div>
    )
}
