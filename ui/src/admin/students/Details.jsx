import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Box, Button, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
var QRCode = require('qrcode.react');

import { studentService, alertService } from '@/_services';

function Details({ match }) {
  const { params: { id } } = match
  const history = useHistory()
  const [student, setStudent] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    studentService.getById(id).then(result => {
      setStudent(result)
    })
  }, []);

  function emailQr() {
    setSubmitting(true)
    studentService.emailQr(id)
      .then(result => {
        alertService.success(result.message);
        setSubmitting(false)
      })
      .catch(error => {
        alertService.error("Something went wrong with sending the email");
        setSubmitting(false)
      })
  }

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