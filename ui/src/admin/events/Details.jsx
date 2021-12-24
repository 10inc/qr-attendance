import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Paper, Box, Button, TextField, Grid,
  FormControl, FormHelperText, InputLabel, Select, MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { eventService, studentService, alertService } from '@/_services';

function Details({ match }) {
  const { params: { id } } = match;
  const [event, setEvent] = useState({});
  const [students, setStudents] = useState([]);
  const [attendee, setAttendee] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    eventService.getById(id).then(setEvent);
    studentService.getAll().then(setStudents)
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
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ p: 2 }}>
            <h1>Event Details</h1>
            <p>
              <strong>Name: </strong>{event?.name}<br />
              <strong>Date: </strong>{event?.date}<br />
              <strong>Attendees: </strong>{event?.attendees?.length}
            </p>
            <Button
              variant="contained"
              onClick={() => history.push(`edit/${id}`)}
              sx={{ ml: 1 }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => history.push('/admin/events')}
              sx={{ ml: 1 }}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ p: 2 }}>
            <h1>Add Student to Event</h1>
            <p>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <InputLabel id="role-label">Students</InputLabel>
                <Select
                  labelId="role-label"
                  value={attendee}
                  label="Student"
                  onChange={(e) => setAttendee(e.target.value)}
                >
                  {students.map((student) =>
                    <MenuItem key={student?.id} value={student?.id}>{student?.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </p>
            <LoadingButton
              variant="contained"
              onClick={attendEvent}
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Box>
        </Grid>

      </Grid>
    </Paper>
  )
}

export { Details };