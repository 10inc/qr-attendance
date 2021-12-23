import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import { Menu as MenuIcon, AccountCircle as UserIcon } from '@mui/icons-material';

function TopNav({ toggle, open }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PersistentAppBar open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggle}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="user"
          >
            <UserIcon />
          </IconButton>
        </Toolbar>
      </PersistentAppBar>
    </Box>
  );
}

const PersistentAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: 'white',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${240}px)`,
    marginLeft: `${240}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export { TopNav };