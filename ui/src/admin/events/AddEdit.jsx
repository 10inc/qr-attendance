import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Paper, Box, Button, TextField,
  FormControl, FormHelperText, InputLabel, Select, MenuItem
} from '@mui/material';
import { LoadingButton, MobileDatePicker } from '@mui/lab';
import { eventService, alertService, studentService } from '@/_services';

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [students, setStudents] = useState([])
  const initialValues = {
    name: '',
    date: '',
    attendees: []
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    date: Yup.date()
      .required('Date is invalid'),
    attendees: Yup.array()
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (fields, { setSubmitting }) => {
      setSubmitting(true)
      if (isAddMode) {
        eventService.create(fields)
          .then((res) => {
            alertService.success('Event added successfully', { keepAfterRouteChange: true });
            history.push(res?.id ? `/admin/events/${res.id}` : `/admin/events`);
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      } else {
        eventService.update(id, fields)
          .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push(`/admin/events/${id}`);
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      }
    },
    handleChange: (event) => {
      const { name, value } = event.target
      formik.setFieldValue(name, value)
    }
  });

  useEffect(() => {
    if (!isAddMode) {
      eventService.getById(id).then(event => {
        const { name, date } = event
        formik.setFieldValue('name', name, false)
        formik.setFieldValue('date', new Date(date).toLocaleDateString("fr-CA"))
      });
    }
    studentService.getAll().then(setStudents)
  }, []);

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <h1>{isAddMode ? 'Add' : 'Update'} Event</h1>

          <Box>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              type='text'
              sx={{ m: 1, width: '25ch' }}
            />

            <TextField
              fullWidth
              id="date"
              name="date"
              label="Event Date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.date)}
              helperText={formik.errors.date}
              type="date"
              sx={{ m: 1, width: '25ch' }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl error={Boolean(formik.errors.attendees)} sx={{ m: 1, width: '25ch' }}>
              <InputLabel id="role-label">Attendees</InputLabel>
              <Select
                labelId="role-label"
                id="attendees"
                name="attendees"
                value={formik.values.attendees}
                label="Attendees"
                multiple
                onChange={formik.handleChange}
              >
                {students.map((student) =>
                  <MenuItem key={student?.name} value={student?.id}>{student?.name}</MenuItem>
                )}
              </Select>
              <FormHelperText>{formik.errors.attendees}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1 }}>
            <LoadingButton
              variant="contained"
              loading={formik.isSubmitting}
              type="submit"
            >
              Save
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={history.goBack}
              sx={{ ml: 1 }}
            >
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}

export { AddEdit };