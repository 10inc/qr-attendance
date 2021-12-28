import React from 'react';
import {getToken} from './async-storage';
import {accountService} from '../api/accounts';

const AuthContext = React.createContext();
export const AuthRef = React.createRef();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }

  return context;
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(AuthReducer, {
    status: 'idle',
    userToken: null,
    isLoggedIn: false,
  });

  React.useEffect(() => {
    const initState = async () => {
      try {
        const token = await getToken();
        if (token !== null) {
          dispatch({type: 'SIGN_IN', token: token});
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
        const user = await accountService.login(email, password);

        if (user) {
          const token = await getToken();
          dispatch({type: 'SIGN_IN', token: token});
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
        isLoggedIn: true,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        userToken: null,
        isLoggedIn: false,
      };
  }
};
