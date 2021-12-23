import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { history, configureFakeBackend } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

import './styles.less';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009c85'
    }
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'white'
        },
      }
    }
  }
});

require('dotenv').config()

if (process.env.IS_FAKE_BACKEND == 'true') {
  // setup fake backend
  console.log("FAKE BACKEND ACTIVE")
  configureFakeBackend();
}

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>,
    document.getElementById('app')
  );
}