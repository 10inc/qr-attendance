import React from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, Box, Button } from '@mui/material';
import { accountService } from '@/_services';

function Details({ match, userId=null }) {
  const { path } = match;
  const user = userId ? accountService.getById(userId) : accountService.userValue;
  const history = useHistory()

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <h1>My Profile</h1>
        <p>
          <strong>Name: </strong> {user.name}<br />
          <strong>Email: </strong> {user.email}<br />
          <strong>Role: </strong> {user.role}
        </p>
        <Button
          variant="contained"
          onClick={() => {history.push(`${path}/update`)}}
        >
          Update Profile
        </Button>
      </Box>
    </Paper>
  );
}

export { Details };