import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Overview } from './Overview';
import { Users } from './users';
import { Students } from './students';
import { Events } from './events';

function Admin({ match }) {
    const { path } = match;

    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                    <Route path={`${path}/students`} component={Students} />
                    <Route path={`${path}/events`} component={Events} />
                </Switch>
            </div>
        </div>
    );
}

export { Admin };