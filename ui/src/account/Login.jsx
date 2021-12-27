import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { accountService, alertService } from '@/_services';

function Login({ history, location }) {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (fields, { setSubmitting }) => {
      const { email, password } = fields
      setSubmitting(true)

      alertService.clear();
      accountService.login(email, password)
        .then(() => {
          const { from } = location.state || { from: { pathname: "/" } };
          history.push(from);
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
          <h1>Login</h1>

          <TextField
            key="email"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            type='text'
            sx={{ m: 1, width: '25ch' }}
          />

          <TextField
            key="password"
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
            type='password'
            sx={{ m: 1, width: '25ch' }}
          />

          <Box sx={{ mt: 1 }}>
            <LoadingButton
              variant="contained"
              loading={formik.isSubmitting}
              type="submit"
            >
              Login
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => history.push('/account/register')}
              sx={{ ml: 1 }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              onClick={() => history.push('/account/forgot-password')}
              sx={{ ml: 1 }}
            >
              Forgot Password
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  )
}

export { Login }; 