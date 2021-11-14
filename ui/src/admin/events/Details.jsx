import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { eventService, studentService, alertService } from '@/_services';

function Details({ match }) {
    const { params: { id } } = match;
    const [event, setEvent] = useState({});
    const [students, setStudents] = useState([]);
    const [attendee, setAttendee] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        eventService.getById(id).then(result => setEvent(result));
        studentService.getAll().then(result => setStudents(result))
    }, []);

    function attendEvent() {
        setSubmitting(true)
        eventService.attend(id, attendee)
            .then(() => {
                eventService.getById(id).then(result => setEvent(result));
                alertService.success("Successfully added a Student as an Event Attendee");
                setSubmitting(false)
            })
            .catch(error => {
                alertService.error(error);
                setSubmitting(false)
            });
    }

    return (
        <div>
            <h1>Event</h1>
            <p>Details</p>
            <Link to={`edit/${id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>

            <p>
                <strong>Name: </strong>{event?.name}<br/>
                <strong>Date: </strong>{event?.date}<br/>
                <strong>Attendees: </strong>{event?.attendees?.length}
            </p>

            <hr/>

            <label>
                QR Scan logic but with a Student Dropdown
                <select
                    value={attendee}
                    onChange={(e) => setAttendee(e.target.value)}
                    className="form-control"
                >
                    <option value="" placeholder>Select Student</option>
                    { students.map(student => {
                        return (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        )
                    })}
                </select>
            </label>
            <button
                className="btn btn-sm btn-primary ml-1"
                onClick={() => attendEvent()}
                disabled={isSubmitting || !attendee}
            >
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Submit
            </button>
        </div>
    );
}

export { Details };