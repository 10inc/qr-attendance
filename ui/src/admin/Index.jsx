import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Overview } from './Overview';
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
          {['users', 'students', 'events'].map((item) =>
            <Button
              onClick={() => history.push(`${path}/${item}`)}
              sx={{ color: 'white' }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Button>
          )}
          </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path={path} component={Overview} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/students`} component={Students} />
        <Route path={`${path}/events`} component={Events} />
      </Switch>
      {/* 
        TODO:
        - generic profile (optional user prop, else current user)
        - fe for overview (my profile), users, students, events
      */}
    </Box>
  );
}

export { Admin };