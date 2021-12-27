import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Paper, Box, Button, TextField, CircularProgress,
  FormControl, FormHelperText, InputLabel, Select, MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = {
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  };

  const [loading, setLoading] = useState(true);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    role: Yup.string()
      .required('Role is required'),
    password: Yup.string()
      .concat(isAddMode ? Yup.string().required('Password is required') : null)
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

      if (isAddMode) {
        accountService.create(fields)
          .then(() => {
            enqueueSnackbar('User added successfully', { 'variant': 'success' })
            history.push('/admin/users');
          })
          .catch(error => {
            setSubmitting(false);
            enqueueSnackbar(error, { 'variant': 'error' })
          });
      } else {
        accountService.update(id, fields)
          .then(() => {
            enqueueSnackbar('Update successful', { 'variant': 'success' })
            history.push('/admin/users');
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
      accountService.getById(id).then(user => {
        const { name, email, role } = user
        formik.setFieldValue('name', name, false)
        formik.setFieldValue('email', email, false)
        formik.setFieldValue('role', role, false)
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
          <h1>{isAddMode ? 'Add' : 'Update'} User</h1>

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
            <FormControl error={Boolean(formik.errors["role"])} sx={{ m: 1, width: '25ch' }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values["role"]}
                label="Age"
                onChange={formik.handleChange}
              >
                {Object.keys(Role).map((role) =>
                  <MenuItem key={role} value={role}>{role}</MenuItem>
                )}
              </Select>
              <FormHelperText>{formik.errors["role"]}</FormHelperText>
            </FormControl>
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
            <Button
              variant="outlined"
              onClick={() => history.push('/admin/users/')}
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