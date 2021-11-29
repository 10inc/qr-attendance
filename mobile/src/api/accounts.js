import {fetchWrapper} from './fetch-wrapper';
import {setUser, removeUser} from '../auth/async-storage';
import {API_URL} from '@env';

const apiUrl = API_URL;
const baseUrl = `${apiUrl}${
  apiUrl.substring(apiUrl.length - 1) === '/' ? 'accounts' : '/accounts'
}`;

export const accountService = {
  login,
  logout,
};

function login(email, password) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, {email, password})
    .then(user => {
      setUser(user);
      return user;
    })
    .catch(function (error) {
      console.error('Error: ' + error);
      throw error;
    });
}

function logout() {
  fetchWrapper.post(`${baseUrl}/revoke-token`, {});
  removeUser();
}
