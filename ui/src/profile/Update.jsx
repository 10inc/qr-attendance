import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { accountService, alertService } from '@/_services';

function Update({}) {
  const user = accountService.userValue;
  const history = useHistory()
  const initialValues = {
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .when('password', (password, schema) => {
        if (password) return schema.required('Confirm Password is required');
      })
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (fields, { setSubmitting }) => {
      setSubmitting(true)
      accountService.update(user.id, fields)
        .then(() => {
          setSubmitting(false)
          alertService.success('Update successful', { keepAfterRouteChange: true });
          history.push('.');
        })
        .catch(error => {
          setSubmitting(false)
          alertService.error(error);
        })
    },
    handleChange: (event) => {
      console.log(event)
      const { name, value } = event.target
      formik.setFieldValue(name, value)
    }
  });

  const [isDeleting, setIsDeleting] = useState(false);
  function onDelete() {
    if (confirm('Are you sure?')) {
      setIsDeleting(true);
      accountService.delete(user.id)
        .then(() => alertService.success('Account deleted successfully'));
    }
  }

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <h1>Update Profile</h1>

          <Box>
            {['name', 'email', 'password', 'confirmPassword'].map((item) =>
              <TextField
                key={item}
                fullWidth
                id={item}
                name={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                value={formik.values[item]}
                onChange={formik.handleChange}
                error={formik.errors[item]}
                helperText={formik.errors[item]}
                type={item.includes('assword') ? 'password' : 'text'}
                sx={{ m: 1, width: '25ch' }}
              />
            )}
          </Box>
          <Box>
            <small>NOTE: Leave password as blank to retain previous values.</small>
          </Box>
          <Box sx={{ mt: 1 }}>
            <LoadingButton
              variant="contained"
              loading={formik.isSubmitting}
              type="submit"
            >
              Save
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={isDeleting}
              onClick={onDelete}
              color="error"
              sx={{ ml: 1 }}
            >
              Delete
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
  )
}

export { Update };