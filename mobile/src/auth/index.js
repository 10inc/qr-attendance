import React from 'react';
import {getUser, getToken} from './async-storage';

import {accountService} from '../api/accounts';

const AuthContext = React.createContext({
  status: 'idle',
  userToken: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthRef = React.createRef();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }

  const isLoggedIn = context.status === 'signIn';

  return {...context, isLoggedIn};
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(AuthReducer, {
    status: 'idle',
    userToken: null,
  });

  React.useEffect(() => {
    const initState = async () => {
      try {
        const userToken = await getUser();
        if (userToken !== null) {
          dispatch({type: 'SIGN_IN', token: userToken});
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      } catch (e) {
        // catch error here
        // Maybe sign_out user!
      }
    };

    initState();
  }, []);

  React.useImperativeHandle(AuthRef, () => authActions);

  const authActions = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        console.log('test', email, password);
        const user = await accountService.login(email, password);

        if (user) {
          // Tech debt: Should get from async storage instead of api response
          dispatch({type: 'SIGN_IN', token: user?.jwtToken});
        }
      },
      signOut: async () => {
        await accountService.logout();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authActions}}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        status: 'signIn',
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        userToken: null,
      };
  }
};
