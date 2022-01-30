import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button, TextField, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { studentService } from '@/_services';

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const initialValues = {
    name: '',
    email: '',
    section: '',
    course: '',
    year: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    section: Yup.string()
      .required('Section is required'),
    course: Yup.string()
      .required('Course is required'),
    year: Yup.string()
      .required('Year is required'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (fields, { setSubmitting }) => {
      setSubmitting(true)
      if (isAddMode) {
        studentService.create(fields)
          .then((res) => {
            enqueueSnackbar('Student added successfully', { 'variant': 'success' })
            history.push(res?.id ? `/admin/students/${res.id}` : `/admin/students`);
          })
          .catch(error => {
            setSubmitting(false);
            enqueueSnackbar(error, { 'variant': 'error' })
          });
      } else {
        studentService.update(id, fields)
          .then(() => {
            enqueueSnackbar('Update successful', { 'variant': 'success' })
            history.push(`/admin/students/${id}`);
          })
          .catch(error => {
            setSubmitting(false);
            enqueueSnackbar(error, { 'variant': 'error' })
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
      studentService.getById(id).then(student => {
        const { name, email, section, course, year } = student
        formik.setFieldValue('name', name, false)
        formik.setFieldValue('email', email, false)
        formik.setFieldValue('section', section, false)
        formik.setFieldValue('course', course, false)
        formik.setFieldValue('year', year, false)
        setLoading(false)
      });
    } else {
      setLoading(false)
    }
  }, []);

  if (loading) return <CircularProgress className="loader" />
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <h1>{isAddMode ? 'Add' : 'Update'} Student</h1>

          <Box>
            {['name', 'email', 'section', 'course', 'year'].map((item) =>
              <TextField
                key={item}
                fullWidth
                id={item}
                name={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                value={formik.values[item]}
                onChange={formik.handleChange}
                error={Boolean(formik.errors[item])}
                helperText={formik.errors[item]}
                type='text'
                sx={{ m: 1, width: '25ch' }}
              />
            )}
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
              onClick={() => history.push('/admin/students/')}
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