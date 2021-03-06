import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Box, Button, Grid, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
var QRCode = require('qrcode.react');

import { studentService } from '@/_services';

function Details({ match }) {
  const { params: { id } } = match
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const [student, setStudent] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getById(id).then(result => {
      setStudent(result)
      setLoading(false)
    })
  }, []);

  function emailQr() {
    setSubmitting(true)
    studentService.emailQr(id)
      .then(result => {
        enqueueSnackbar(result.message, { 'variant': 'success' })
        setSubmitting(false)
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong with sending the email', { 'variant': 'error' })
        setSubmitting(false)
      })
  }
  if (loading) return <CircularProgress className="loader" />
  return (
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ p: 2 }}>
            <h1>Student Details</h1>
            <p>
              <strong>ID: </strong> {student?.id}<br />
              <strong>Name: </strong> {student?.name}<br />
              <strong>Email: </strong> {student?.email}<br />
              <strong>Section: </strong> {student?.section}<br />
              <strong>Course: </strong> {student?.course}<br />
              <strong>Year: </strong> {student?.year}
            </p>
            <Button
              variant="contained"
              onClick={() => history.push(`edit/${id}`)}
              sx={{ ml: 1 }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => history.push('/admin/students')}
              sx={{ ml: 1 }}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ p: 2 }}>
            <h1>QR Code</h1>
            <p>
              <QRCode value={`${id}`} />
            </p>
            <LoadingButton
              variant="contained"
              onClick={emailQr}
              loading={isSubmitting}
            >
              Send QR to Student's Email
            </LoadingButton>
          </Box>
        </Grid>

      </Grid>
    </Paper>
  );
}

export { Details };