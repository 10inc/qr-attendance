import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history, configureFakeBackend } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

import './styles.less';

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
            <App />
        </Router>,
        document.getElementById('app')
    );
}