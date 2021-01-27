import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

const localizer = momentLocalizer(moment);
const events = [{
    title: 'Cumpleaños del Jefe',
    start: moment().toDate(), // => similar newDate()
    end: moment().add(2, 'hours').toDate(),
    bdcolor: '#fafafa'
}]

export const CalendarScreen = () => {
    return (
        <div>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events} //
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}
