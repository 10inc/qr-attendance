import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Box, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useSnackbar } from 'notistack';

import { TableActions } from '@/_components';
import { eventService, } from '@/_services';

function List({ match }) {
  const { path } = match;
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAll().then(setEvents);
  }, []);

  function deleteEvent(id) {
    setEvents(events.map(x => {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    eventService.delete(id)
      .then(() => {
        setEvents(events => events.filter(x => x.id !== id));
        enqueueSnackbar('Event deleted successfully', { 'variant': 'success' })
      })
      .catch(error => {
        enqueueSnackbar(error, { 'variant': 'error' })
      });
  }

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <h1>Events</h1>
        <Button
          variant="contained"
          onClick={() => { history.push(`${path}/add`) }}
        >
          Add Event
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events && events.map(event =>
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString("fr-CA")}</TableCell>
                <TableCell>{event.attendees.length}</TableCell>
                <TableCell>
                  <TableActions actions={{
                    show: {
                      handle: () => history.push(`${path}/${event.id}`)
                    },
                    edit: {
                      handle: () => history.push(`${path}/edit/${event.id}`)
                    },
                    del: {
                      handle: () => deleteEvent(event.id),
                      loader: event?.isDeleting
                    }
                  }} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export { List };