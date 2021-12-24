import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button, TextField,
  FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Role } from '@/_helpers';
import { accountService, alertService } from '@/_services';

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const initialValues = {
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  };

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
            alertService.success('User added successfully', { keepAfterRouteChange: true });
            history.push('/admin/users');
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      } else {
        accountService.update(id, fields)
          .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('/admin/users');
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
      accountService.getById(id).then(user => {
        const { name, email, role } = user
        formik.setFieldValue('name', name, false)
        formik.setFieldValue('email', email, false)
        formik.setFieldValue('role', role, false)
      });
    }
  }, []);

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