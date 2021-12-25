import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { Role } from '@/_helpers';
import { Home, AdminHome } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';

import { accountService } from '@/_services';

export function Routes() {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <PrivateRoute exact path="/" roles={[Role.Admin]} component={AdminHome} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
      <Route path="/account" component={Account} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}


function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route {...rest} render={props => {
      const user = accountService.userValue;
      if (!user) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(user.role) === -1) {
        // role not authorized so redirect to home page
        return <Redirect to={{ pathname: '/' }} />
      }

      // authorized so return component
      return <Component {...props} />
    }} />
  );
}
