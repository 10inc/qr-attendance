import React from 'react';
import { Box } from '@mui/material';
import { accountService } from '@/_services';

function Home() {
    const user = accountService.userValue;

    return (
        <Box>
            <h1>Hi {user.name}!</h1>
            <p>You're logged in with React & JWT!!</p>
        </Box>
    );
}

export { Home };