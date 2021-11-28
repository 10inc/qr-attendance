import {getToken, removeUser} from '../auth/async-storage';
import {API_URL} from '@env';

const TOKEN = getToken();

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...authHeader(url)},
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', ...authHeader(url)},
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const isApiUrl = url.startsWith(API_URL);
  if (TOKEN && isApiUrl) {
    return {Authorization: `Bearer ${TOKEN}`};
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && TOKEN) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        removeUser();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
