import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppBar, Paper, Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { accountService } from '@/_services';

function Register({ history }) {
  const { enqueueSnackbar } = useSnackbar();
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
          enqueueSnackbar(
            'Registration successful, please check your email for verification instructions',
            { 'variant': 'success' }
          )
          history.push('login');
        })
        .catch(error => {
          setSubmitting(false);
          enqueueSnackbar(error, { 'variant': 'error' })
        });
    },
    handleChange: (event) => {
      const { name, value } = event.target
      formik.setFieldValue(name, value)
    }
  });

  return (
    <React.Fragment>
      <AppBar sx={{ position: "relative", p: 2 }} >
        <h2>Register</h2>
      </AppBar>
      <Paper>
        <Box sx={{ py: 2, px: 6 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              {['name', 'email'].map((item) =>
                <p>
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
                  />
                </p>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {['password', 'confirmPassword'].map((item) =>
                <TextField
                  key={item}
                  id={item}
                  name={item}
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                  value={formik.values[item]}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors[item])}
                  helperText={formik.errors[item]}
                  type='password'
                  sx={{ width: '48%' }}
                />
              )}
            </Box>

            <Box sx={{ mt: 3 }}>
              <LoadingButton
                variant="contained"
                loading={formik.isSubmitting}
                type="submit"
              >
                Register
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
    </React.Fragment>
  )
}

export { Register }; 