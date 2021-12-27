import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { accountService, alertService } from '@/_services';

function Register({ history }) {
  const initialValues = {
    name: '',
    email: '',
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
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (fields, { setSubmitting }) => {
      setSubmitting(true)
      accountService.register(fields)
        .then(() => {
          alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
          history.push('login');
        })
        .catch(error => {
          setSubmitting(false);
          alertService.error(error);
        });
    },
    handleChange: (event) => {
      const { name, value } = event.target
      formik.setFieldValue(name, value)
    }
  });

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <h1>Register</h1>

          <Box>
            {['name', 'email'].map((item) =>
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
          <Box>
            {['password', 'confirmPassword'].map((item) =>
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
                type='password'
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
              onClick={() => history.push('/account/login')}
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

export { Register }; 