import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppBar, Paper, Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';

import { accountService, alertService } from '@/_services';

function ForgotPassword() {
  const history = useHistory()
  const initialValues = {
    email: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (fields, { setSubmitting }) => {
      const { email } = fields
      alertService.clear();
      accountService.forgotPassword(email)
        .then(() => alertService.success('Please check your email for password reset instructions'))
        .catch(error => alertService.error(error))
        .finally(() => setSubmitting(false));
    },
    handleChange: (event) => {
      const { name, value } = event.target
      formik.setFieldValue(name, value)
    }
  });

  return (
    <React.Fragment>
      <AppBar sx={{ position: "relative", p: 2 }} >
        <h2>Forgot Password</h2>
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

            <Box sx={{ mt: 3 }}>
              <LoadingButton
                variant="contained"
                loading={formik.isSubmitting}
                type="submit"
              >
                Submit
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

export { ForgotPassword }; 