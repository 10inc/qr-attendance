import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Button, Grid, CircularProgress,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { eventService, studentService } from '@/_services';

function Details({ match }) {
  const { params: { id } } = match;
  const { enqueueSnackbar } = useSnackbar();
  const [event, setEvent] = useState({});
  const [students, setStudents] = useState([]);
  const [attendee, setAttendee] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getById(id).then(setEvent);
    studentService.getAll().then((res) => {
      setStudents(res)
      setLoading(false)
    })
  }, []);

  function attendEvent() {
    setSubmitting(true)
    eventService.attend(id, attendee)
      .then(() => {
        eventService.getById(id).then(result => setEvent(result));
        enqueueSnackbar('Successfully added a Student as an Event Attendee', { 'variant': 'success' })
        setSubmitting(false)
      })
      .catch(error => {
        enqueueSnackbar(error, { 'variant': 'error' })
        setSubmitting(false)
      });
  }
  if (loading) return <CircularProgress className="loader" />
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