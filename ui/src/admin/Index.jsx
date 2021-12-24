import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, IconButton } from '@mui/material';
import { AssignmentOutlined as AdminIcon } from '@mui/icons-material';
import { Details } from '@/profile'

import { Users } from './users';
import { Students } from './students';
import { Events } from './events';

function Admin({ match }) {
  const { path } = match;
  const history = useHistory()

  return (
    <Box>
      <AppBar position="static" sx={{ px: 1 }}>
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            sx={{ mr: 1, color: "white" }}
            onClick={() => history.push(`${path}`)}
          >
            <AdminIcon />
          </IconButton>
          {['users', 'students', 'events'].map((item) =>
            <Button
              key={item}
              onClick={() => history.push(`${path}/${item}`)}
              sx={{ color: 'white' }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path={path} component={Details} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/students`} component={Students} />
        <Route path={`${path}/events`} component={Events} />
      </Switch>
    </Box>
  );
}

export { Admin };