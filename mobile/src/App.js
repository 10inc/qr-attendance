import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {ToastProvider} from 'react-native-paper-toast';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {
  NativeRouter,
  Route,
  Navigate,
  Routes,
  Outlet,
  useLocation,
} from 'react-router-native';

import {AuthProvider, useAuth} from './auth';
import {Login, Dashboard, Event} from './views';

const Main = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/event" element={<Event />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
};

function RequireAuth() {
  let context = useAuth();
  let location = useLocation();

  if (!context?.userToken) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return <Outlet />;
}

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
