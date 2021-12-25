import React from 'react';
import { Box } from '@mui/material';

import { accountService } from '@/_services';
import { AdminHome } from './AdminHome'

function Home() {
  const user = accountService.userValue;

  return (
    <Box>
      <h1>Hi {user.name}!</h1>
      <p>Welcome to QR CodeIn!</p>
    </Box>
  );
}

export { Home, AdminHome };