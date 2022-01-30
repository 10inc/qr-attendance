import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button, TextField, AppBar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { accountService } from '@/_services';

function Login({ history, location }) {
  const { enqueueSnackbar } = useSnackbar();
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

      accountService.login(email, password)
        .then(() => {
          const { from } = location.state || { from: { pathname: "/" } };
          history.push(from);
        })
        .catch(error => {
          setSubmitting(false);
          enqueueSnackbar(error, { 'variant': 'error' });
        });
    },
    handleChange: (event) => {
      const { name, value } = event.target
      formik.setFieldValue(name, value)
    }
  });

  return (
    <React.Fragment>
      <AppBar sx={{ position: "relative", p: 2}} >
        <h2>Login</h2>
      </AppBar>
      <Paper>
        <Box sx={{ py: 2, px: 6 }}>
          <form onSubmit={formik.handleSubmit}>
            <p>
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
              />
            </p>

            <p>
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
              />
            </p>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
              <Box>
                <LoadingButton
                  variant="contained"
                  loading={formik.isSubmitting}
                  type="submit"
                >
                  Login
                </LoadingButton>
                {Boolean(process.env.FF_REGISTRATION)}
                {!Boolean(process.env.FF_REGISTRATION) &&
                  <Button
                    variant="outlined"
                    onClick={() => history.push('/account/register')}
                    sx={{ ml: 1 }}
                  >
                    Register
                  </Button>
                }
              </Box>
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
    </React.Fragment>
  )
}

export { Login }; 