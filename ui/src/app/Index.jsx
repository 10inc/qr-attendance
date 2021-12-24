import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import config from 'config';
import { TopNav, SideBar, Alert } from '@/_components';
import { accountService } from '@/_services';
import { Routes } from './Routes'

function App() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className={'app-container' + (user && ' bg-light')}>
      <Box>
        {(user && Object.keys(user).length) && (
          <React.Fragment>
            <SideBar open={open} toggle={toggleOpen} />
            <TopNav open={open} toggle={toggleOpen} />
          </React.Fragment>
        )}
        <Main open={open}>
          <Alert />
          <Routes />
        </Main>
      </Box>
    </div>
  );
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${config.drawerWidth}px`,
    }),
    marginTop: '4%',
  }),
);

export { App };