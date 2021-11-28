import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {ToastProvider} from 'react-native-paper-toast';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {NativeRouter, Route, Redirect} from 'react-router-native';

import {AuthProvider, useAuth} from './auth';
import {Login, Dashboard} from './views';

const Main = () => {
  return (
    <NativeRouter>
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
    </NativeRouter>
  );
};

const PrivateRoute = ({children, ...rest}) => {
  const {isLoggedIn} = useAuth();
  return (
    <Route
      {...rest}
      render={({location}) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <ToastProvider>
          <AuthProvider>
            <Main />
          </AuthProvider>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
