import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { eventService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [events, setEvents] = useState(null);

    useEffect(() => {
        eventService.getAll().then(x => setEvents(x));
    }, []);

    function deleteEvent(id) {
        setEvents(events.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        eventService.delete(id).then(() => {
            setEvents(events => events.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Events</h1>
            <p>List of Events</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Event</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Date</th>
                        <th style={{ width: '30%' }}>Attendees</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map(event =>
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.attendees.length}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${event.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteEvent(event.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={event.isDeleting}>
                                    {event.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!events &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };